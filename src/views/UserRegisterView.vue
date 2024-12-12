<template>
    <div class="auth-container">
      <div class="auth-header">
        <h1>Register</h1>
        <p>Create a new account to start your journey!</p>
      </div>
      <form class="auth-form" @submit.prevent="handleRegister">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="text" v-model="firstName" placeholder="First Name" required />
        <input type="text" v-model="lastName" placeholder="Last Name" required />
        <input type="text" v-model="phone" placeholder="Phone" required />
        <input type="text" v-model="address" placeholder="Address" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button class="auth-button" type="submit">Register</button>
      </form>
      <p class="auth-footer">
        Already have an account? <router-link to="/login">Login here</router-link>
      </p>
    </div>
  </template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      password: ''
    }
  },
  methods: {
    handleRegister () {
      axios
        .post('http://localhost:5000/authUser/register', {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          phone: this.phone,
          address: this.address,
          password: this.password
        })
        .then(() => {
          alert('Registration successful! Please login.')
          this.$router.push('/login')
        })
        .catch((error) => {
          const errorMessage =
              error.response?.data?.message || 'Registration failed. Please try again.'
          alert(errorMessage)
          console.error(error)
        })
    }
  }
}
</script>

  <style scoped>
  .auth-container {
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 40px;
    border-radius: 10px;
    max-width: 400px;
    margin: 100px auto;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    text-align: center;
  }

  .auth-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-family: 'Oswald', sans-serif;
    text-transform: uppercase;
  }

  .auth-header p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .auth-form input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  }

  .auth-button {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    text-transform: uppercase;
    font-family: 'Oswald', sans-serif;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .auth-button:hover {
    background: #0056b3;
  }

  .auth-footer {
    margin-top: 15px;
    font-size: 0.9rem;
  }

  .auth-footer a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }

  .auth-footer a:hover {
    text-decoration: underline;
  }
  </style>
