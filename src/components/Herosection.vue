<template>
    <section class="hero-section">
      <!-- Vidéo de fond -->
      <div class="background-video">
        <video autoplay muted loop playsinline>
          <source src="@/assets/video3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Bouton en haut à droite -->
      <div class="top-right-button">
        <button class="custom-button small" @click="navigateToCars">Available Cars</button>
      </div>

      <!-- Contenu principal avec animation -->
      <transition name="fade-slide">
        <div class="hero-content" v-if="isVisible">
          <h1>DriveEase - Car Rental</h1>
          <button class="custom-button permanent" @click="navigateToCars">Available Cars</button>
        </div>
      </transition>
    </section>
  </template>

<script>
export default {
  name: 'HeroSection',
  data () {
    return {
      isVisible: false // Contrôle l'affichage progressif
    }
  },
  mounted () {
    // Affiche le contenu après un délai
    setTimeout(() => {
      this.isVisible = true
    }, 500) // Délai de 500ms
  },
  methods: {
    navigateToCars () {
      this.$router.push('/cars')
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

  /* Bouton en haut à droite */
  .top-right-button {
    position: absolute;
    top: 20px;
    right: 20px;
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
