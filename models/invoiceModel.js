const db = require("./../config/db");
const { getItem } = require("./itemModel");

exports.getAll = async ()=>{
    const [invoices] = await db.query("select * from invoices")
    return invoices;
}

exports.getInvoice = async (id)=>{
    const invoice = await db.query(`select * from invoices where id=${id}`)
    return invoice;
}


exports.updateInvoiceStatus = async (id,invoice)=>{
    const updatedInvoice = await db.query(`update invoices SET status = ? where id=?`,[invoice.status,id])
    return updatedInvoice;
}

exports.createInvoice = async (newInvoice)=>{
   const createdInvoice = await db.query(`insert into invoices set user_id = ?, status = ?`,[newInvoice.user_id,newInvoice.status?newInvoice.status:"Placed"])
   newInvoice.items.forEach(async curr => {
       let item = await getItem(curr.item_id)
       item = item[0][0]
       totalprice = item.price * curr.quantity;
       await db.query(`insert into invoice_items set invoice_id=${createdInvoice[0].insertId}, item_id=${item.id},quantity=${curr.quantity},total_price=${totalprice}`)
   });
    return createdInvoice;
}

exports.deleteInvoice = async (id)=>{
    const invoice = await db.query(`delete from invoices where id=${id}`)
    return invoice;
}

exports.getUserInvoices = async (user_id)=>{
    const invoices = await db.query(`select * from invoices where user_id=${user_id}`)
    return invoices;
}