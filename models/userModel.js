const db = require("./../config/db")

exports.getAll = async ()=>{
    const [users] = await db.query("select * from users")
    return users;
}

exports.getUser = async (id)=>{
    const user = await db.query(`select * from users where id=${id}`)
    return user;
}


exports.updateUser = async (id,user)=>{
    const updatedUser = await db.query(`update users SET username = ?, email = ? where id=?`,[user.username,user.email,id])
    return updatedUser;
}

exports.createUser = async (newUser)=>{
    const createdUser = await db.query(`insert into users set username = ?, email = ?`,[newUser.username,newUser.email])
    return createdUser;
}

exports.deleteUser = async (id)=>{
    const user = await db.query(`delete from users where id=${id}`)
    return user;
}
