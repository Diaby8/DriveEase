<template>
    <section>
      <h1>Luxury Cars</h1>
      <div class="car-list">
        <div class="car" v-for="(car, index) in cars" :key="index">
          <div class="image-wrapper">
            <img :src="car.IMAGE_URL" :alt="car.BRAND + ' ' + car.MODEL" />
          </div>
          <h3>{{ car.BRAND }} {{ car.MODEL }}</h3>
          <p>Fuel: {{ car.FUEL }}</p>
          <p>Transmission: {{ car.TRANSMISSION }}</p>
          <p>Price: ${{ car.PRICE_DAY }} / day</p>
        </div>
      </div>
    </section>
  </template>

<script>
import axios from 'axios'

export default {
  name: 'LuxuryView',
  data () {
    return {
      cars: [] // Les voitures seront stockées ici
    }
  },
  mounted () {
    // Appel à l'API pour récupérer les voitures de type luxury
    axios
      .get('http://localhost:5000/api/cars/luxury')
      .then((response) => {
        this.cars = response.data
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des voitures Luxury:', error)
      })
  }
}
</script>

  <style scoped>
  .car-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .car {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 45%;
  }

  .image-wrapper img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
  </style>
