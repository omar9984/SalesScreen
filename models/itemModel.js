const db = require("./../config/db")

exports.getAll = async ()=>{
    const [items] = await db.query("select * from items")
    return items;
}

exports.getItem = async (id)=>{
    const item = await db.query(`select * from items where id=${id}`)
    return item;
}


exports.updateItem = async (id,item)=>{
    const updatedItem = await db.query(`update items SET name = ?, price = ? where id=?`,[item.name,item.price,id])
    return updatedItem;
}

exports.createItem = async (newItem)=>{
    const createdItem = await db.query(`insert into items set name = ?, price = ?`,[newItem.name,newItem.price])
    return createdItem;
}

exports.deleteItem = async (id)=>{
    const item = await db.query(`delete from items where id=${id}`)
    return item;
}
