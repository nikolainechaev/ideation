<template>
  <div>
    <h1>Translator Profile</h1>
    <p>ID: {{ translator.ID }}</p>
    <p>Name: {{ translator.firstName }} {{ translator.lastName }}</p>
    <p>Hours Dedicated: {{ translator.hoursDedicated }}</p>
    <p>Language: {{ translator.language }}</p>
  </div>
</template>

<script>
export default {
  props: ['translator']
}
</script>
