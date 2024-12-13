<template>
    <div class="dashboard-container">
      <h1>Welcome, {{ userInfo.firstName }}</h1>
      <h2>Your Reservations</h2>
      <ul v-if="reservations.length > 0">
        <li v-for="reservation in reservations" :key="reservation.id">
          <p>Car: {{ reservation.carName }}</p>
          <p>Pick-up Date: {{ reservation.pickupDate }}</p>
          <p>Return Date: {{ reservation.returnDate }}</p>
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
      userInfo: {},
      reservations: []
    }
  },
  created () {
    this.fetchUserInfo()
    this.fetchReservations()
  },
  methods: {
    fetchUserInfo () {
      const token = localStorage.getItem('userToken')
      axios
        .get('http://localhost:5000/authUser/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          this.userInfo = response.data.user
        })
        .catch((error) => {
          console.error('Error fetching user info:', error)
          alert('Failed to fetch user info. Redirecting to login.')
          this.$router.push('/login') // Redirige vers la page de connexion si non autorisé
        })
    },
    fetchReservations () {
      const token = localStorage.getItem('userToken')
      axios
        .get('http://localhost:5000/contracts/user', {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then((response) => {
          this.reservations = response.data.reservations
        })
        .catch((error) => {
          console.error('Error fetching reservations:', error)
          alert('Failed to fetch reservations.')
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
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
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
  }
  </style>
