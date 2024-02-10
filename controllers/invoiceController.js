const Invoice = require("./../models/invoiceModel")

const checkInvoice = async (id)=>{
    const invoice = await Invoice.getInvoice(id);
        if(invoice[0].length == 0){
            return null
        }
        return invoice
}

exports.getAll = async (req,res)=>{
    try {
        const invoices = await Invoice.getAll();
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

exports.getInvoice = async (req,res)=>{
    try {
        const invoice = await checkInvoice(req.params.id)
        if (!invoice){
            return res.status(400).json({
                status:"failed",
                message: "no invoice found with this id"
            })
        }
        return res.status(200).json({
            status:"succeed",
            data: invoice[0]
        })
        
    } catch (err) {
        return res.status(404).json({
            status:"failed",
            err
        })
    }
}

exports.updateInvoiceStatus = async (req,res)=>{
    try {
        const invoice = await checkInvoice(req.params.id)
        if(!invoice)
        {
            return res.status(400).json({
                status:"failed",
                message: "no invoice found with this id"
            })
        }

        await Invoice.updateInvoiceStatus(req.params.id,req.body)
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

exports.createInvoice = async (req,res)=>{
    try {
            await Invoice.createInvoice(req.body)
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

exports.deleteInvoice = async (req,res)=>{
    try {
        const invoice = await checkInvoice(req.params.id);
        if(!invoice)
        {
            return res.status(400).json({
                status:"failed",
                message: "no invoice found with this id"
            })
            
        }
        await Invoice.deleteInvoice(req.params.id)
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