<template>
  <div class="calendar">
    <h2>{{ month }} {{ year }}</h2>
    <div class="days">
      <div v-for="day in days" :key="day.date" class="day">
        <div class="date">{{ day.date }}</div>
        <div class="slots">
          <div
            v-for="slot in day.slots"
            :key="slot.time"
            class="slot"
            :class="{ 'available': slot.available, 'booked': !slot.available }"
            @click="bookSlot(slot)"
          >
            {{ slot.time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['month', 'year'],
  data() {
    return {
      days: [],
      bookedSlots: [] // Array to hold the booked slots
    };
  },
  mounted() {
    this.fetchBookedSlots();
    this.generateCalendar();
  },
  methods: {
    async fetchBookedSlots() {
      try {
        const response = await axios.get('http://localhost:8383/bookedSlots');
        this.bookedSlots = response.data.bookedSlots;
      } catch (error) {
        console.error('Error fetching booked slots: ', error);
      }
    },
    generateCalendar() {
      // Generate the calendar with slots
      // Your implementation here
    },
    bookSlot(slot) {
      if (slot.available) {
        const newBooking = { date: slot.date, time: slot.time };
        // Save the booking to the database
        this.saveBooking(newBooking);
      } else {
        console.log('Slot is not available');
      }
    },
    async saveBooking(booking) {
      try {
        const response = await axios.post('http://localhost:8383/bookSlot', booking);
        // Update the booked slots array with the new booking
        this.bookedSlots.push(response.data.booking);
        // Update the calendar display
        this.generateCalendar();
      } catch (error) {
        console.error('Error saving booking: ', error);
      }
    }
  }
};
</script>