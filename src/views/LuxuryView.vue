<template>
  <section>
    <!-- AppHeader -->
    <AppHeader />

    <!-- Banner Section -->
    <div class="banner">
      <img class="banner-image" src="/images/cars/Audi_RS6_Black.jpg" alt="Luxury Cars Banner" />
      <div class="banner-overlay">
        <h1>Luxury Cars</h1>
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
              <button class="rent-button" @click="openReservationModal(car)">Rent</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de réservation -->
    <ReservationModal
      v-if="showReservationModal"
      :isVisible="showReservationModal"
      :carDetails="selectedCar"
      @close="closeReservationModal"
      @submit="submitReservation"
    />
  </section>
</template>

<script>
import axios from 'axios'
import FilterSidebar from '@/components/FilterSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import ReservationModal from '@/components/ReservationModal.vue'

export default {
  name: 'LuxuryView',
  components: { FilterSidebar, AppHeader, ReservationModal },
  data () {
    return {
      cars: [],
      selectedLocation: '',
      maxPrice: 0,
      showReservationModal: false,
      selectedCar: null
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
    openReservationModal (car) {
      const isLoggedIn = localStorage.getItem('userToken') // Vérifie si l'utilisateur est connecté.
      if (!isLoggedIn) {
        alert('You need to login to rent a car.')
        this.$router.push('/login') // Redirige vers la page de connexion.
      } else {
        this.selectedCar = car
        this.showReservationModal = true // Affiche le formulaire de réservation.
      }
    },
    closeReservationModal () {
      this.showReservationModal = false
      this.selectedCar = null
    },
    submitReservation (formData) {
      console.log('Reservation data to send:', formData)
      axios
        .post('http://localhost:5000/contracts', formData)
        .then((response) => {
          alert('Réservation effectuée avec succès')
          this.closeReservationModal()
        })
        .catch((error) => {
          console.error('Erreur lors de la réservation :', error)
          alert('Une erreur est survenue lors de la réservation')
        })
    }
  },
  mounted () {
    const { location } = this.$route.query
    this.selectedLocation = location || ''

    axios
      .get('http://localhost:5000/api/cars/luxury') // API spécifique aux voitures de luxe
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
