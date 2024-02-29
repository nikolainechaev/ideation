<template>
	<div class="login-form">
	  <h2>Login</h2>
	  <form @submit.prevent="login">
		<div class="form-group">
		  <label for="username">Username:</label>
		  <input type="text" id="username" v-model="username" required>
		</div>
		<div class="form-group">
		  <label for="password">Password:</label>
		  <input type="password" id="password" v-model="password" required>
		</div>
		<button type="submit">Login</button>
	  </form>
	  <div v-if="error" class="error">{{ error }}</div>
	</div>
  </template>
  
  <script>

  export default {
	data() {
	  return {
		email: '',
      	password: ''
	  };
	},
	methods: {
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        // Redirect to dashboard or another route upon successful login
        this.$router.push('/mentee');
      } catch (error) {
        console.error('Login error:', error.message);
        // Handle login error (show error message to the user, etc.)
      }
    },
  },
};
</script>
  
  <style>
  .login-form {
	max-width: 300px;
	margin: 0 auto;
	padding: 20px;
	border: 1px solid #ccc;
	border-radius: 5px;
  }
  
  .form-group {
	margin-bottom: 10px;
  }
  
  label {
	display: block;
  }
  
  input[type="text"],
  input[type="password"] {
	width: 100%;
	padding: 8px;
	border-radius: 3px;
	border: 1px solid #ccc;
  }
  
  button {
	width: 100%;
	padding: 10px;
	background-color: #007bff;
	color: #fff;
	border: none;
	border-radius: 3px;
	cursor: pointer;
  }
  
  button:hover {
	background-color: #0056b3;
  }
  
  .error {
	color: red;
	margin-top: 10px;
  }
  </style>