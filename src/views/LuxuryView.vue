<template>
  <section>
    <!-- Bouton Home -->
    <div class="top-right-button">
      <button class="custom-button" @click="goHome">Home</button>
    </div>
    <!-- Banner Section -->
    <div class="banner">
      <img class="banner-image" src="/images/cars/Audi_RS6_Black.jpg" alt="Luxury Cars Banner" />
      <div class="banner-overlay">
        <h1>Luxury Cars</h1>
      </div>
    </div>

    <!-- Filtering Section -->
    <div class="filters">
      <label for="location">Filter by Location:</label>
      <select id="location" v-model.number="selectedLocation">
        <option value="">All</option>
        <option value="1">Paris</option>
        <option value="2">Marseille</option>
        <option value="3">Lyon</option>
      </select>

      <label for="price">Max Price ($/day):</label>
      <input id="price" type="number" v-model.number="maxPrice" placeholder="Enter max price" />
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
        <p>Location: {{ getLocationName(car.CURRENT_LOCATION) }}</p>
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
      selectedLocation: '',
      maxPrice: 0
    }
  },
  computed: {
    filteredCars () {
      return this.cars.filter((car) => {
        const matchesLocation =
          this.selectedLocation === '' ||
          car.CURRENT_LOCATION === parseInt(this.selectedLocation, 10)

        const matchesPrice =
          this.maxPrice === 0 || car.PRICE_DAY <= this.maxPrice

        return matchesLocation && matchesPrice
      })
    }
  },
  methods: {
    getLocationName (locationId) {
      const locations = {
        1: 'Paris',
        2: 'Marseille',
        3: 'Lyon'
      }
      return locations[locationId] || 'Unknown'
    },
    goHome () {
      this.$router.push('/')
    }
  },
  mounted () {
    const { location } = this.$route.query
    this.selectedLocation = location || ''

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
  font-family: "Oswald", sans-serif;
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

.car-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin: 20px auto;
  padding: 0 20px;
}

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

.top-right-button {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;
}

.custom-button {
  font-family: "Oswald", sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  border: 2px solid white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.custom-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}
</style>
