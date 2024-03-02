import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

//initialize firebase auth
const auth = getAuth()

export { firebaseApp, auth }

const app = createApp(App)

app.use(router)

app.mount('#app')
