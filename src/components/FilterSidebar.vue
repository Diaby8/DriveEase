<template>
  <aside class="sidebar">
    <!-- Location Filter -->
    <div class="filter-group">
      <label for="location">Location:</label>
      <select id="location" v-model="localSelectedLocation" @change="updateLocation">
        <option value="">All</option>
        <option value="1">Paris</option>
        <option value="2">Marseille</option>
        <option value="3">Lyon</option>
      </select>
    </div>

    <!-- Price Filter -->
    <div class="filter-group">
      <label for="price">Max Price:</label>
      <input
        id="price"
        type="number"
        v-model.number="localMaxPrice"
        @input="updatePrice"
        placeholder="$ / day"
      />
    </div>

    <!-- Brand Filter -->
    <div class="filter-group">
      <label for="brand">Brand:</label>
      <select id="brand" v-model="localSelectedBrand" @change="updateBrand">
        <option value="">All</option>
        <option value="Audi">Audi</option>
        <option value="BMW">BMW</option>
        <option value="Renault">Renault</option>
      </select>
    </div>

    <!-- Motorisation Filter -->
    <div class="filter-group">
      <label for="motorisation">Motorisation:</label>
      <select id="motorisation" v-model="localSelectedMotorisation" @change="updateMotorisation">
        <option value="">All</option>
        <option value="PETROL">Petrol</option>
        <option value="DIESEL">Diesel</option>
        <option value="ELECTRIC">Electric</option>
      </select>
    </div>

    <!-- Type Filter -->
    <div class="filter-group">
      <label for="type">Type:</label>
      <select id="type" v-model="localSelectedType" @change="updateType">
        <option value="">All</option>
        <option value="CITYCAR">City Car</option>
        <option value="SUV">SUV</option>
      </select>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FilterSidebar',
  props: {
    selectedLocation: { type: [String, Number], default: '' },
    maxPrice: { type: Number, default: 0 },
    selectedBrand: { type: String, default: '' },
    selectedMotorisation: { type: String, default: '' },
    selectedType: { type: String, default: '' }
  },
  data () {
    return {
      localSelectedLocation: this.selectedLocation,
      localMaxPrice: this.maxPrice,
      localSelectedBrand: this.selectedBrand,
      localSelectedMotorisation: this.selectedMotorisation,
      localSelectedType: this.selectedType
    }
  },
  methods: {
    updateLocation () {
      this.$emit('update:selectedLocation', this.localSelectedLocation)
    },
    updatePrice () {
      this.$emit('update:maxPrice', this.localMaxPrice)
    },
    updateBrand () {
      this.$emit('update:selectedBrand', this.localSelectedBrand)
    },
    updateMotorisation () {
      this.$emit('update:selectedMotorisation', this.localSelectedMotorisation)
    },
    updateType () {
      this.$emit('update:selectedType', this.localSelectedType)
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 220px; /* Réduction de la largeur */
  max-height: 400px; /* Limite la hauteur totale */
  overflow-y: auto; /* Scroll vertical si nécessaire */
  background: rgba(0, 0, 0, 0.8);
  padding: 15px;
  border-radius: 8px;
  color: white;
  font-size: 0.9rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.5);
}

.filter-group {
  margin-bottom: 15px; /* Réduction de l'espacement vertical */
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 0.9rem;
}

select,
input {
  width: 100%;
  padding: 8px; /* Réduction du padding */
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #333333;
  font-size: 0.9rem;
}

.sidebar::-webkit-scrollbar {
  width: 8px; /* Scrollbar plus fine */
}

.sidebar::-webkit-scrollbar-thumb {
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>
