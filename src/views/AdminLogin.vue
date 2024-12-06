<template>
  <section class="admin-login">
    <!-- Vidéo d'arrière-plan -->
    <video autoplay loop muted playsinline class="background-video">
      <source src="@/assets/video2.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <!-- Conteneur du formulaire -->
    <div class="login-container">
      <h1>Admin Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        <p v-if="successMessage" class="success">{{ successMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLogin',
  data () {
    return {
      email: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    async login () {
      try {
        const response = await axios.post('http://localhost:5000/api/admin/login', {
          email: this.email,
          password: this.password
        })

        // Si la connexion est réussie
        if (response.data.success) {
          // Utilisation de $router pour redirection
          this.$router.push('/admin-dashboard')
          // Stocker les informations de l'admin connecté
          localStorage.setItem('admin', JSON.stringify(response.data.admin))
          this.successMessage = response.data.message
          this.errorMessage = ''
          console.log('Connexion réussie, redirection en cours...')
          setTimeout(() => {
            this.$router.push('/admin-dashboard')
          }, 1000)
        } else {
          this.errorMessage = response.data.message || 'Login failed.'
          this.successMessage = ''
        }
      } catch (error) {
        this.errorMessage = 'Login failed. Please check your credentials.'
        this.successMessage = ''
        console.error('Erreur lors de la tentative de connexion:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Vidéo d'arrière-plan */
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
}

/* Section de connexion */
.admin-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: #fff;
  font-family: 'Oswald', sans-serif;
  text-align: center;
}

/* Conteneur du formulaire */
.login-container {
  background: rgba(0, 0, 0, 0.8);
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  width: 400px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

/* Formulaire */
.form-group {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-bottom: 10px;
}

input:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
}

button {
  background-color: #333;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #555;
}

.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>
