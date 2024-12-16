<template>
  <div class="dashboard-container">
    <!-- Background Video -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

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
      <ul v-if="reservations.length > 0" class="reservation-list">
        <li v-for="reservation in reservations" :key="reservation.ID_CONTRACT" class="reservation-card">
          <p><strong>Car:</strong> {{ reservation.carBrand }} {{ reservation.carModel }}</p>
          <p><strong>Pick-up Date:</strong> {{ formatDate(reservation.PICKUP_DATE) }}</p>
          <p><strong>Return Date:</strong> {{ formatDate(reservation.RETURN_DATE) }}</p>
          <p><strong>Total Price:</strong> {{ reservation.TOTAL_PRICE }}€</p>
        </li>
      </ul>
      <p v-else class="no-reservations">No reservations found.</p>
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
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  color: white;
  font-family: "Oswald", sans-serif;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

/* Header */
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 15px 30px;
  border-radius: 10px;
  margin-bottom: 40px;
}

.site-header h1 {
  font-size: 2rem;
  font-weight: bold;
  text-transform: uppercase;
}

.header-nav button {
  background: transparent;
  border: 2px solid white;
  color: white;
  padding: 10px 20px;
  margin: 0 5px;
  font-size: 1rem;
  text-transform: uppercase;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.header-nav button:hover {
  background: white;
  color: black;
}

/* User Information Section */
.user-info, .reservations {
  background-color: rgba(0, 0, 0, 0.7);
  padding: 20px 30px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.4);
}

.user-info h2, .reservations h2 {
  font-size: 1.8rem;
  color: #007bff;
  text-transform: uppercase;
  text-align: center;
}

.user-info p, .reservations p {
  font-size: 1rem;
  margin: 10px 0;
}

/* Reservations List */
.reservation-list {
  list-style: none;
  padding: 0;
}

.reservation-card {
  background-color: rgba(0, 0, 0, 0.8);
  border: 2px solid #007bff;
  padding: 15px 20px;
  margin: 10px 0;
  border-radius: 8px;
  transition: transform 0.3s ease;
  color: white;
}

.reservation-card:hover {
  transform: scale(1.02);
  border-color: #0056b3;
}

.no-reservations {
  text-align: center;
  font-size: 1.2rem;
  color: #ddd;
}
</style>
