<template>
	<div>
	  <h1>Mentor List</h1>
	  <ul>
		<li v-for="mentor in mentors" :key="mentor.id">
		  {{ mentor.firstName }} {{ mentor.lastName }} - {{ mentor.hoursDedicated }} hours dedicated
		  <button @click="bookSession(mentor)">Book Session</button>
		</li>
	  </ul>
	</div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
	data() {
	  return {
		mentors: [] // Initialize mentors as an empty array
	  };
	},
	methods: {
	  async fetchMentors() {
		try {
		  const response = await axios.get(`http://localhost:8383/getAllMentors`);
		  if (response.status !== 200) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		  }
		  this.mentors = response.data.mentors; // Set mentors data property
		} catch (error) {
		  console.error('Error fetching mentors: ', error);
		}
	  },
	  bookSession(mentor) {
		// Emit an event to parent component to handle booking session with mentor
		this.$emit('bookSession', mentor);
	  }
	},
	mounted() {
	  this.fetchMentors(); // Call fetchMentors method when component is mounted
	}
  }
  </script>