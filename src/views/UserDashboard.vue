<template>
    <div class="dashboard-container">
      <!-- Header -->
      <header class="site-header">
        <h1>Car Rental Dashboard</h1>
        <nav class="header-nav">
          <button @click="navigateToHome">Home</button>
          <button @click="logout">Logout</button>
        </nav>
      </header>

      <!-- Main Content -->
      <main class="dashboard-main">
        <!-- Informations utilisateur -->
        <section class="user-info">
          <h2>User Information</h2>
          <div class="info-grid">
            <div>
              <p><strong>Phone:</strong></p>
              <p>{{ userInfo.PHONE_CLIENT }}</p>
            </div>
            <div>
              <p><strong>Address:</strong></p>
              <p>{{ userInfo.ADDRESS_CLIENT }}</p>
            </div>
          </div>
        </section>

        <!-- Réservations -->
        <section class="reservations">
          <h2>Your Reservations</h2>
          <ul v-if="reservations.length > 0" class="reservation-list">
            <li v-for="reservation in reservations" :key="reservation.ID_CONTRACT" class="reservation-card">
              <div class="reservation-details">
                <p><strong>Car:</strong> {{ reservation.carBrand }} {{ reservation.carModel }}</p>
                <p><strong>Pick-up Date:</strong> {{ formatDate(reservation.PICKUP_DATE) }}</p>
                <p><strong>Return Date:</strong> {{ formatDate(reservation.RETURN_DATE) }}</p>
                <p><strong>Total Price:</strong> {{ reservation.TOTAL_PRICE }}€</p>
              </div>
            </li>
          </ul>
          <p v-else class="no-reservations">You have no reservations at the moment.</p>
        </section>
      </main>
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
      email: localStorage.getItem('userEmail') // Email stocké après connexion
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
          alert('Unable to retrieve user information.')
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
          alert('Unable to retrieve your reservations.')
        })
    },
    formatDate (dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
    navigateToHome () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('userEmail')
      localStorage.removeItem('userToken')
      alert('You have been logged out.')
      this.$router.push('/login')
    }
  }
}
</script>

  <style scoped>
  /* Global Container */
  .dashboard-container {
    max-width: 1000px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: "Oswald", sans-serif;
  }

  /* Header */
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #333;
    padding: 15px 20px;
    color: white;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .site-header h1 {
    font-size: 1.5rem;
    margin: 0;
  }

  .header-nav {
    display: flex;
    gap: 15px;
  }

  .header-nav button {
    padding: 8px 15px;
    font-size: 0.9rem;
    color: white;
    background: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .header-nav button:hover {
    background: #0056b3;
  }

  /* Main Dashboard Content */
  .dashboard-main {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  /* User Information Section */
  .user-info {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .user-info h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .info-grid div {
    background-color: #f9f9f9;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .info-grid p {
    margin: 0;
    color: #555;
  }

  /* Reservations Section */
  .reservations {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .reservations h2 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 15px;
  }

  .reservation-list {
    list-style: none;
    padding: 0;
  }

  .reservation-card {
    background-color: #f9f9f9;
    margin: 10px 0;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .reservation-card:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .reservation-card p {
    margin: 5px 0;
    color: #444;
    font-size: 0.9rem;
  }

  .no-reservations {
    font-size: 1rem;
    color: #666;
    text-align: center;
    margin-top: 15px;
  }
  </style>
