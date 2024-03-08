<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div v-if="user.loggedIn">
            <!-- <div class="card-header">Welcome, {{ user.data.displayName }}</div> -->
            <div class="card-header">Welcome, {{ user.data.displayName }}</div>
            <div class="card-body">
              <div class="alert alert-success" role="alert">
                You are logged in!
                <div class="my-4">
                  <button @click.prevent="signOut" class="btn btn-primary">Log Out</button>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="alert alert-danger" role="alert">You are not logged in!</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import { initializeApp } from 'firebase/app' // Import initializeApp
import { getAuth, onAuthStateChanged } from 'firebase/auth' // Import getAuth and onAuthStateChanged
import { getFirestore, doc, getDoc } from 'firebase/firestore' // Import Firestore functions
import { firebaseConfig } from '../../../../api-key'

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp) // Initialize Firestore

export default {
  name: 'DashboardComponent',

  setup() {
    const store = useStore()
    const router = useRouter()

    const user = computed(() => {
      return store.getters.user
    })

    const signOut = async () => {
      await store.dispatch('logOut')
      router.push('/')
    }

    onAuthStateChanged(auth, (user) => {
      console.log('USER INFOOOOOOO: ', user)
      if (user) {
        // User is signed in, update the Vuex store
        store.commit('SET_LOGGED_IN', true)
        store.commit('SET_USER', {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        })
      } else {
        // User is signed out, update the Vuex store
        store.commit('SET_LOGGED_IN', false)
        store.commit('SET_USER', null)
      }
    })
    // Use onMounted to fetch mentee data after component is mounted
    onMounted(async () => {
      // Check if user is logged in
      if (user.value.loggedIn && user.value.data) {
        // Get the ID of the logged-in user
        const userId = user.value.data.uid
        // Query Firestore for the mentee document using the user's ID
        const menteeRef = doc(db, 'mentees', userId)
        try {
          const menteeSnapshot = await getDoc(menteeRef)
          if (menteeSnapshot.exists()) {
            // If mentee document exists, update user data with mentee's first and last name
            const menteeData = menteeSnapshot.data()
            store.commit('SET_USER', {
              ...user.value.data,
              displayName: `${menteeData.firstName} ${menteeData.lastName}`
            })
          }
        } catch (error) {
          console.error('Error fetching mentee data:', error)
        }
      }
    })

    return { user, signOut }
  }
}
</script>
