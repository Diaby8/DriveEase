<template>
  <div class="admin-dashboard-container">
    <h1>Admin Dashboard</h1>
    <h2>Reservations List</h2>
    <table class="reservations-table">
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Car</th>
          <th>Pick-up Date</th>
          <th>Return Date</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reservation in reservations" :key="reservation.ID_CONTRACT">
          <td>{{ reservation.clientFirstName }} {{ reservation.clientLastName }}</td>
          <td>{{ reservation.clientEmail }}</td>
          <td>{{ reservation.clientPhone }}</td>
          <td>{{ reservation.carBrand }} {{ reservation.carModel }}</td>
          <td>{{ formatDate(reservation.PICKUP_DATE) }}</td>
          <td>{{ formatDate(reservation.RETURN_DATE) }}</td>
          <td>{{ reservation.TOTAL_PRICE }}€</td>
        </tr>
      </tbody>
    </table>
    <p v-if="reservations.length === 0" class="no-data">No reservations found.</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data () {
    return {
      reservations: [] // Liste des réservations
    }
  },
  created () {
    this.fetchReservations()
  },
  methods: {
    fetchReservations () {
      axios
        .get('http://localhost:5000/contracts/all')
        .then((response) => {
          this.reservations = response.data.reservations
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des réservations :', error)
          alert('Impossible de récupérer les réservations.')
        })
    },
    formatDate (dateString) {
      // Convertit une date au format ISO en "YYYY-MM-DD"
      return new Date(dateString).toISOString().split('T')[0]
    }
  }
}
</script>

<style scoped>
.admin-dashboard-container {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  background: #333; /* Fond sombre */
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  color: white; /* Texte en blanc */
}

h1 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white; /* Titre principal en blanc */
}

h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: white; /* Sous-titre en blanc */
}

.reservations-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.reservations-table th,
.reservations-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: center;
}

.reservations-table th {
  background-color: #555; /* Fond des en-têtes */
  color: white; /* Texte des en-têtes en blanc */
}

.reservations-table tr:nth-child(even) {
  background-color: #444; /* Alternance des lignes */
}

.reservations-table tr:hover {
  background-color: #555; /* Survol des lignes */
}

.reservations-table td {
  color: white; /* Texte des cellules en blanc */
}

.no-data {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
  color: #ccc; /* Texte pour les messages d'absence de données */
}
</style>
