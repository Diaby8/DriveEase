<template>
  <header :class="['header', { 'header-hidden': isHeaderHidden }]">
    <!-- Logo en haut à gauche -->
    <div class="logo">
      <img src="@/assets/logoDE.png" alt="DriveEase Logo" class="logo-image" />
    </div>
    <!-- Navigation -->
    <nav class="nav">
      <button class="hero-button" @click="navigateTo('home')">Home</button>
      <button class="hero-button" @click="navigateTo('standard')">Standard Cars</button>
      <button class="hero-button" @click="navigateTo('luxury')">Luxury Cars</button>
      <button class="hero-button" @click="navigateTo('contact')">Contact</button>
      <button
        class="hero-button"
        v-if="!isLoggedIn"
        @click="navigateTo('login')"
      >
        Login
      </button>
      <button
        class="hero-button"
        v-if="isLoggedIn"
        @click="logout"
      >
        Logout
      </button>
      <button
        class="hero-button"
        v-if="isLoggedIn"
        @click="navigateTo('dashboard')"
      >
        Dashboard
      </button>
    </nav>
  </header>
</template>

<script>
export default {
  data () {
    return {
      lastScrollPosition: 0,
      isHeaderHidden: false
    }
  },
  computed: {
    isLoggedIn () {
      return !!localStorage.getItem('userToken') // Vérifie si l'utilisateur est connecté
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push(`/${route}`)
    },
    logout () {
      localStorage.removeItem('userToken') // Supprime le token utilisateur
      alert('You have been logged out.')
      this.$router.push('/') // Redirige vers la page d'accueil
    },
    handleScroll () {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop
      this.isHeaderHidden = currentScroll > this.lastScrollPosition && currentScroll > 50
      this.lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  position: fixed; /* Fixe le header en haut */
  top: 0;
  left: 0;
  width: 100%;
  background: transparent; /* Fond transparent */
  color: white;
  z-index: 1000; /* Assure que le header est au-dessus du contenu */
  transition: transform 0.3s ease-out; /* Animation fluide */
}

.header-hidden {
  transform: translateY(-100%); /* Fait disparaître le header */
}

.logo {
  display: flex;
  align-items: center;
}

.logo-image {
  width: 120px; /* Taille agrandie du logo */
  height: auto;
}

.nav {
  display: flex;
  gap: 15px;
}

/* Boutons Hero */
.hero-button {
  font-family: 'Oswald', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  color: white;
  background-color: transparent;
  border: 2px solid white;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.hero-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}
</style>
