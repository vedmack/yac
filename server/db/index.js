const mongoose = require('mongoose')

mongoose
    .connect('mongodb://172.20.0.2:27017/yaCalendar', { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db