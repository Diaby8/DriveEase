<template>
  <div class="dashboard-container">
    <!-- Header -->
    <AppHeader />

    <!-- Background Video -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Informations utilisateur -->
    <section class="user-info">
      <h2>User Information</h2>
      <p><strong>Email:</strong> {{ userInfo.EMAIL_CLIENT }}</p>
      <form @submit.prevent="updateUserField('email', updatedEmail)">
        <input v-model="updatedEmail" type="email" placeholder="New Email" class="input-field" />
        <button type="submit" class="update-button">Update Email</button>
      </form>

      <p><strong>Phone:</strong> {{ userInfo.PHONE_CLIENT }}</p>
      <form @submit.prevent="updateUserField('phone', updatedPhone)">
        <input v-model="updatedPhone" type="text" placeholder="New Phone" class="input-field" />
        <button type="submit" class="update-button">Update Phone</button>
      </form>

      <p><strong>Address:</strong> {{ userInfo.ADDRESS_CLIENT }}</p>
      <form @submit.prevent="updateUserField('address', updatedAddress)">
        <input v-model="updatedAddress" type="text" placeholder="New Address" class="input-field" />
        <button type="submit" class="update-button">Update Address</button>
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
      <h2>Send a Message to DriveEase</h2>
      <form @submit.prevent="sendMessage" class="message-form">
        <textarea
          v-model="messageContent"
          placeholder="Write your message here"
          required
          rows="3"
        ></textarea>
        <button type="submit" class="send-button">Send Message</button>
      </form>

      <!-- Messages reçus -->
      <div v-if="messages.length > 0" class="received-messages">
        <h3>Recent Replies</h3>
        <ul>
          <li v-for="message in messages" :key="message.sent_at">
            <p>
              <strong>DriveEase:</strong> {{ message.content }}<br />
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
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    AppHeader
  },
  data () {
    return {
      userInfo: {},
      reservations: [],
      messages: [],
      messageContent: '',
      updatedEmail: '',
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
    updateUserField (field, value) {
      if (!value) {
        alert(`${field} cannot be empty`)
        return
      }

      const payload = { EMAIL_CLIENT: this.email }
      if (field === 'email') payload.EMAIL_CLIENT = value
      if (field === 'phone') payload.PHONE_CLIENT = value
      if (field === 'address') payload.ADDRESS_CLIENT = value

      axios.put('http://localhost:5000/api/users/update', payload)
        .then(() => {
          alert(`${field} updated successfully!`)
          if (field === 'email') {
            localStorage.setItem('userEmail', value)
            this.email = value
          }
          this.fetchUserInfo()
        })
        .catch(() => {
          alert(`Unable to update ${field}.`)
        })
    },
    formatDate (dateString) {
      return new Date(dateString).toLocaleDateString()
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

.dashboard-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 15px;
}

h2 {
  text-align: center;
  color: #007bff;
  margin-bottom: 15px;
}

.user-info {
  margin-bottom: 30px;
  text-align: center;
}

.input-field {
  width: 300px;
  margin: 10px auto;
  display: block;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.update-button {
  background: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.update-button:hover {
  background: #0056b3;
}

.reservation-card {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #007bff;
  padding: 20px;
  margin: 20px 0;
  border-radius: 8px;
}

.message-form textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.send-button {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.send-button:hover {
  background: #0056b3;
}
</style>
