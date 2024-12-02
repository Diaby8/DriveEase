<template>
  <div>
    <UserSearch />
    <CarList />
    <SiteFeatures />
  </div>
</template>

<script>
import UserSearch from '../components/Search.vue'
import CarList from '../components/Cars.vue'
import SiteFeatures from '../components/Features.vue'

export default {
  name: 'HomeView',
  components: {
    UserSearch,
    CarList,
    SiteFeatures
  }
}
</script>
