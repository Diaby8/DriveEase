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

    <div class="filter-group">
      <label for="transmission">Filter by Transmission:</label>
      <select id="transmission" v-model="localSelectedTransmission" @change="updateTransmission">
        <option value="">All</option>
        <option value="MANUAL">Manual</option>
        <option value="AUTOMATIC">Automatic</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="motorisation">Filter by Motorisation:</label>
      <select id="motorisation" v-model="localSelectedMotorisation" @change="updateMotorisation">
        <option value="">All</option>
        <option value="PETROL">Petrol</option>
        <option value="DIESEL">Diesel</option>
        <option value="HYBRID">Hybrid</option>
        <option value="ELECTRIC">Electric</option>
      </select>
    </div>

    <div class="filter-group">
      <label for="brand">Filter by Brand:</label>
      <select id="brand" v-model="localSelectedBrand" @change="updateBrand">
        <option value="">All</option>
        <option value="AUDI">Audi</option>
        <option value="BMW">BMW</option>
        <option value="FIAT">Fiat</option>
        <option value="MERCEDES-BENZ">Mercedes-Benz</option>
        <option value="PEUGEOT">Peugeot</option>
        <option value="RANGE ROVER">Range Rover</option>
        <option value="RENAULT">Renault</option>
        <option value="TESLA">Tesla</option>
        <option value="TOYOTA">Toyota</option>
        <option value="VOLKSWAGEN">Volkswagen</option>
      </select>
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
    },
    selectedTransmission: {
      type: String,
      default: ''
    },
    selectedMotorisation: {
      type: String,
      default: ''
    },
    selectedBrand: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      localSelectedLocation: this.selectedLocation,
      localMaxPrice: this.maxPrice,
      localSelectedTransmission: this.selectedTransmission,
      localSelectedMotorisation: this.selectedMotorisation,
      localSelectedBrand: this.selectedBrand
    }
  },
  methods: {
    updateLocation () {
      this.$emit('update:selectedLocation', this.localSelectedLocation)
    },
    updatePrice () {
      this.$emit('update:maxPrice', this.localMaxPrice)
    },
    updateTransmission () {
      this.$emit('update:selectedTransmission', this.localSelectedTransmission)
    },
    updateMotorisation () {
      this.$emit('update:selectedMotorisation', this.localSelectedMotorisation)
    },
    updateBrand () {
      this.$emit('update:selectedBrand', this.localSelectedBrand)
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
</style>
