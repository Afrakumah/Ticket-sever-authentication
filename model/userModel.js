import { Schema, model } from "mongoose";
import crypto from 'crypto';



const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minLength: [5, "please the password should atleast have five characters"]
    },
    tickets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'ticket'
        }
    ],
    passwordResetToken: String,
    passwordResetTokenExpiry: Date,

}, { timestamps: true });


UserSchema.methods.generatePasswordToken = function() {
    
   const userToken = crypto.randomBytes(32).toString('hex')

   this.passwordResetToken = crypto.createHash('sha256').update(userToken).digest('hex')

   this.passwordResetTokenExpiry = Date.now() + 10 * 60 * 1000;

   console.log({userToken, resetToken: this.passwordResetToken});

   return userToken;

}

const User = model('user', UserSchema);


export default User;