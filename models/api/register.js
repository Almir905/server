import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { validationResult} from 'express-validator'
import { registerValidator } from './validations/auth.js'

import UserModel from './models/User.js'

mongoose.connect('mongodb+srv://arsenkerezbekov7:ZpoftNz9jpGHT7IW@cluster0.a8thr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("DB OK Arsen");
    
})
const app = express();

app.use(express.json()); 


app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))



app.post('/register', registerValidator, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array())
    }
    const doc = new UserModel({
        email: req.body.email,
        fullname: req.body.fullname,
        password: req.body.password,

    })
    const user = doc.save();

    res.json(user)
})
app.get ('/', (req, res) => {
    res.send('Arsen Kerezbelov')
})
app.listen(3000, '0.0.0.0', (err) => {
    if(err) {
        return console.log(err);
        
    }
    console.log('Server OK');
    
});