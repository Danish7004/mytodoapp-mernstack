import bcrypt from 'bcrypt';
import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';

const userCntrl = {
    register: async(req, res) =>{
        try {
            const {firstName, lastName, email, password} = req.body;
            const user = await User.findOne({email})
            if(user) return res.status(400).json({msg: "this email is already exist"});
            if(password.length < 6)
                return res.status(400).json({msg: "password atleat 6 charactor long"})

            //password encryption
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstName, lastName, email, password: passwordHash
            });
            await newUser.save()
            // res.json({msg: "register successfull"});

            //now create jwt for authentication
            const accesstoken = createAccessToken({id: newUser._id})
            const refreshtoken = createRefreshToken({id: newUser._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly:true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000
            })


            res.json({accesstoken});


        } catch (error) {
            return res.status(500).json({msg: error.message})
        }
    },
    login: async(req, res) =>{
        try {
          const {email, password} = req.body;
          const user = await User.findOne({email})
          if(!user) return res.status(400).json({msg: "user does not exist"})
          
          const isMatch = await bcrypt.compare(password, user.password)
          if(!isMatch) return res.status(400).json({msg: "wrong password"})

          //if login success, create access token and refresh token
          const accesstoken = createAccessToken({id: user._id})
          const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly:true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 //7d
            })


            res.json({accesstoken});

        } catch (err) {
            return res.status(500).json({msg: err.message})   
        }
    },
    logout: async(req, res)=>{
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})
            return res.json({msg: "logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})   
        }
    },


   refreshToken: (req, res) =>{
    

        const rf_token = req.cookies.refreshtoken;
        //  return  res.json({rf_token});
        if(!rf_token) return res.status(400).json({msg: "please login or register"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user)=>{
            if(err) return res.status(400).json({msg: "please login or register"})
            const accesstoken = createAccessToken({id: user.id})
            // res.json({user, accesstoken})
            res.json({accesstoken})
        })
           
    },
    getUser: async(req, res) =>{
        try {
            const user = await User.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg: "user not exist"})
             res.json(user)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

};

const createAccessToken = (user) =>{
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:'1d'})
}
const createRefreshToken = (user) =>{
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn:'7d'})
}



export default userCntrl;

