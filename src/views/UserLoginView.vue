<template>
  <div class="login-page">
    <!-- Vidéo de fond -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Formulaire de connexion -->
    <div class="auth-container">
      <div class="auth-header">
        <h1>Login</h1>
        <p>Welcome back! Please log in to continue.</p>
      </div>
      <form class="auth-form" @submit.prevent="handleLogin">
        <input type="email" v-model="email" placeholder="Email" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button class="auth-button" type="submit">Login</button>
      </form>
      <p class="auth-footer">
        Don't have an account? <router-link to="/register">Register here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      axios
        .post('http://localhost:5000/authUser/login', {
          email: this.email,
          password: this.password
        })
        .then((response) => {
          if (response.data.success) {
            localStorage.setItem('userToken', response.data.token) // Stocke le token
            localStorage.setItem('userEmail', this.email) // Stocke l'email
            this.$router.push('/') // Redirige vers l'accueil
          } else {
            alert(response.data.message)
          }
        })
        .catch((error) => {
          const errorMessage =
            error.response?.data?.message || 'Login failed. Please check your credentials.'
          alert(errorMessage)
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>
/* Vidéo de fond */
.background-video video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Conteneur de la page */
.login-page {
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Auth Container */
.auth-container {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 40px;
  border-radius: 10px;
  max-width: 400px;
  margin: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  text-align: center;
}

/* En-tête */
.auth-header h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
  font-family: 'Oswald', sans-serif;
  text-transform: uppercase;
}

.auth-header p {
  font-size: 1rem;
  margin-bottom: 20px;
}

/* Champs de formulaire */
.auth-form input {
  width: 100%;
  padding: 15px;
  margin: 10px 0;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Oswald', sans-serif;
}

/* Bouton de connexion */
.auth-button {
  width: 100%;
  padding: 12px;
  font-size: 1.1rem;
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

/* Pied de page */
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
