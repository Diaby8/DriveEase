const express = require('express')
const router = express.Router()
const db = require('./db')

// Endpoint pour créer un nouveau contrat
router.post('/', (req, res) => {
  const {
    clientEmail,
    carImmatriculation,
    pickupDate,
    returnDate,
    pickupAgencyId,
    returnAgencyId
  } = req.body

  const totalPriceQuery = `
    SELECT PRICE_DAY, DATEDIFF(?, ?) AS days
    FROM cars
    WHERE IMMATRICULATION = ?
  `

  db.query(totalPriceQuery, [returnDate, pickupDate, carImmatriculation], (err, results) => {
    if (err) {
      console.error('Erreur lors du calcul du prix total:', err)
      return res.status(500).send('Erreur interne lors du calcul du prix')
    }

    if (results.length === 0) {
      return res.status(404).send('Voiture introuvable')
    }

    const pricePerDay = results[0].PRICE_DAY
    const days = results[0].days

    if (days <= 0) {
      return res.status(400).send('Les dates de réservation sont invalides')
    }

    const totalPrice = pricePerDay * days

    const insertQuery = `
      INSERT INTO contracts (
        CLIENT_EMAIL,
        CAR_IMMATRICULATION,
        PICKUP_AGENCY_ID,
        RETURN_AGENCY_ID,
        PICKUP_DATE,
        RETURN_DATE,
        TOTAL_PRICE
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `

    db.query(
      insertQuery,
      [
        clientEmail,
        carImmatriculation,
        pickupAgencyId,
        returnAgencyId,
        pickupDate,
        returnDate,
        totalPrice
      ],
      (err) => {
        if (err) {
          console.error('Erreur lors de la création du contrat:', err)
          return res.status(500).send('Erreur interne lors de la création du contrat')
        }

        res.status(201).send('Réservation créée avec succès')
      }
    )
  })
})

module.exports = router
