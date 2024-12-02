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
      <router-view />
      <AppFooter />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/Header.vue'
import AppFooter from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
body {
  margin: 0;
  font-family: 'Oswald', sans-serif;
  background-color: #222;
}
.background-video video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}
.content {
  position: relative;
  z-index: 2;
}
</style>
