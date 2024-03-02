<!-- BookSessionComponent.vue -->

<template>
	<div class="book-session">
	  <h1>Book Session</h1>
	  <div v-if="loading" class="loading">Loading...</div>
	  <div v-else>
		<form @submit.prevent="submitBooking">
		  <label for="date">Select Date:</label>
		  <input type="date" id="date" v-model="selectedDate" required>
		  <label for="time">Select Time:</label>
		  <input type="time" id="time" v-model="selectedTime" required>
		  <button type="submit">Book</button>
		</form>
	  </div>
	</div>
  </template>
  
  <script>
  export default {
	data() {
	  return {
		selectedDate: '',
		selectedTime: '',
		loading: false
	  };
	},
	methods: {
	  async submitBooking() {
		try {
		  // Set loading to true to show loading indicator
		  this.loading = true;
  
		  // Simulate booking process with setTimeout (replace with actual booking logic)
		  await new Promise(resolve => setTimeout(resolve, 1500));
  
		  // Reset form fields after successful booking
		  this.selectedDate = '';
		  this.selectedTime = '';
  
		  // Show success message or redirect user to confirmation page
		  alert('Booking successful!'); // You can replace this with a more sophisticated UI
  
		  // Set loading back to false
		  this.loading = false;
		  this.$router.push({ name: 'home' })
		} catch (error) {
		  console.error('Error booking session: ', error);
		  alert('An error occurred while booking. Please try again later.');
		  this.loading = false; // Set loading to false in case of error
		}
	  }
	}
  };
  </script>
  
  <style>
  .book-session {
	max-width: 400px;
	margin: 0 auto;
	padding: 20px;
  }
  
  .loading {
	font-size: 20px;
	text-align: center;
	margin-top: 20px;
  }
  </style>