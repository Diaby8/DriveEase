<template>
  <header class="header">
    <div class="logo">
      <h1>DriveEase</h1>
    </div>
    <nav class="nav">
      <button class="nav-button" @click="navigateTo('home')">Home</button>
      <button class="nav-button" @click="navigateTo('standard')">Standard Cars</button>
      <button class="nav-button" @click="navigateTo('luxury')">Luxury Cars</button>
      <button class="nav-button" @click="navigateTo('contact')">Contact</button>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    navigateTo (route) {
      this.$router.push(`/${route}`)
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #333;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
}

.nav {
  display: flex;
  gap: 15px;
}

.nav-button {
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

.nav-button:hover {
  background-color: white;
  color: black;
  transform: scale(1.1);
}
</style>
