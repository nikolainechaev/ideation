<template>
  <main>
    <!-- Render the login form if showLogin is true -->
    <LoginFormComponent v-if="showLogin"></LoginFormComponent>
    <!-- Render the register form if showLogin is false -->
    <RegisterComponent v-else></RegisterComponent>
    <!-- Button to toggle between login and register -->
    <button @click="toggleView">{{ showLogin ? 'Register' : 'Login' }}</button>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import LoginFormComponent from '../components/LoginFormComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'

// Use a ref to track whether to show the login or register component
const showLogin = ref(true)

// Function to toggle between login and register
const toggleView = () => {
  showLogin.value = !showLogin.value
}
</script>

<!-- <script setup>
import LoginFormComponent from '../components/LoginFormComponent.vue'
import RegisterComponent from '../components/RegisterComponent.vue'
</script>

<template>
  <main>
    <RegisterComponent></RegisterComponent>
    <LoginFormComponent></LoginFormComponent>
  </main>
</template> -->
