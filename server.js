const express = require('express')
const cors = require('cors')
const db = require('./db') // Connexion à la base de données
const authAdminRoutes = require('./authAdmin') // Routes d'authentification admin
const authUserRoutes = require('./authUser') // Routes d'authentification utilisateur
const contractRoutes = require('./contracts') // Importer les routes des contrats
const userServiceRoutes = require('./userService') // Importer le fichier userService.js

const app = express()
app.use(cors())
app.use(express.json())

// Routes d'authentification
app.use('/api/authAdmin', authAdminRoutes)
app.use('/authUser', authUserRoutes)
app.use('/contracts', contractRoutes) // Ajouter les routes des contrats
app.use('/api/users', userServiceRoutes) // Utiliser les routes utilisateurs

// Test de la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err)
    return
  }
  console.log('Connecté à la base de données MySQL')
})

// Routes pour les voitures
app.get('/api/cars/luxury', (req, res) => {
  const query = 'SELECT * FROM cars WHERE TYPE_CARS = "luxury"'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des voitures Luxury:', err)
      res.status(500).send('Erreur lors de la récupération des voitures Luxury')
    } else {
      res.json(result)
    }
  })
})

app.get('/api/cars/standard', (req, res) => {
  const query = 'SELECT * FROM cars WHERE TYPE_CARS != "luxury"'
  db.query(query, (err, result) => {
    if (err) {
      console.error('Erreur lors de la récupération des voitures Standard:', err)
      res.status(500).send('Erreur lors de la récupération des voitures Standard')
    } else {
      res.json(result)
    }
  })
})

// Port et lancement du serveur
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
})
