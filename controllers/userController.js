const User = require("./../models/userModel")
const Invoice = require("./../models/invoiceModel")

const checkUser = async (id)=>{
    const user = await User.getUser(id);
        if(user[0].length == 0){
            return null
        }
        return user
}

exports.getAll = async (req,res)=>{
    try {
        const users = await User.getAll();
        return res.status(200).json({
            status:"succeed",
            data: users[0]
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.getUser = async (req,res)=>{
    try {
        const user = await checkUser(req.params.id)
        if (!user){
            return res.status(400).json({
                status:"failed",
                message: "no user found with this id"
            })
        }
        return res.status(200).json({
            status:"succeed",
            data: user[0]
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.updateUser = async (req,res)=>{
    try {
        const user = await checkUser(req.params.id)
        if(!user)
        {
            return res.status(400).json({
                status:"failed",
                message: "no user found with this id"
            })
        }

        await User.updateUser(req.params.id,req.body)
        return res.status(200).json({
            status:"succeed",
            message: "updated successfully"
        })
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.createUser = async (req,res)=>{
    try {
            const newUser = await User.createUser(req.body)
            console.log(newUser[0].insertId)
            return res.status(201).json({
                status:"succeed",
                message: "created successfully"
            })
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
     
}

exports.deleteUser = async (req,res)=>{
    try {
        const user = await checkUser(req.params.id);
        if(!user)
        {
            return res.status(400).json({
                status:"failed",
                message: "no user found with this id"
            })
            
        }
        await User.deleteUser(req.params.id)
        return res.status(200).json({
            status:"succeed",
            message: "deleted successfully"
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })   
    }
}

exports.getUserInvoices = async(req,res)=>{
    try {
        const invoices = await Invoice.getUserInvoices(req.params.id);
        return res.status(200).json({
            status:"succeed",
            data: invoices[0]
        })
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })   
    }
}