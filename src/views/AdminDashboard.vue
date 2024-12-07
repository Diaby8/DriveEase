<template>
    <section class="hero-section">
      <!-- Vidéo de fond -->
      <div class="background-video">
        <video autoplay muted loop playsinline>
          <source src="@/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <!-- Contenu principal avec animation -->
      <transition name="fade-slide">
        <div class="hero-content" v-if="isVisible">
          <h1>Bienvenue dans le tableau de bord Admin</h1>
          <p>Ceci est une page protégée accessible uniquement après authentification.</p>
        </div>
      </transition>
    </section>
  </template>

<script>
export default {
  name: 'AdminDashboard',
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
    font-size: 3rem;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-weight: bold;
  }

  /* Description */
  .hero-content p {
    font-size: 1.2rem;
    margin: 10px 0;
    color: #ddd;
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
