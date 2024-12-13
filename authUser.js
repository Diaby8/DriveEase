const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('./db')
const jwt = require('jsonwebtoken')

// Route d'inscription pour les utilisateurs
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, phone, password, address } = req.body

  if (!email || !firstName || !lastName || !phone || !password || !address) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis' })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const insertQuery = `
      INSERT INTO clients (EMAIL_CLIENT, FIRST_NAME_CLIENT, LAST_NAME_CLIENT, PHONE_CLIENT, PASSWORD_CLIENT, ADDRESS_CLIENT)
      VALUES (?, ?, ?, ?, ?, ?)
    `
    db.query(insertQuery, [email, firstName, lastName, phone, hashedPassword, address], (err) => {
      if (err) {
        console.error("Erreur lors de l'ajout de l'utilisateur :", err)
        return res.status(500).json({ success: false, message: 'Erreur serveur' })
      }
      res.status(201).json({ success: true, message: 'Utilisateur inscrit avec succès' })
    })
  } catch (error) {
    console.error('Erreur :', error)
    res.status(500).json({ success: false, message: 'Erreur interne' })
  }
})

// Route de connexion pour les utilisateurs
router.post('/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' })
  }

  const query = 'SELECT * FROM clients WHERE EMAIL_CLIENT = ?'
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur' })
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
    }

    const user = results[0]
    const passwordMatch = await bcrypt.compare(password, user.PASSWORD_CLIENT)

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Mot de passe incorrect' })
    }

    res.json({ success: true, message: 'Connexion réussie', user })
  })
})

// Route pour récupérer les informations de l'utilisateur connecté
router.get('/me', (req, res) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ success: false, message: 'Accès non autorisé' })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Token invalide' })
    }

    const query = 'SELECT * FROM clients WHERE EMAIL_CLIENT = ?'
    db.query(query, [user.email], (err, results) => {
      if (err) {
        console.error('Erreur lors de la récupération des informations utilisateur :', err)
        return res.status(500).json({ success: false, message: 'Erreur serveur' })
      }

      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Utilisateur non trouvé' })
      }

      res.json({ success: true, user: results[0] })
    })
  })
})

module.exports = router
