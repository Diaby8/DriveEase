const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
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


const PORT = process.env.PORT || 5001; // Utilise le port 5001 si 5000 est occupé
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});