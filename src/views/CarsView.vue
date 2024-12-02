<template>
    <div class="cars-page">
      <h1>Available Cars</h1>
      <CarList />
    </div>
  </template>

<script>
import CarList from '../components/Cars.vue'

export default {
  name: 'CarsView',
  components: {
    CarList
  }
}
</script>

  <style scoped>
  .cars-page {
    padding: 2em;
    text-align: center;
    color: white;
  }
  </style>
