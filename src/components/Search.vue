<template>
  <section class="search">
    <form @submit.prevent="handleSearch">
      <!-- Formulaire pour sélectionner la localisation, les dates, et la catégorie -->
      <label for="location">Pick-up Location:</label>
      <select id="location" v-model="location" required>
        <option disabled value="">Select a location</option>
        <option value="Paris">Paris</option>
        <option value="Lyon">Lyon</option>
        <option value="Marseille">Marseille</option>
      </select>

      <label for="startDate">Pick-up Date:</label>
      <input type="date" id="startDate" v-model="startDate" required />

      <label for="endDate">Return Date:</label>
      <input type="date" id="endDate" v-model="endDate" :min="startDate" required />

      <label for="category">Category:</label>
      <select id="category" v-model="category" required>
        <option disabled value="">Select a category</option>
        <option value="luxury">Luxury</option>
        <option value="standard">Standard</option>
      </select>

      <button type="submit">Search</button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'UserSearch',
  data () {
    return {
      location: '',
      startDate: '',
      endDate: '',
      category: ''
    }
  },
  methods: {
    handleSearch () {
      // Vérification des champs obligatoires
      if (!this.location || !this.startDate || !this.endDate || !this.category) {
        alert('Please fill in all fields.')
        return
      }

      // Validation des dates
      const start = new Date(this.startDate)
      const end = new Date(this.endDate)

      if (start > end) {
        alert('Start date cannot be after end date.')
        return
      }

      // Redirection vers la page avec les filtres appliqués
      this.$router.push({
        path: this.category === 'luxury' ? '/luxury' : '/standard',
        query: {
          location: this.location,
          startDate: this.startDate,
          endDate: this.endDate
        }
      })
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
