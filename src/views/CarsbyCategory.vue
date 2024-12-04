<template>
  <div class="cars-by-category">
    <h1>Voitures {{ carType }}</h1>
    <div class="cars-list">
      <div
        v-for="car in filteredCars"
        :key="car.IMMATRICULATION"
        class="car-card"
      >
        <img :src="car.IMAGE_URL" :alt="car.BRAND + ' ' + car.MODEL" />
        <h3>{{ car.BRAND }} {{ car.MODEL }}</h3>
        <p>{{ car.FUEL }} - {{ car.TRANSMISSION }}</p>
        <p>Prix par jour : {{ car.PRICE_DAY }} €</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cars: [], // Tous les véhicules
      carType: this.$route.params.type // Récupération du type via les paramètres de la route
    }
  },
  computed: {
    filteredCars () {
      return this.cars.filter((car) => car.TYPE_CARS === this.carType)
    }
  },
  created () {
    // Simulez une requête pour récupérer les voitures
    this.cars = [
      {
        BRAND: 'Mercedes',
        MODEL: 'Classe A',
        FUEL: 'Diesel',
        TRANSMISSION: 'Manuel',
        IMAGE_URL: '/images/cars/Mercedes_ClasseA_Black.png',
        TYPE_CARS: 'LUXURY',
        PRICE_DAY: 100,
        IMMATRICULATION: 'AB-123-CD'
      },
      {
        BRAND: 'Renault',
        MODEL: 'Clio',
        FUEL: 'Essence',
        TRANSMISSION: 'Automatique',
        IMAGE_URL: '/images/cars/Renault_Clio_Black.jpg',
        TYPE_CARS: 'STANDARD',
        PRICE_DAY: 40,
        IMMATRICULATION: 'EF-456-GH'
      }
    ]
  },
  watch: {
    '$route.params.type' (newType) {
      this.carType = newType // Met à jour le type de voiture si la route change
    }
  }
}
</script>

<style scoped>
.cars-by-category {
  padding: 20px;
  text-align: center;
}

.cars-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
}

.car-card {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 10px;
  width: 200px;
  text-align: center;
}

.car-card img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.car-card h3 {
  margin: 10px 0;
}
</style>
