<template>
  <div>
    <HeroSection />
    <UserSearch />
    <CarList />
    <SiteFeatures />
  </div>
</template>

<script>
import HeroSection from '../components/Herosection.vue'
import UserSearch from '../components/Search.vue'
import CarList from '../components/Cars.vue'
import SiteFeatures from '../components/Features.vue'

export default {
  name: 'HomeView',
  components: {
    HeroSection,
    CarList,
    UserSearch,
    SiteFeatures
  }
}
</script>
