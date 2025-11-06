import mongoose from "mongoose"

const playerSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
    },
    position: {
        type: String,
        required: true,
        trim: true,
        enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward']
    },
    jerseyNumber: {
        type: Number,
        required: true,
        min: 1,
        max: 99
    },
    age: {
        type: Number,
        required: true,
        min: 16,
        max: 45
    },
    clubId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Clubs'
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

const Player = mongoose.model('Players',playerSchema)

export default Player;