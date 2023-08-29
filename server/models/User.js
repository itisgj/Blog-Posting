const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    username:{type:String, required:true, min:3, unique:true},
    password:{type:String, required:true}
})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.comparePassword = async function (userPassword){
    const match = await bcrypt.compare(userPassword, this.password)
    return match
}

const User = mongoose.model('User', UserSchema)

module.exports = User