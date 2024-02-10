const Item = require("./../models/itemModel")

const checkItem = async (id)=>{
    const item = await Item.getItem(id);
        if(item[0].length == 0){
            return null
        }
        return item
}

exports.getAll = async (req,res)=>{
    try {
        const items = await Item.getAll();
        return res.status(200).json({
            status:"succeed",
            data: items[0]
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.getItem = async (req,res)=>{
    try {
        const item = await checkItem(req.params.id)
        if (!item){
            return res.status(400).json({
                status:"failed",
                message: "no item found with this id"
            })
        }
        return res.status(200).json({
            status:"succeed",
            data: item[0]
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.updateItem = async (req,res)=>{
    try {
        const item = await checkItem(req.params.id)
        if(!item)
        {
            return res.status(400).json({
                status:"failed",
                message: "no item found with this id"
            })
        }

        await Item.updateItem(req.params.id,req.body)
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

exports.createItem = async (req,res)=>{
    try {
            await Item.createItem(req.body)
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

exports.deleteItem = async (req,res)=>{
    try {
        const item = await checkItem(req.params.id);
        if(!item)
        {
            return res.status(400).json({
                status:"failed",
                message: "no item found with this id"
            })
            
        }
        await Item.deleteItem(req.params.id)
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