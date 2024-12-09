const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const db = require('./db')

// Route de connexion pour les administrateurs
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' })
  }

  const query = 'SELECT * FROM administrators WHERE EMAIL_ADMIN = ?'
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur' })
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Email non trouvé' })
    }

    const admin = results[0]
    const passwordMatch = await bcrypt.compare(password, admin.PASSWORD_ADMIN)

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Mot de passe incorrect' })
    }

    res.json({ success: true, message: 'Connexion réussie', admin })
  })
})

// Route d'inscription pour les clients
router.post('/register', async (req, res) => {
  const { email, firstName, lastName, phone, password, address } = req.body

  if (!email || !firstName || !lastName || !phone || !password || !address) {
    return res.status(400).json({ success: false, message: 'Tous les champs sont requis' })
  }

  const checkQuery = 'SELECT * FROM clients WHERE EMAIL_CLIENT = ?'
  db.query(checkQuery, [email], async (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur' })
    }

    if (results.length > 0) {
      return res.status(400).json({ success: false, message: "L'email est déjà utilisé" })
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10)
      const insertQuery = `
        INSERT INTO clients (EMAIL_CLIENT, FIRST_NAME_CLIENT, LAST_NAME_CLIENT, PHONE_CLIENT, PASSWORD_CLIENT, ADDRESS_CLIENT)
        VALUES (?, ?, ?, ?, ?, ?)
      `
      db.query(insertQuery, [email, firstName, lastName, phone, hashedPassword, address], (err) => {
        if (err) {
          console.error("Erreur lors de l'ajout du client :", err)
          return res.status(500).json({ success: false, message: 'Erreur serveur' })
        }

        res.status(201).json({ success: true, message: 'Client inscrit avec succès' })
      })
    } catch (hashErr) {
      console.error('Erreur lors du hashing du mot de passe :', hashErr)
      res.status(500).json({ success: false, message: 'Erreur interne' })
    }
  })
})

// Route de connexion pour les clients
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
      return res.status(404).json({ success: false, message: 'Email non trouvé' })
    }

    const client = results[0]
    const passwordMatch = await bcrypt.compare(password, client.PASSWORD_CLIENT)

    if (!passwordMatch) {
      console.error('Mot de passe utilisateur :', password)
      console.error('Mot de passe stocké :', client.PASSWORD_CLIENT)
      return res.status(401).json({ success: false, message: 'Mot de passe incorrect' })
    }

    res.json({ success: true, message: 'Connexion réussie', client })
  })
})

module.exports = router
