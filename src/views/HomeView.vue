<template>
  <div>
    <HeroSection />
    <UserSearch />
    <CarType />
    <SiteFeatures />
  </div>
</template>

<script>
import HeroSection from '../components/Herosection.vue'
import UserSearch from '../components/Search.vue'
import CarType from '../components/CarsType.vue'
import SiteFeatures from '../components/Features.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    CarType,
    UserSearch,
    SiteFeatures
  }
}
</script>
