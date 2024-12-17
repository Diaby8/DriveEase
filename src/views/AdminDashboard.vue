<template>
  <div class="admin-dashboard-container">
    <!-- Background Video -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Titre principal -->
    <h1>Admin Dashboard</h1>

    <!-- Section des Réservations -->
    <section class="reservations-section">
      <h2>Reservations List</h2>
      <table class="reservations-table" v-if="reservations.length > 0">
        <thead>
          <tr>
            <th>Client Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Car</th>
            <th>Pick-up Date</th>
            <th>Return Date</th>
            <th>Total Price</th>
            <th>Actions</th>
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
            <td>
              <button class="action-button cancel" @click="cancelReservation(reservation.ID_CONTRACT)">
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data">No reservations found.</p>
    </section>

    <!-- Section des Messages -->
    <section class="messages-section">
      <h2>Received Messages</h2>
      <table class="messages-table" v-if="messages.length > 0">
        <thead>
          <tr>
            <th>Sender</th>
            <th>Content</th>
            <th>Received At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="message in messages" :key="message.id">
            <td>{{ message.sender }}</td>
            <td>{{ message.content }}</td>
            <td>{{ formatDate(message.sent_at) }}</td>
            <td>
              <button class="action-button reply" @click="openReplyModal(message.sender)">Reply</button>
              <button class="action-button delete" @click="deleteMessage(message.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="no-data">No messages found.</p>
    </section>

    <!-- Modal de réponse -->
    <div v-if="showReplyModal" class="modal-overlay">
      <div class="modal-content">
        <h3>Reply to {{ selectedUserEmail }}</h3>
        <textarea v-model="replyContent" placeholder="Write your reply here"></textarea>
        <div class="modal-actions">
          <button @click="sendReply" class="action-button send">Send</button>
          <button @click="closeReplyModal" class="action-button close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminDashboard',
  data () {
    return {
      reservations: [],
      messages: [],
      showReplyModal: false,
      selectedUserEmail: '',
      replyContent: ''
    }
  },
  created () {
    this.fetchReservations()
    this.fetchMessages()
  },
  methods: {
    fetchReservations () {
      axios.get('http://localhost:5000/contracts/all')
        .then((response) => {
          this.reservations = response.data.reservations
        })
        .catch((error) => {
          console.error('Error fetching reservations:', error)
          alert('Unable to retrieve reservations.')
        })
    },
    cancelReservation (reservationId) {
      if (confirm('Are you sure you want to cancel this reservation?')) {
        axios.delete(`http://localhost:5000/contracts/${reservationId}`)
          .then(() => {
            alert('Reservation canceled successfully.')
            this.fetchReservations()
          })
          .catch((error) => {
            console.error('Error canceling reservation:', error)
            alert('Unable to cancel the reservation.')
          })
      }
    },
    fetchMessages () {
      axios.get('http://localhost:5000/api/users/messages', { params: { email: 'admin@driveease.com' } })
        .then((response) => {
          this.messages = response.data
        })
        .catch((error) => {
          console.error('Error fetching messages:', error)
          alert('Unable to retrieve messages.')
        })
    },
    deleteMessage (messageId) {
      if (confirm('Are you sure you want to delete this message?')) {
        axios.delete(`http://localhost:5000/api/users/messages/delete/${messageId}`)
          .then(() => {
            alert('Message deleted successfully.')
            this.fetchMessages()
          })
          .catch((error) => {
            console.error('Error deleting message:', error)
            alert('Unable to delete the message.')
          })
      }
    },
    openReplyModal (email) {
      this.selectedUserEmail = email
      this.showReplyModal = true
    },
    closeReplyModal () {
      this.showReplyModal = false
      this.replyContent = ''
    },
    sendReply () {
      if (!this.replyContent.trim()) {
        alert('Reply content cannot be empty.')
        return
      }

      axios.post('http://localhost:5000/api/users/messages/send', {
        sender: 'admin@driveease.com',
        recipient: this.selectedUserEmail,
        content: this.replyContent
      }).then(() => {
        alert('Reply sent successfully!')
        this.closeReplyModal()
      }).catch((error) => {
        console.error('Error sending reply:', error)
        alert('Unable to send reply.')
      })
    },
    formatDate (dateString) {
      return new Date(dateString).toLocaleDateString()
    }
  }
}
</script>

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  object-fit: cover;
}

.admin-dashboard-container {
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 15px;
}

h1, h2 {
  text-align: center;
  margin-bottom: 20px;
}

.reservations-table, .messages-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th, td {
  border: 1px solid #555;
  padding: 10px;
  text-align: center;
}

th {
  background: #007bff;
  color: white;
}

tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.1);
}

tr:hover {
  background: rgba(255, 255, 255, 0.2);
}

.action-button {
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.action-button.cancel { background: #ff4d4d; color: white; }
.action-button.reply { background: #4caf50; color: white; }
.action-button.delete { background: #f44336; color: white; }
.action-button.send { background: #007bff; color: white; }
.action-button.close { background: #aaa; color: white; }

.modal-overlay {
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex; justify-content: center; align-items: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
}

textarea {
  width: 100%; height: 100px; margin-bottom: 10px; padding: 10px;
}
</style>
