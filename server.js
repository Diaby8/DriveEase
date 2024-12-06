const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const bcrypt = require('bcrypt') // Pour sécuriser les mots de passe
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à MySQL:', err)
    return
  }
  console.log('Connecté à la base de données MySQL')
})

// Route pour obtenir les voitures de type "luxury"
app.get('/api/cars/luxury', (req, res) => {
  const query = 'SELECT * FROM cars WHERE TYPE_CARS = "luxury"'

  db.query(query, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erreur lors de la récupération des voitures Luxury')
    } else {
      res.json(result)
    }
  })
})

// Route pour obtenir toutes les voitures qui ne sont PAS de type "luxury"
app.get('/api/cars/standard', (req, res) => {
  const query = 'SELECT * FROM cars WHERE TYPE_CARS != "luxury"'

  db.query(query, (err, result) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erreur lors de la récupération des voitures Standard')
    } else {
      res.json(result)
    }
  })
})

// Route pour l'authentification admin
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body

  const query = 'SELECT * FROM administrators WHERE EMAIL_ADMIN = ?'
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Erreur serveur')
    } else if (results.length === 0) {
      res.status(401).send('Administrateur introuvable')
    } else {
      const admin = results[0]
      const isPasswordValid = await bcrypt.compare(password, admin.PASSWORD_ADMIN)

      if (isPasswordValid) {
        res.json({
          success: true,
          message: 'Connexion réussie',
          admin: {
            email: admin.EMAIL_ADMIN,
            firstName: admin.FIRST_NAME_ADMIN,
            lastName: admin.LAST_NAME_ADMIN
          }
        })
      } else {
        res.status(401).send('Mot de passe incorrect')
      }
    }
  })
})

// Lancement du serveur
app.listen(5000, () => {
  console.log('Serveur lancé sur http://localhost:5000')
})
