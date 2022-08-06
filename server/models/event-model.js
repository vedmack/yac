const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Event = new Schema(
    {
        id:    { type: String, required: false },
        title: { type: String, required: true },
        start: { type: Date, required: true },
        end:   { type: Date, required: false },
        allDay: { type: Boolean, required: false },
    },
    { timestamps: true },
)

module.exports = mongoose.model('events', Event)