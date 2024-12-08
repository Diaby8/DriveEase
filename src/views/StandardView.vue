<template>
  <section>
    <!-- AppHeader -->
    <AppHeader />

    <!-- Banner Section -->
    <div class="banner">
      <img class="banner-image" src="/images/cars/Renault_Clio_Blue.jpg" alt="Standard Cars Banner" />
      <div class="banner-overlay">
        <h1>Standard Cars</h1>
      </div>
    </div>

    <!-- Layout avec Sidebar et Liste des voitures -->
    <div class="layout">
      <!-- Sidebar -->
      <FilterSidebar
        :selectedLocation="selectedLocation"
        :maxPrice="maxPrice"
        @update:selectedLocation="updateSelectedLocation"
        @update:maxPrice="updateMaxPrice"
      />

      <!-- Liste des voitures -->
      <div class="car-list">
        <div class="car" v-for="(car, index) in filteredCars" :key="index">
          <div class="car-content">
            <!-- Image de la voiture -->
            <div class="image-wrapper">
              <img :src="car.IMAGE_URL" :alt="car.BRAND + ' ' + car.MODEL" />
            </div>

            <!-- Informations sur la voiture -->
            <div class="car-info">
              <h3>{{ car.BRAND }} {{ car.MODEL }}</h3>
              <p>Fuel: {{ car.FUEL }}</p>
              <p>Transmission: {{ car.TRANSMISSION }}</p>
              <p>Price: ${{ car.PRICE_DAY }} / day</p>
              <p>Location: {{ getLocationName(car.CURRENT_LOCATION) }}</p>
              <!-- Bouton Rent -->
              <button class="rent-button">Rent</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
import FilterSidebar from '@/components/FilterSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'

export default {
  name: 'StandardView',
  components: { FilterSidebar, AppHeader },
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

        const matchesPrice = this.maxPrice === 0 || car.PRICE_DAY <= this.maxPrice

        return matchesLocation && matchesPrice
      })
    }
  },
  methods: {
    updateSelectedLocation (newLocation) {
      this.selectedLocation = newLocation
    },
    updateMaxPrice (newPrice) {
      this.maxPrice = newPrice
    },
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
      .get('http://localhost:5000/api/cars/standard')
      .then((response) => {
        this.cars = response.data
      })
      .catch((error) => {
        console.error('Error fetching standard cars:', error)
      })
  }
}
</script>

<style scoped>
/* Layout entre la Sidebar et la liste des voitures */
.layout {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;
}

/* Sidebar */
.sidebar {
  width: 250px;
}

/* Bannière */
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

/* Liste des voitures */
.car-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px auto;
  padding: 0 20px;
}

.car {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 15px;
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  height: 250px;
}

.car:hover {
  transform: scale(1.05);
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.2);
}

/* Image et informations de la voiture */
.car-content {
  display: flex;
  width: 100%;
}

.image-wrapper {
  flex: 1;
  height: 100%;
  max-height: 250px;
  overflow: hidden;
  border-radius: 10px;
  margin-right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.car-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
}

/* Bouton Rent */
.rent-button {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  border: 2px solid white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.rent-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}
</style>
