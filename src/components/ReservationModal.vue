<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h2>Reservation Form</h2>
      <form @submit.prevent="submitReservation" class="form-container">
        <div class="column">
          <div>
            <label for="carImmatriculation">Car</label>
            <input type="text" id="carImmatriculation" v-model="formData.carImmatriculation" readonly />
          </div>
          <div>
            <label for="pickupDate">Pickup Date</label>
            <input type="date" id="pickupDate" v-model="formData.pickupDate" required @change="checkAvailability" />
          </div>
          <div>
            <label for="returnDate">Return Date</label>
            <input type="date" id="returnDate" v-model="formData.returnDate" required @change="checkAvailability" />
          </div>
          <div>
            <label for="pickupAgencyId">Pickup Location</label>
            <select id="pickupAgencyId" v-model="formData.pickupAgencyId" required>
              <option disabled value="">Select a location</option>
              <option value="1">Paris</option>
              <option value="2">Lyon</option>
              <option value="3">Marseille</option>
            </select>
          </div>
          <div>
            <label for="returnAgencyId">Return Location</label>
            <select id="returnAgencyId" v-model="formData.returnAgencyId" required>
              <option disabled value="">Select a location</option>
              <option value="1">Paris</option>
              <option value="2">Lyon</option>
              <option value="3">Marseille</option>
            </select>
          </div>
        </div>
        <div class="column">
          <div>
            <label for="cardNumber">Card Number</label>
            <input type="text" id="cardNumber" v-model="formData.paymentDetails.cardNumber" required />
          </div>
          <div>
            <label for="expiryDate">Expiry Date</label>
            <input type="month" id="expiryDate" v-model="formData.paymentDetails.expiryDate" required />
          </div>
          <div>
            <label for="cvv">CVV</label>
            <input type="text" id="cvv" v-model="formData.paymentDetails.cvv" required />
          </div>
        </div>
      </form>
      <div class="buttons">
        <button @click="submitReservation" type="button">Confirm Reservation</button>
        <button type="button" @click="closeModal">Cancel</button>
      </div>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    isVisible: Boolean,
    carDetails: Object
  },
  data () {
    return {
      formData: {
        clientEmail: localStorage.getItem('userEmail'),
        carImmatriculation: '',
        pickupDate: '',
        returnDate: '',
        pickupAgencyId: '',
        returnAgencyId: '',
        paymentDetails: {
          cardNumber: '',
          expiryDate: '',
          cvv: ''
        }
      },
      message: ''
    }
  },
  watch: {
    carDetails: {
      immediate: true,
      handler (newDetails) {
        if (newDetails) {
          this.formData.carImmatriculation = newDetails.IMMATRICULATION || ''
        }
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
    },
    checkAvailability () {
      if (!this.formData.carImmatriculation || !this.formData.pickupDate || !this.formData.returnDate) {
        this.message = 'Veuillez sélectionner une voiture et des dates.'
        return
      }

      axios
        .post('http://localhost:5000/contracts/check-availability', {
          carImmatriculation: this.formData.carImmatriculation,
          pickupDate: this.formData.pickupDate,
          returnDate: this.formData.returnDate
        })
        .then((response) => {
          this.message = response.data.message
        })
        .catch((error) => {
          console.error('Erreur lors de la vérification de disponibilité :', error)
          this.message = 'Erreur lors de la vérification de la disponibilité.'
        })
    },
    submitReservation () {
      this.$emit('submit', this.formData)
    }
  }
}
</script>

<style scoped>
/* Arrière-plan du modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* Conteneur du modal */
.modal {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  width: 800px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Oswald', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Titre du modal */
.modal h2 {
  font-size: 24px;
  color: #333;
  text-transform: uppercase;
  text-align: center;
}

/* Conteneur du formulaire */
.form-container {
  display: flex;
  gap: 20px;
}

/* Colonne gauche et droite */
.column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Champs du formulaire */
.modal label {
  font-size: 14px;
  color: #555;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.modal input,
.modal select {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* Boutons */
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.modal button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
}

.modal button[type='button'] {
  background-color: #f5f5f5;
  color: #333;
}

.modal button[type='button']:hover {
  background-color: #e2e2e2;
}

/* Message */
.modal p {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal {
    width: 90%;
    padding: 20px;
  }
  .form-container {
    flex-direction: column;
  }
}
</style>
