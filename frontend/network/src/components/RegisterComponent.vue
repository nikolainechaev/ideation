<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Register</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form @submit.prevent="register">
              <!-- Role selection -->
              <div class="form-group row">
                <label for="role" class="col-md-4 col-form-label text-md-right">Role</label>
                <div class="col-md-6">
                  <select id="role" class="form-control" v-model="role" required>
                    <option disabled value="">Please select a role</option>
                    <option value="mentee">Mentee</option>
                    <option value="mentor">Mentor</option>
                    <option value="translator">Translator</option>
                  </select>
                </div>
              </div>

              <!-- Name field -->
              <div class="form-group row">
                <label for="name" class="col-md-4 col-form-label text-md-right">Name</label>
                <div class="col-md-6">
                  <input
                    id="name"
                    type="text"
                    class="form-control"
                    name="name"
                    required
                    v-model="name"
                  />
                </div>
              </div>

              <!-- Email field -->
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
                <div class="col-md-6">
                  <input
                    id="email"
                    type="email"
                    class="form-control"
                    name="email"
                    required
                    v-model="email"
                  />
                </div>
              </div>

              <!-- Password field -->
              <div class="form-group row">
                <label for="password" class="col-md-4 col-form-label text-md-right">Password</label>
                <div class="col-md-6">
                  <input
                    id="password"
                    type="password"
                    class="form-control"
                    name="password"
                    required
                    v-model="password"
                  />
                </div>
              </div>

              <!-- Submit button -->
              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Register</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth' // Import updateProfile
import { addDoc, collection } from 'firebase/firestore' // Import Firestore functions
import { auth, db } from '../../../../api-key.js' // Ensure you export db in your api-key.js file

export default {
  name: 'RegisterComponent',
  setup() {
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('')
    const error = ref(null)
    const router = useRouter()

    const register = async () => {
      try {
        // Create a new user with email and password using Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        )

        // Update the display name of the user
        await updateProfile(userCredential.user, { displayName: name.value })

        // Add the user to the corresponding Firestore collection based on the selected role
        await addDoc(collection(db, role.value), {
          uid: userCredential.user.uid,
          name: name.value,
          email: email.value
          // Include any other relevant information here
        })

        // Redirect the user after successful registration
        router.push('/dashboard')
      } catch (err) {
        error.value = err.message
      }
    }

    return { register, name, email, password, role, error }
  }
}
</script>
