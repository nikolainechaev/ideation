<template>
	<div class="container">
	  <div class="row justify-content-center">
		<div class="col-md-8">
		  <div class="card">
			<div class="card-header">Login</div>
			<div class="card-body">
			  <div v-if="error" class="alert alert-danger">{{error}}</div>
			  <form action="#"  @submit.prevent="Login">
				<div class="form-group row">
				  <label for="email" class="col-md-4 col-form-label text-md-right">Email</label>
  
				  <div class="col-md-6">
					<input
					  id="email"
					  type="email"
					  class="form-control"
					  name="email"
					  value
					  required
					  autofocus
					  v-model="email"
					/>
				  </div>
				</div>
  
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
  
				<div class="form-group row mb-0">
				  <div class="col-md-8 offset-md-4">
					<button type="submit" class="btn btn-primary">Login</button>
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
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
//   require store from '../store.js'

  
  export default {
	name: "LoginComponent",
	  setup() {
	  const email = ref('')
	  const password = ref('')
	  const error = ref(null)
  
	  const store = useStore()
	  const router = useRouter()
  
	  const Login = async () => {
		try {
		  await store.dispatch('logIn', {
			email: email.value,
			password: password.value
		  })
		  router.push('/')
		}
		catch (err) {
		  error.value = err.message
		}
	  }
	  return { Login, email, password, error }
	}
  };
  </script>



<!-- <template>
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
  </style> -->