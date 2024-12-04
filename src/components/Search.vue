<template>
  <transition name="fade">
    <section class="search" v-show="isVisible">
      <div class="container">
        <h2>Find Your Perfect Ride</h2>
        <form>
          <label for="location">Pick-up Location:</label>
          <input type="text" id="location" placeholder="Enter city or location" />
          <label for="date">Pick-up Date:</label>
          <input type="date" id="date" />
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  </transition>
</template>

<script>
export default {
  name: 'UserSearch',
  data () {
    return {
      isVisible: false // Contrôle la visibilité de la section
    }
  },
  mounted () {
    // Affiche la section après un délai pour appliquer l'animation
    setTimeout(() => {
      this.isVisible = true
    }, 500) // Délai de 500ms
  }
}
</script>

<style scoped>
/* Transition fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Styles pour le formulaire */
.search form input,
.search form button {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease; /* Transition fluide pour les effets */
}

.search form button {
  font-family: 'Oswald', sans-serif;
  background-color: #767079;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

/* Effet au survol */
.search form button:hover {
  background-color: #0056b3;
  transform: scale(1.1); /* Légère augmentation de la taille */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ajout d'une ombre */
}

/* Effet au clic */
.search form button:active {
  transform: scale(1); /* Retour à la taille normale */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Ombre réduite */
}
</style>
