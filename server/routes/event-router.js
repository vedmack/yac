const express = require('express')

const EventCtrl = require('../controllers/event-ctrl')

const router = express.Router()

router.post('/event', EventCtrl.createEvent)
router.put('/event/:id', EventCtrl.updateEvent)
router.delete('/event/:id', EventCtrl.deleteEvent)
router.get('/events', EventCtrl.getEvents)

module.exports = router