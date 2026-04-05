const userModel=require('../models/userModel');

const ShowUsersPage=async(req,res)=>{
    const users=await userModel.getAllUsers();
    res.render('users',{
        title:"users page",
        users:users
    })

}
//just show user
const editUser=async(req,res)=>{
 const id=req.params.id
 const user=await userModel.getUserById(id);

 res.render('userEdit',{
    title:"user Page",
    user:user
})
};
//save edit user
const updateUser =async(req,res)=>{
    const id=req.params.id;
    const {username,email,age}=req.body;
    console.log(req.body)
    await userModel.updateUser(id,username,email,age);
    res.redirect('/users')
}

const deleteUser=async(req,res)=>{
    const id = req.params.id;
    await userModel.DeleteUser(id);
    res.redirect('/users')
}

const ShowAddUserPage=(req,res)=>{
    res.render('addUser')
}
const addUser=async(req,res)=>{
    const {username,email,age,password}=req.body;
    await userModel.creatUser(username,email,age,password);
    res.redirect('/users')
    
}

module.exports={
    ShowUsersPage,
    editUser,
    deleteUser,
    updateUser,
    ShowAddUserPage,
    addUser
}

// BROWSER->ROUTE ->CONTROLLER-->VIEW
// BROWSER->ROUTE ->CONTROLLER-->JSON
// {
//
//}