<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal">
      <h2>Reservation Form</h2>
      <form @submit.prevent="submitReservation">
        <div>
          <label for="clientEmail">Email</label>
          <input type="email" id="clientEmail" v-model="formData.clientEmail" required />
        </div>
        <div>
          <label for="carImmatriculation">Car</label>
          <input type="text" id="carImmatriculation" v-model="formData.carImmatriculation" readonly />
        </div>
        <div>
          <label for="pickupDate">Pickup Date</label>
          <input type="date" id="pickupDate" v-model="formData.pickupDate" required />
        </div>
        <div>
          <label for="returnDate">Return Date</label>
          <input type="date" id="returnDate" v-model="formData.returnDate" required />
        </div>
        <div>
          <label for="pickupAgencyId">Pickup Agency</label>
          <input type="number" id="pickupAgencyId" v-model="formData.pickupAgencyId" required />
        </div>
        <div>
          <label for="returnAgencyId">Return Agency</label>
          <input type="number" id="returnAgencyId" v-model="formData.returnAgencyId" required />
        </div>
        <button type="submit">Confirm Reservation</button>
        <button type="button" @click="closeModal">Cancel</button>
      </form>
      <p v-if="message">{{ message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: Boolean,
    carDetails: Object
  },
  data () {
    return {
      formData: {
        clientEmail: '',
        carImmatriculation: '',
        pickupDate: '',
        returnDate: '',
        pickupAgencyId: null,
        returnAgencyId: null
      },
      message: ''
    }
  },
  watch: {
    carDetails: {
      immediate: true,
      handler (newDetails) {
        if (newDetails) {
          console.log('Car details updated in modal:', newDetails)
          this.formData.carImmatriculation = newDetails.IMMATRICULATION || ''
        }
      }
    }
  },
  methods: {
    closeModal () {
      this.$emit('close')
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
  width: 400px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-family: 'Oswald', sans-serif;
}

/* Titre du modal */
.modal h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-transform: uppercase;
  letter-spacing: 2px;
}

/* Champs du formulaire */
.modal form div {
  margin-bottom: 15px;
  text-align: left;
}

.modal label {
  font-size: 14px;
  color: #555;
  display: block;
  margin-bottom: 5px;
  text-transform: uppercase;
}

.modal input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease;
}

.modal input:focus {
  border-color: #007bff;
}

/* Boutons */
.modal button {
  font-size: 14px;
  padding: 10px 20px;
  text-transform: uppercase;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 5px;
}

.modal button[type='submit'] {
  background-color: #007bff;
  color: white;
}

.modal button[type='submit']:hover {
  background-color: #0056b3;
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
  font-size: 14px;
  color: #007bff;
}

/* Responsive Design */
@media (max-width: 768px) {
  .modal {
    width: 90%;
    padding: 20px;
  }
}
</style>
