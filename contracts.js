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
    returnAgencyId,
    paymentDetails
  } = req.body

  // Vérification des champs requis
  if (
    !clientEmail ||
    !carImmatriculation ||
    !pickupDate ||
    !returnDate ||
    !pickupAgencyId ||
    !returnAgencyId ||
    !paymentDetails ||
    !paymentDetails.cardNumber ||
    !paymentDetails.expiryDate ||
    !paymentDetails.cvv
  ) {
    console.error('Données manquantes :', req.body)
    return res.status(400).send('Tous les champs sont requis.')
  }

  // Vérification de la disponibilité de la voiture
  const checkAvailabilityQuery = `
    SELECT * FROM contracts
    WHERE CAR_IMMATRICULATION = ?
    AND (
      (PICKUP_DATE <= ? AND RETURN_DATE >= ?) OR
      (PICKUP_DATE <= ? AND RETURN_DATE >= ?) OR
      (PICKUP_DATE >= ? AND RETURN_DATE <= ?)
    )
  `

  db.query(
    checkAvailabilityQuery,
    [
      carImmatriculation,
      pickupDate, pickupDate,
      returnDate, returnDate,
      pickupDate, returnDate
    ],
    (err, results) => {
      if (err) {
        console.error('Erreur lors de la vérification des disponibilités:', err)
        return res.status(500).send('Erreur interne lors de la vérification des disponibilités.')
      }

      if (results.length > 0) {
        return res.status(400).send('La voiture est déjà réservée pour les dates sélectionnées.')
      }

      // Calcul du prix total
      const totalPriceQuery = `
        SELECT PRICE_DAY, DATEDIFF(?, ?) AS days
        FROM cars
        WHERE IMMATRICULATION = ?
      `

      db.query(totalPriceQuery, [returnDate, pickupDate, carImmatriculation], (err, results) => {
        if (err) {
          console.error('Erreur lors du calcul du prix total:', err)
          return res.status(500).send('Erreur interne lors du calcul du prix.')
        }

        if (results.length === 0) {
          return res.status(404).send('Voiture introuvable.')
        }

        const pricePerDay = results[0].PRICE_DAY
        const days = results[0].days

        if (days <= 0) {
          return res.status(400).send('Les dates de réservation sont invalides.')
        }

        const totalPrice = pricePerDay * days

        // Création du contrat
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
              return res.status(500).send('Erreur interne lors de la création du contrat.')
            }

            console.log('Réservation réussie pour:', clientEmail)
            res.status(201).send('Réservation créée avec succès.')
          }
        )
      })
    }
  )
})

// Route pour récupérer toutes les réservations
router.get('/all', (req, res) => {
  const query = `
    SELECT 
      contracts.ID_CONTRACT,
      contracts.PICKUP_DATE,
      contracts.RETURN_DATE,
      contracts.TOTAL_PRICE,
      cars.BRAND AS carBrand,
      cars.MODEL AS carModel,
      cars.IMMATRICULATION AS carPlate,
      pickupAgency.CITY_AGENCY AS pickupLocation,
      returnAgency.CITY_AGENCY AS returnLocation,
      clients.FIRST_NAME_CLIENT AS clientFirstName,
      clients.LAST_NAME_CLIENT AS clientLastName,
      clients.EMAIL_CLIENT AS clientEmail,
      clients.PHONE_CLIENT AS clientPhone
    FROM contracts
    JOIN cars ON contracts.CAR_IMMATRICULATION = cars.IMMATRICULATION
    JOIN clients ON contracts.CLIENT_EMAIL = clients.EMAIL_CLIENT
    JOIN agencies AS pickupAgency ON contracts.PICKUP_AGENCY_ID = pickupAgency.ID_AGENCY
    JOIN agencies AS returnAgency ON contracts.RETURN_AGENCY_ID = returnAgency.ID_AGENCY
  `

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur.' })
    }

    res.json({ success: true, reservations: results })
  })
})

// Route pour récupérer les réservations d'un utilisateur
router.post('/user', (req, res) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).json({ success: false, message: 'Email est requis.' })
  }

  const query = `
    SELECT contracts.*, cars.MODEL AS carModel, cars.BRAND AS carBrand
    FROM contracts
    JOIN cars ON contracts.CAR_IMMATRICULATION = cars.IMMATRICULATION
    WHERE contracts.CLIENT_EMAIL = ?
  `

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des réservations :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur.' })
    }

    res.json({ success: true, reservations: results })
  })
})
// Route pour annuler une réservation
router.delete('/:id', (req, res) => {
  const { id } = req.params
  const deleteQuery = `
    DELETE FROM contracts WHERE ID_CONTRACT = ?
  `

  db.query(deleteQuery, [id], (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'annulation de la réservation :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur lors de l\'annulation.' })
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Réservation non trouvée.' })
    }

    res.json({ success: true, message: 'Réservation annulée avec succès.' })
  })
})
module.exports = router
