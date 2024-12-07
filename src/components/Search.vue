<template>
  <transition name="fade">
    <section class="search" v-show="isVisible">
      <div class="container">
        <h2>Find Your Perfect Ride</h2>
        <form @submit.prevent="handleSearch">
          <!-- Localisation -->
          <label for="location">Pick-up Location:</label>
          <select id="location" v-model="location" required>
            <option disabled value="">Select a location</option>
            <option value="Paris">Paris</option>
            <option value="Lyon">Lyon</option>
            <option value="Marseille">Marseille</option>
          </select>

          <!-- Date de départ -->
          <label for="startDate">Pick-up Date:</label>
          <input type="date" id="startDate" v-model="startDate" required />

          <!-- Date de retour -->
          <label for="endDate">Return Date:</label>
          <!-- Ajouter :min="startDate" pour bloquer les dates antérieures à startDate -->
          <input type="date" id="endDate" v-model="endDate" :min="startDate" required />

          <!-- Catégorie -->
          <label for="category">Category:</label>
          <select id="category" v-model="category" required>
            <option disabled value="">Select a category</option>
            <option value="luxury">Luxury</option>
            <option value="standard">Standard</option>
          </select>

          <!-- Bouton de soumission -->
          <button type="submit">Search</button>
        </form>
      </div>
    </section>
  </transition>
</template>
<script>
import axios from 'axios'

export default {
  name: 'UserSearch',
  data () {
    return {
      isVisible: false,
      location: '',
      startDate: '',
      endDate: '',
      category: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.isVisible = true
    }, 500)
  },
  methods: {
    async handleSearch () {
      // Validation des champs
      if (!this.location || !this.startDate || !this.endDate || !this.category) {
        alert('Veuillez remplir tous les champs.')
        return
      }

      // Vérification des dates
      const start = new Date(this.startDate)
      const end = new Date(this.endDate)

      if (start > end) {
        alert('The pick-up date cannot be after the return date.')
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/api/search/advanced', {
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate,
          category: this.category
        })

        if (response.data.success) {
          this.$router.push({
            path: '/search-results',
            query: {
              location: this.location,
              startDate: this.startDate,
              endDate: this.endDate,
              category: this.category
            }
          })
        } else {
          alert(response.data.message || 'No cars found for the selected criteria.')
        }
      } catch (error) {
        console.error('Erreur lors de la recherche avancée :', error)
        alert('Une erreur est survenue lors de la recherche.')
      }
    }
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
.search form select,
.search form button {
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.search form button {
  font-family: 'Oswald', sans-serif;
  background-color: #434548;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.search form button:hover {
  background-color: #0056b3;
  transform: scale(1.1);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
