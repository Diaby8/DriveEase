<template>
  <aside class="sidebar">
    <div class="filter-group">
      <label for="location">Filter by Location:</label>
      <select id="location" v-model="localSelectedLocation" @change="updateLocation">
        <option value="">All</option>
        <option value="1">Paris</option>
        <option value="2">Marseille</option>
        <option value="3">Lyon</option>
      </select>
    </div>
    <div class="filter-group">
      <label for="price">Max Price ($/day):</label>
      <input
        id="price"
        type="number"
        v-model.number="localMaxPrice"
        @input="updatePrice"
        placeholder="Enter max price"
      />
    </div>
  </aside>
</template>

<script>
export default {
  name: 'FilterSidebar',
  props: {
    selectedLocation: {
      type: [String, Number],
      default: ''
    },
    maxPrice: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      localSelectedLocation: this.selectedLocation,
      localMaxPrice: this.maxPrice
    }
  },
  methods: {
    updateLocation () {
      this.$emit('update:selectedLocation', this.localSelectedLocation)
    },
    updatePrice () {
      this.$emit('update:maxPrice', this.localMaxPrice)
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: rgba(0, 0, 0, 0.8);
  padding: 20px;
  border-radius: 10px;
  color: white;
}

.filter-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
}

select,
input {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #ffffff;
  color: #333333;
  font-size: 1rem;
}

input[type="number"] {
  appearance: none; /* Modern browsers */
  -moz-appearance: none; /* Pour Firefox */
  -webkit-appearance: none; /* Pour Chrome/Safari */
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
