import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import firebaseConfig from '../../../api-key.json'

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()

import store from './store'

export { firebaseApp, auth }

const app = createApp(App)

app.use(store)
app.use(router)
app.mount('#app')
