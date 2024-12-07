const express = require('express')
const router = express.Router()
const db = require('./db')

// Route pour la recherche avancée
router.post('/advanced', (req, res) => {
  const { location, startDate, endDate, category } = req.body

  // Validation des champs
  if (!location || !startDate || !endDate || !category) {
    return res.status(400).json({
      success: false,
      message: 'Tous les champs sont obligatoires : location, startDate, endDate, category.'
    })
  }

  // Requête SQL pour récupérer les voitures disponibles
  const query = `
    SELECT cars.*
    FROM cars
    WHERE CURRENT_LOCATION = (
      SELECT ID_AGENCY FROM agencies WHERE CITY_AGENCY = ?
    )
    AND TYPE_CARS = ?
    AND IMMATRICULATION NOT IN (
      SELECT CAR_IMMATRICULATION
      FROM contracts
      WHERE (PICKUP_DATE <= ? AND RETURN_DATE >= ?)
    )
  `

  db.query(query, [location, category, endDate, startDate], (err, results) => {
    if (err) {
      console.error('Erreur lors de la recherche avancée :', err)
      return res.status(500).send('Erreur lors de la recherche avancée.')
    }
    res.json({
      success: true,
      cars: results
    })
  })
})

module.exports = router
