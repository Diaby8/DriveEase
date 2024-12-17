<template>
  <div>
    <HeroSection />
    <CarType />
    <SiteFeatures />
  </div>
</template>

<script>
import HeroSection from '../components/Herosection.vue'
import CarType from '../components/CarsType.vue'
import SiteFeatures from '../components/Features.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    CarType,
    SiteFeatures
  }
}
</script>
