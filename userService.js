const express = require('express')
const router = express.Router()
const db = require('./db') // Connexion à la base de données

// Mettre à jour les informations utilisateur
router.put('/update', (req, res) => {
  const { EMAIL_CLIENT, PHONE_CLIENT, ADDRESS_CLIENT } = req.body

  if (!EMAIL_CLIENT || !PHONE_CLIENT || !ADDRESS_CLIENT) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' })
  }

  const query = `
    UPDATE clients
    SET PHONE_CLIENT = ?, ADDRESS_CLIENT = ?
    WHERE EMAIL_CLIENT = ?
  `

  db.query(query, [PHONE_CLIENT, ADDRESS_CLIENT, EMAIL_CLIENT], (err, result) => {
    if (err) {
      console.error('Erreur lors de la mise à jour des informations utilisateur :', err)
      return res.status(500).json({ message: 'Erreur serveur.' })
    }
    res.json({ success: true, message: 'Informations mises à jour avec succès.' })
  })
})

// Envoyer un message
router.post('/messages/send', (req, res) => {
  const { sender, recipient, content } = req.body

  if (!sender || !recipient || !content) {
    return res.status(400).json({ message: 'Tous les champs sont requis.' })
  }

  const query = `
      INSERT INTO messages (sender, recipient, content, sent_at)
      VALUES (?, ?, ?, NOW())
    `

  db.query(query, [sender, recipient, content], (err) => {
    if (err) {
      console.error('Erreur lors de l\'envoi du message :', err)
      return res.status(500).json({ message: 'Erreur serveur.' })
    }
    res.json({ success: true, message: 'Message envoyé avec succès.' })
  })
})

// Récupérer les messages reçus par un utilisateur
router.get('/messages', (req, res) => {
  const { email } = req.query

  if (!email) {
    return res.status(400).json({ message: 'L\'email est requis.' })
  }

  const query = `
    SELECT sender, content, sent_at
    FROM messages
    WHERE recipient = ?
    ORDER BY sent_at DESC
  `

  db.query(query, [email], (err, results) => {
    if (err) {
      console.error('Erreur lors de la récupération des messages :', err)
      return res.status(500).json({ message: 'Erreur serveur.' })
    }
    res.json(results)
  })
})

// Supprimer un message
router.delete('/messages/delete/:id', (req, res) => {
  const { id } = req.params

  const query = `
      DELETE FROM messages
      WHERE id = ?
    `

  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erreur lors de la suppression du message :', err)
      return res.status(500).json({ message: 'Erreur serveur.' })
    }
    res.json({ success: true, message: 'Message supprimé avec succès.' })
  })
})

module.exports = router
