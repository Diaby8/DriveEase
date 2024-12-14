<template>
    <div class="dashboard-container">
      <!-- Informations utilisateur -->
      <div class="user-info">
        <h1>Welcome, {{ userInfo.FIRST_NAME_CLIENT }} {{ userInfo.LAST_NAME_CLIENT }}</h1>
        <p><strong>Email:</strong> {{ userInfo.EMAIL_CLIENT }}</p>
        <p><strong>Phone:</strong> {{ userInfo.PHONE_CLIENT }}</p>
        <p><strong>Address:</strong> {{ userInfo.ADDRESS_CLIENT }}</p>
      </div>

      <!-- Réservations -->
      <h2>Your Reservations</h2>
      <ul v-if="reservations.length > 0">
        <li v-for="reservation in reservations" :key="reservation.ID_CONTRACT">
          <p><strong>Car:</strong> {{ reservation.carBrand }} {{ reservation.carModel }}</p>
          <p><strong>Pick-up Date:</strong> {{ reservation.PICKUP_DATE }}</p>
          <p><strong>Return Date:</strong> {{ reservation.RETURN_DATE }}</p>
          <p><strong>Total Price:</strong> {{ reservation.TOTAL_PRICE }}€</p>
        </li>
      </ul>
      <p v-else>No reservations found.</p>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  name: 'UserDashboard',
  data () {
    return {
      userInfo: {}, // Informations utilisateur
      reservations: [], // Liste des réservations
      email: localStorage.getItem('userEmail') // Stocke l'email après connexion
    }
  },
  created () {
    this.fetchUserInfo()
    this.fetchReservations()
  },
  methods: {
    fetchUserInfo () {
      axios
        .post('http://localhost:5000/authUser/me', { email: this.email })
        .then((response) => {
          if (response.data.success) {
            this.userInfo = response.data.user
          } else {
            alert(response.data.message)
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des infos utilisateur :', error)
          alert('Impossible de récupérer vos informations.')
        })
    },
    fetchReservations () {
      axios
        .post('http://localhost:5000/contracts/user', { email: this.email })
        .then((response) => {
          this.reservations = response.data.reservations
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des réservations :', error)
          alert('Impossible de récupérer vos réservations.')
        })
    }
  }
}
</script>

  <style scoped>
  .dashboard-container {
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    background: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    color: #333;
  }

  .user-info {
    margin-bottom: 30px;
  }

  .user-info h1 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .user-info p {
    margin: 5px 0;
    color: #555;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    background: #fff;
    margin: 10px 0;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    color: #333;
  }

  li p {
    margin: 5px 0;
  }
  </style>
