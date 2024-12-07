<template>
  <section>
    <!-- Banner Section -->
    <div class="banner">
      <img class="banner-image" src="/images/cars/Audi_RS6_Black.jpg" alt="Luxury Cars Banner" />
      <div class="banner-overlay">
        <h1>Luxury Cars</h1>
      </div>
    </div>

    <!-- Filtering Section -->
    <div class="filters">
      <label for="fuel">Filter by Fuel:</label>
      <select id="fuel" v-model="selectedFuel">
        <option value="">All</option>
        <option value="PETROL">Petrol</option>
        <option value="DIESEL">Diesel</option>
        <option value="ELECTRIC">Electric</option>
        <option value="HYBRID">Hybrid</option>
      </select>

      <label for="price">Max Price ($/day):</label>
      <input id="price" type="number" v-model.number="maxPrice" placeholder="Enter max price" />

      <label for="startDate">Start Date:</label>
      <input type="date" id="startDate" v-model="startDate" />

      <label for="endDate">End Date:</label>
      <input type="date" id="endDate" v-model="endDate" />
    </div>

    <!-- Car List -->
    <div class="car-list">
      <div class="car" v-for="(car, index) in filteredCars" :key="index">
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
      cars: [],
      selectedFuel: '',
      maxPrice: 0,
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    filteredCars () {
      return this.cars.filter((car) => {
        const matchesFuel =
          this.selectedFuel === '' || car.FUEL === this.selectedFuel

        const matchesPrice =
          this.maxPrice === 0 || car.PRICE_DAY <= this.maxPrice

        const matchesDates =
          (!this.startDate || !car.PICKUP_DATE || new Date(this.startDate) <= new Date(car.PICKUP_DATE)) &&
          (!this.endDate || !car.RETURN_DATE || new Date(this.endDate) >= new Date(car.RETURN_DATE))

        return matchesFuel && matchesPrice && matchesDates
      })
    }
  },
  mounted () {
    const { startDate, endDate } = this.$route.query

    this.startDate = startDate || ''
    this.endDate = endDate || ''

    axios
      .get('http://localhost:5000/api/cars/luxury')
      .then((response) => {
        this.cars = response.data
      })
      .catch((error) => {
        console.error('Error fetching luxury cars:', error)
      })
  }
}
</script>

<style scoped>
/* Bannière pleine largeur */
.banner {
  position: relative;
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}

.banner-overlay h1 {
  color: white;
  font-size: 3rem;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8);
  animation: zoom-slow 5s infinite alternate ease-in-out;
}

@keyframes zoom-slow {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.1);
  }
}

/* Section de filtrage */
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px auto;
}

.filters label {
  color: #ffffff;
  font-size: 1rem;
  margin-right: 10px;
}

.filters select,
.filters input {
  padding: 8px 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #333333;
}

.filters input {
  width: 150px;
}

/* Conteneur des voitures */
.car-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px auto;
  padding: 0 20px;
}

/* Carte individuelle */
.car {
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

.image-wrapper {
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 10px;
  margin-bottom: 15px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.car h3 {
  font-size: 1.25rem;
  margin: 10px 0;
  color: #ffffff;
}

.car p {
  font-size: 1rem;
  margin: 5px 0;
  color: #cccccc;
}
</style>
