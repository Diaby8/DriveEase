<template>
    <section class="cars">
      <div class="container">
        <h2>Our Cars</h2>
        <div class="car-list">
          <div class="car" v-for="(car, index) in cars" :key="index">
            <img :src="car.image" :alt="car.name">
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
          name: 'Economy',
          description: 'Perfect for city driving. Compact and fuel-efficient.',
          image: require('../assets/car1.jpg')
        },
        {
          name: 'SUV',
          description: 'Spacious and powerful, ideal for family trips.',
          image: require('../assets/car2.jpg')
        },
        {
          name: 'Luxury',
          description: 'Travel in style with premium comfort and features.',
          image: require('../assets/car3.jpg')
        }
      ]
    }
  }
}
</script>

  <style scoped>
  .cars .car-list {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-top: 2em;
  }
  .cars .car {
    width: 30%;
    background: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 10px;
    text-align: center;
    margin: 10px;
  }
  .cars .car img {
    max-width: 100%;
    border-radius: 5px;
  }
  </style>
