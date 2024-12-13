<template>
  <section class="hero-section">
    <!-- Vidéo de fond -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video3.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Boutons en haut à droite -->
    <div class="top-right-buttons">
      <button class="custom-button small" @click="scrollToCars">Available Cars</button>
      <button
        class="custom-button small"
        v-if="!isLoggedIn"
        @click="navigateTo('login')"
      >
        Login
      </button>
      <button
        class="custom-button small"
        v-if="isLoggedIn"
        @click="logout"
      >
        Logout
      </button>
      <button
        class="custom-button small"
        v-if="isLoggedIn"
        @click="navigateTo('dashboard')"
      >
        Dashboard
      </button>
    </div>

    <!-- Contenu principal avec animation -->
    <transition name="fade-slide">
      <div class="hero-content" v-if="isVisible">
        <h1>DriveEase - Car Rental</h1>
        <button class="custom-button permanent" @click="scrollToCars">Available Cars</button>
      </div>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  data () {
    return {
      isVisible: false, // Contrôle l'affichage progressif
      isLoggedIn: !!localStorage.getItem('userToken') // Vérifie si l'utilisateur est connecté
    }
  },
  mounted () {
    // Affiche le contenu après un délai
    setTimeout(() => {
      this.isVisible = true
    }, 500) // Délai de 500ms
  },
  methods: {
    scrollToCars () {
      // Sélectionne la section avec l'ID "cars-section" et défile jusqu'à elle
      const carsSection = document.getElementById('cars-section')
      if (carsSection) {
        carsSection.scrollIntoView({ behavior: 'smooth' })
      }
    },
    navigateTo (route) {
      this.$router.push(`/${route}`) // Navigue vers la route spécifiée
    },
    logout () {
      localStorage.removeItem('userToken') // Supprime le token utilisateur
      alert('You have been logged out.')
      this.isLoggedIn = false // Met à jour l'état de connexion
      this.$router.go(0) // Recharge la page pour forcer le changement visuel
    }
  }
}
</script>

<style scoped>
/* Section principale */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

/* Vidéo de fond */
.background-video video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Contenu principal */
.hero-content {
  z-index: 1;
  margin: 0; /* Supprime tout espace inutile */
  padding: 0; /* Supprime les padding inutiles */
}

/* Style du titre */
.hero-content h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-weight: bold;
}

/* Boutons */
.custom-button {
  position: relative;
  padding: 10px 30px;
  font-size: 18px;
  text-transform: uppercase;
  font-family: 'Oswald', sans-serif;
  background: transparent;
  color: white;
  border: none;
  cursor: pointer;
  letter-spacing: 2px;
  overflow: hidden;
  transition: color 0.3s ease;
}

/* Traits pour les boutons */
.custom-button::before,
.custom-button::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: white;
  transition: transform 0.3s ease;
}

.custom-button::before {
  top: 0;
  transform-origin: right;
}

.custom-button::after {
  bottom: 0;
  transform-origin: left;
}

/* Boutons avec traits visibles en permanence */
.custom-button.permanent::before,
.custom-button.permanent::after {
  transform: scaleX(1); /* Traits visibles dès le départ */
}

.custom-button:hover {
  color: #ddd;
}

/* Boutons en haut à droite */
.top-right-buttons {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 15px;
  z-index: 2;
}

.custom-button.small {
  font-size: 14px;
  padding: 5px 20px;
}

/* Animation fade-slide */
.fade-slide-enter-active {
  transition: all 1s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
