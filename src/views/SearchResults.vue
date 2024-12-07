<template>
    <section class="search-results">
      <h2>Available Cars</h2>
      <ul>
        <li v-for="(car, index) in cars" :key="index">
          {{ car.BRAND }} {{ car.MODEL }} - ${{ car.PRICE_DAY }}/day
        </li>
      </ul>
    </section>
  </template>

<script>
import axios from 'axios'
export default {
  name: 'SearchResults',
  data () {
    return {
      cars: []
    }
  },
  created () {
    // Récupérer les paramètres de la recherche depuis l'URL
    const { location, startDate, endDate, category } = this.$route.query

    // Effectuer une nouvelle requête pour récupérer les résultats
    axios
      .post('http://localhost:5000/api/search/advanced', {
        location,
        startDate,
        endDate,
        category
      })
      .then((response) => {
        this.cars = response.data.cars
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des résultats :', error)
      })
  }
}
</script>

  <style scoped>
  /* Styles pour les résultats */
  </style>
