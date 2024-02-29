<template>
  <div class="mentee-profile">
    <h1>Mentee Profile</h1>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else>
      <img
        v-if="mentee && mentee.profilePictureUrl"
        :src="mentee.profilePictureUrl"
        alt="Profile Picture"
        class="profile-picture"
      />
      <div class="details" v-if="mentee">
        <p><strong>ID:</strong> {{ mentee.ID }}</p>
        <p><strong>Name:</strong> {{ mentee.firstName }} {{ mentee.lastName }}</p>
        <p><strong>Interests:</strong> {{ mentee.interests }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['menteeId'],
  data() {
    return {
      mentee: null,
      loading: true
    };
  },
  mounted() {
    this.fetchMentee();
  },
  methods: {
    async fetchMentee() {
      try {
        // const response = await axios.get(`http://localhost:8383/getMentee/${this.menteeId}`);
        const response = await axios.get(`http://localhost:8383/getMentee/`);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        this.mentee = response.data.mentee;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching mentee: ', error);
      }
    }
  }
};
</script>


<style>
.mentee-profile {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-picture {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.details p {
  margin: 5px 0;
}

.loading {
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
}
</style>
