<template>
  <div>
    <h1>Mentor Profile</h1>
    <p>ID: {{ mentor.ID }}</p>
    <p>Name: {{ mentor.firstName }} {{ mentor.lastName }}</p>
    <p>Hours Dedicated: {{ mentor.hoursDedicated }}</p>
    <p>Interests: {{ mentor.interests }}</p>
  </div>
</template>

<script>
export default {
  props: ['mentor']
}
</script>
