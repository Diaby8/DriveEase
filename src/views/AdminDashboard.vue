<template>
  <section class="admin-dashboard">
    <div class="dashboard-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin!</p>
      <div class="actions">
        <button @click="manageCars">Manage Cars</button>
        <button @click="viewReservations">View Reservations</button>
        <button @click="logout">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdminDashboard',
  methods: {
    manageCars () {
      this.$router.push('/manage-cars') // Exemple de navigation
    },
    viewReservations () {
      this.$router.push('/view-reservations') // Exemple de navigation
    },
    logout () {
      this.$router.push('/admin-login') // Retour à la page de login
    }
  }
}
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: #f5f5f5;
  text-align: center;
  font-family: 'Oswald', sans-serif;
}

.dashboard-container {
  padding: 20px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 50%;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #555;
}
</style>
