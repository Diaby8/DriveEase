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

      <!-- Formulaire pour mettre à jour les informations -->
      <form @submit.prevent="updateUserInfo" class="update-form">
        <label>Phone:</label>
        <input v-model="updatedPhone" type="text" placeholder="New phone number" />
        <label>Address:</label>
        <input v-model="updatedAddress" type="text" placeholder="New address" />
        <button type="submit" class="send-button">Update Info</button>
      </form>
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

    <!-- Messagerie -->
    <section class="messages">
      <h2>Send a Message to Admin</h2>
      <form @submit.prevent="sendMessage" class="message-form">
        <textarea
          v-model="messageContent"
          placeholder="Write your message here"
          required
          rows="5"
        ></textarea>
        <button type="submit" class="send-button">Send Message</button>
      </form>

      <!-- Messages reçus -->
      <div v-if="messages.length > 0" class="received-messages">
        <h3>Admin Replies</h3>
        <ul>
          <li v-for="message in messages" :key="message.sent_at">
            <p>
              <strong>Admin:</strong> {{ message.content }}<br />
              <small>{{ formatDate(message.sent_at) }}</small>
            </p>
          </li>
        </ul>
      </div>
      <p v-else class="no-messages">No replies received yet.</p>
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
      messages: [],
      messageContent: '',
      updatedPhone: '',
      updatedAddress: '',
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
      this.fetchMessages()
    }
  },
  methods: {
    fetchUserInfo () {
      axios.post('http://localhost:5000/authUser/me', { email: this.email }).then((response) => {
        this.userInfo = response.data.user
      })
    },
    fetchReservations () {
      axios.post('http://localhost:5000/contracts/user', { email: this.email }).then((response) => {
        this.reservations = response.data.reservations
      })
    },
    fetchMessages () {
      axios.get(`http://localhost:5000/api/users/messages?email=${this.email}`).then((response) => {
        this.messages = response.data
      })
    },
    sendMessage () {
      axios.post('http://localhost:5000/api/users/messages/send', {
        sender: this.email,
        recipient: 'admin@driveease.com',
        content: this.messageContent
      })
        .then(() => {
          alert('Message sent successfully!')
          this.messageContent = ''
          this.fetchMessages()
        })
        .catch(() => {
          alert('Unable to send message.')
        })
    },
    updateUserInfo () {
      axios.put('http://localhost:5000/api/users/update', {
        EMAIL_CLIENT: this.email,
        PHONE_CLIENT: this.updatedPhone,
        ADDRESS_CLIENT: this.updatedAddress
      })
        .then(() => {
          alert('Information updated successfully!')
          this.fetchUserInfo()
        })
        .catch(() => {
          alert('Unable to update information.')
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

h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 15px;
}

/* Update Form */
.update-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  border: none;
}

.send-button {
  padding: 10px 15px;
  background-color: #007bff;
  border: none;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #0056b3;
}

.reservation-card {
  border: 2px solid #007bff;
  padding: 15px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.8);
}

.received-messages ul {
  list-style: none;
  padding: 0;
}

.received-messages li {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.no-messages {
  text-align: center;
  color: #ddd;
}
</style>
