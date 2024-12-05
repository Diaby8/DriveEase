<template>
  <section>
    <!-- Section de la bannière -->
    <div class="banner">
      <img class="banner-image" src="/images/cars/Audi_RS6_Black.jpg" alt="Luxury Cars Banner" />
      <div class="banner-overlay">
        <h1>Luxury Cars</h1>
      </div>
    </div>

    <!-- Section de filtrage -->
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
      <input
        id="price"
        type="number"
        v-model.number="maxPrice"
        placeholder="Enter max price"
      />
    </div>

    <!-- Liste des voitures -->
    <div class="car-list">
      <div class="car" v-for="(car, index) in groupedCars" :key="index">
        <div class="image-wrapper">
          <img :src="car.IMAGE_URL" :alt="car.BRAND + ' ' + car.MODEL" />
        </div>
        <h3>{{ car.BRAND }} {{ car.MODEL }}</h3>
        <p>Fuel: {{ car.FUEL }}</p>
        <p>Transmission: {{ car.TRANSMISSION }}</p>
        <p>Price: ${{ car.PRICE_DAY }} / day</p>
        <p>{{ car.count }} available</p>
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
      cars: [], // Toutes les voitures récupérées depuis l'API
      selectedFuel: '', // Type de carburant sélectionné
      maxPrice: 0 // Prix maximum
    }
  },
  computed: {
    filteredCars () {
      return this.cars.filter((car) => {
        // Filtre par carburant
        const matchesFuel =
          this.selectedFuel === '' || car.FUEL === this.selectedFuel

        // Filtre par prix
        const matchesPrice =
          this.maxPrice === 0 || car.PRICE_DAY <= this.maxPrice

        return matchesFuel && matchesPrice
      })
    },
    groupedCars () {
      const grouped = {}

      // Regrouper les voitures par modèle et autres propriétés pertinentes
      this.filteredCars.forEach((car) => {
        const key = `${car.BRAND}-${car.MODEL}-${car.FUEL}-${car.TRANSMISSION}-${car.PRICE_DAY}`
        if (!grouped[key]) {
          grouped[key] = {
            ...car,
            count: 1
          }
        } else {
          grouped[key].count += 1
        }
      })

      // Convertir l'objet en tableau
      return Object.values(grouped)
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
