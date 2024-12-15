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

    <!-- Informations utilisateur -->
    <section class="user-info">
      <h2>User Information</h2>
      <p><strong>Email:</strong> {{ userInfo.EMAIL_CLIENT }}</p>
      <p><strong>Phone:</strong> {{ userInfo.PHONE_CLIENT }}</p>
      <p><strong>Address:</strong> {{ userInfo.ADDRESS_CLIENT }}</p>
    </section>

    <!-- Réservations -->
    <section class="reservations">
      <h2>Your Reservations</h2>
      <ul v-if="reservations.length > 0">
        <li v-for="reservation in reservations" :key="reservation.ID_CONTRACT">
          <p><strong>Car:</strong> {{ reservation.carBrand }} {{ reservation.carModel }}</p>
          <p><strong>Pick-up Date:</strong> {{ formatDate(reservation.PICKUP_DATE) }}</p>
          <p><strong>Return Date:</strong> {{ formatDate(reservation.RETURN_DATE) }}</p>
          <p><strong>Total Price:</strong> {{ reservation.TOTAL_PRICE }}€</p>
        </li>
      </ul>
      <p v-else>No reservations found.</p>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      userInfo: {},
      reservations: [],
      email: localStorage.getItem('userEmail')
    }
  },
  created () {
    if (!this.email) {
      alert('You are not logged in. Redirecting to login.')
      this.$router.push('/login')
    } else {
      this.fetchUserInfo()
      this.fetchReservations()
    }
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
          console.error('Error fetching user information:', error)
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
          console.error('Error fetching reservations:', error)
          alert('Unable to retrieve reservations.')
        })
    },
    formatDate (dateString) {
      return new Date(dateString).toLocaleDateString()
    },
    navigateToHome () {
      this.$router.push('/')
    },
    logout () {
      localStorage.removeItem('userEmail')
      alert('You have been logged out.')
      this.$router.push('/login')
    }
  }
}
</script>

  <style scoped>
  /* Background Video */
  .background-video {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    overflow: hidden;
  }

  .background-video video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Global Container */
  .dashboard-container {
    max-width: 1000px;
    margin: 50px auto;
    padding: 20px;
    color: white;
    font-family: "Oswald", sans-serif;
  }

  /* Header */
  .site-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(51, 51, 51, 0.8);
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
    background-color: rgba(255, 255, 255, 0.9);
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
    background-color: rgba(255, 255, 255, 0.9);
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
