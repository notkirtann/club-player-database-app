import mongoose from "mongoose"
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique : true,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Write valid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error('You don\'t satisfy password criteria')
            }
        }
    },
    league: {
        type: String,
        required: true,
        trim: true
    },
    tokens : [{
        token : {
            type : String,
            require : true
        }
    }]
})

clubSchema.statics.findByCredentials = async (email,password) => {
    const club = await Club.findOne({email})

    if(!club){
        throw new Error('unable to login')
    }
     const isMatch = await bcrypt.compare(password,club.password)
    
    if(!isMatch){
        throw new Error('Unable to login')
    }
     return club;
}

clubSchema.methods.genAuthToken = async function(){
    const club = this
    const jwtToken = jwt.sign(
        {_id: club._id.toString(), email: club.email}, 
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || '7d'}
    ) 
    club.tokens = club.tokens.concat({token: jwtToken})
    await club.save()
    return jwtToken
}

//plain text to hash
clubSchema.pre('save',async function(next){
    const club = this
    if(club.isModified('password')){
        club.password = await bcrypt.hash(club.password,8)
    }    
    next()
})

const Club = mongoose.model('Clubs',clubSchema)

export default Club;