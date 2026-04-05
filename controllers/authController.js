const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const authModel=require('../models/authModel')

const register=async(req,res)=>{
    const {email,password,role}=req.body;

    const hashedPassword=await bcrypt.hash(password,10)

    await authModel.createEmployee({
        email,
        password:hashedPassword,
        role
    })
    res.json({message:'Employee registered successfully!!!'})

}

const login=async(req,res)=>{
    const {email,password}=req.body;
    const employee=await authModel.getEmployeeByEmail(email);

    if(!employee){
        return res.status(401).json({message:'Invalid Email or password' });
    }
    const isMatch =await bcrypt.compare(password,employee.password)

    if(!isMatch){
        return res.status(401).json({message:'Invalid Email or password' });

    }
    const token =jwt.sign(
     {
        id:employee.id,
        email:employee.email,
        role:employee.role

     } ,
     process.env.JWT_SECRET,
     {expiresIn:'1h'}


    );
    res.cookie('token',token,{
        httpOnly:true
    });
    
    res.json({token})

}

module.exports={
    register,
    login
}