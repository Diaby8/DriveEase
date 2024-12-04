<template>
  <div id="app">
    <div class="content">
      <router-view />
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from './components/AppFooter.vue'
export default {
  name: 'AppFooter',
  components: {
    Footer
  }
}
</script>
