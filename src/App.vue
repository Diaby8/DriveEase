<template>
    <div id="app">
      <div class="background-video">
        <video autoplay muted loop playsinline>
          <source src="@/assets/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div class="content">
        <AppHeader />
        <UserSearch />
        <CarList />
        <SiteFeatures />
        <AppFooter />
      </div>
    </div>
  </template>

<script>
import AppHeader from './components/Header.vue'
import UserSearch from './components/Search.vue'
import SiteFeatures from './components/Features.vue'
import CarList from './components/Cars.vue'
import AppFooter from './components/Footer.vue'
import './assets/styles.css' /* Import du fichier CSS global */

export default {
  name: 'App',
  components: {
    AppHeader,
    UserSearch,
    CarList,
    SiteFeatures,
    AppFooter
  }
}
</script>
