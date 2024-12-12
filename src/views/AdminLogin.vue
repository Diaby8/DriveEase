<template>
  <section class="hero-section">
    <!-- Vidéo de fond -->
    <div class="background-video">
      <video autoplay muted loop playsinline>
        <source src="@/assets/video2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Contenu principal avec animation -->
    <transition name="fade-slide">
      <div class="hero-content" v-if="isVisible">
        <div class="form-container">
          <h2>Admin Login</h2>
          <form @submit.prevent="login">
            <label for="email">Email:</label>
            <input
              type="email"
              id="email"
              v-model="email"
              placeholder="Enter your email"
              required
            />

            <label for="password">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              placeholder="Enter your password"
              required
            />

            <button type="submit" class="custom-button permanent">Login</button>
          </form>
          <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
      </div>
    </transition>
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
      isVisible: false // Contrôle l'affichage progressif
    }
  },
  mounted () {
    // Affiche le contenu après un délai
    setTimeout(() => {
      this.isVisible = true
    }, 500) // Délai de 500ms
  },
  methods: {
    async login () {
      console.log('Données envoyées :', { email: this.email, password: this.password }) // Log avant envoi
      try {
        const response = await axios.post('http://localhost:5000/api/authAdmin/login', {
          email: this.email,
          password: this.password
        })

        console.log('Réponse API :', response.data) // Log de la réponse API

        if (response.data.success) {
          console.log('Connexion réussie, redirection en cours...')
          this.$router.push('/admin-dashboard') // Redirection après succès
        } else {
          this.errorMessage = response.data.message || 'Invalid email or password'
        }
      } catch (error) {
        console.error("Erreur lors de l'appel API :", error) // Log des erreurs
        this.errorMessage = 'An error occurred during login'
      }
    }
  }
}
</script>

<style scoped>
/* Section principale */
.hero-section {
  position: relative;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
}

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

/* Contenu principal */
.hero-content {
  z-index: 1;
  margin: 0; /* Supprime tout espace inutile */
  padding: 0; /* Supprime les padding inutiles */
}

/* Formulaire */
.form-container {
  background-color: rgba(0, 0, 0, 0.7); /* Fond semi-transparent */
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input,
button {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  background-color: #fff;
  color: #333;
}

button {
  background-color: transparent;
  color: white;
  cursor: pointer;
  border: 1px solid white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

button:hover {
  background-color: white;
  color: black;
}

/* Message d'erreur */
.error {
  color: #ff4d4d;
  font-size: 0.9rem;
}

/* Animation fade-slide */
.fade-slide-enter-active {
  transition: all 1s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}
</style>
