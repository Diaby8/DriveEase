<template>
  <section class="cars">
    <div class="container">
      <div class="car-list">
        <div class="car" v-for="(car, index) in cars" :key="index">
          <div class="image-wrapper">
            <img :src="car.image" :alt="car.name" />
          </div>
          <h3>{{ car.name }}</h3>
          <p>{{ car.description }}</p>
          <button class="book-now-button">Book Now</button>
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
/* Conteneur pour les voitures */
.cars .car-list {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 2em;
}

/* Carte individuelle */
.cars .car {
  width: 48%; /* S'assure que chaque carte occupe la moitié de la largeur */
  background: rgba(255, 255, 255, 0.1);
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  transition: transform 0.4s ease;
}

.cars .car:hover {
  transform: scale(1.05); /* Zoom sur la carte au survol */
}

/* Wrapper pour garder la taille uniforme */
.image-wrapper {
  width: 100%;
  aspect-ratio: 16/9; /* Maintient un ratio uniforme pour toutes les images */
  overflow: hidden;
  border-radius: 10px;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Remplit le conteneur tout en respectant les proportions */
}

/* Titre et description */
.cars .car h3 {
  font-size: 1.5rem;
  margin: 0.5em 0;
}

.cars .car p {
  font-size: 1rem;
  margin: 0.5em 0 1em;
}

/* Style du bouton Book Now */
.book-now-button {
  background-color: transparent;
  font-family: 'Oswald', sans-serif;
  border-radius: 20px;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Effets au survol */
.book-now-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}

/* Styles pour les écrans mobiles */
@media (max-width: 768px) {
  .cars .car {
    width: 100%; /* Une carte par ligne sur les petits écrans */
    margin-bottom: 20px;
  }
}
</style>
