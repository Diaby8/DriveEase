<template>
  <section class="cars">
    <div class="container">
      <div class="car-list">
        <div class="car" v-for="(car, index) in cars" :key="index">
          <img :src="car.image" :alt="car.name" />
          <h3>{{ car.name }}</h3>
          <p>{{ car.description }}</p>
          <button>Book Now</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CarsList',
  data () {
    return {
      cars: [
        {
          name: 'Standard',
          description: 'Perfect for city driving. Compact and fuel-efficient.',
          image: require('../assets/standardCars.jpg')
        },
        {
          name: 'Luxury',
          description: 'Travel in style with premium comfort and features.',
          image: require('../assets/luxuryCars.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
.cars .car-list {
  display: flex;
  justify-content: space-between; /* Alignement serré */
  gap: 10px; /* Ajout d'un léger espacement entre les cartes */
  flex-wrap: wrap;
  margin-top: 2em;
}

.cars .car {
  width: 48%; /* Ajustement de la largeur pour coller les cartes */
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  margin: 0; /* Suppression des marges verticales */
  transition: transform 0.4s ease; /* Effet de zoom */
}

.cars .car:hover {
  transform: scale(1.05); /* Zoom sur la carte au survol */
}

.cars .car img {
  max-width: 100%;
  height: auto;
  aspect-ratio: 16/9; /* Uniformise le ratio des images */
  border-radius: 10px;
  transition: transform 0.4s ease; /* Effet de zoom sur l'image */
}

.cars .car img:hover {
  transform: scale(1.1); /* Zoom sur l'image au survol */
}

.cars .car h3 {
  font-size: 1.5rem;
  margin: 0.5em 0;
}

.cars .car p {
  font-size: 1rem;
  margin: 0.5em 0 1em;
}

button {
  background-color: beige;
  border-radius: 20px;
  border: none;
  transition: transform 0.3s ease, background-color 0.3s ease;
  padding: 10px;
  font-size: 1rem;
}

button:hover {
  background-color: rgb(255, 255, 255);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .cars .car {
    width: 100%; /* Les cartes prennent toute la largeur sur mobile */
    margin-bottom: 20px;
  }

  .cars .car img {
    aspect-ratio: unset; /* Supprime le ratio sur mobile */
  }
}
</style>
