const express = require('express')
const router = express.Router()
const db = require('./db') // Connexion à la base de données

// Route d'authentification admin
router.post('/login', (req, res) => {
  const { email, password } = req.body

  console.log('Requête reçue :', req.body)

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email et mot de passe requis' })
  }

  const query = 'SELECT * FROM administrators WHERE EMAIL_ADMIN = ?'
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur SQL :', err)
      return res.status(500).json({ success: false, message: 'Erreur serveur' })
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Email non trouvé' })
    }

    const admin = results[0]
    if (admin.PASSWORD_ADMIN !== password) {
      return res.status(401).json({ success: false, message: 'Mot de passe incorrect' })
    }

    res.json({ success: true, message: 'Connexion réussie' })
  })
})

module.exports = router
