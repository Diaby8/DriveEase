<template>
  <section class="cars">
    <div class="container">
      <div
        class="car-section"
        :class="{ reverse: index % 2 !== 0 }"
        v-for="(car, index) in cars"
        :key="index"
      >
        <!-- Image -->
        <div class="car-image">
          <img :src="car.image" :alt="car.name" />
        </div>
        <!-- Description -->
        <div class="car-description">
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
          image: require('../assets/car1.jpg')
        },
        {
          name: 'Luxury',
          description: 'Travel in style with premium comfort and features.',
          image: require('../assets/car2.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
.cars {
  padding: 50px 0;
}

.cars .car-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 50px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Apply reverse layout */
.cars .car-section.reverse {
  flex-direction: row-reverse;
}

.cars .car-image {
  flex: 1;
  text-align: center;
}

.cars .car-image img {
  max-width: 100%;
  border-radius: 10px;
}

.cars .car-description {
  flex: 1;
  padding: 20px;
  text-align: left;
  color: white;
}

.cars .car-description h3 {
  font-size: 2em;
  margin-bottom: 10px;
}

.cars .car-description p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.cars .car-description button {
  padding: 10px 20px;
  background-color: #ff9800;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.cars .car-description button:hover {
  transform: scale(1.1);
  background-color: #e68a00;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .cars .car-section {
    flex-direction: column;
    text-align: center;
  }

  .cars .car-description {
    text-align: center;
    padding: 10px;
  }
}
</style>
