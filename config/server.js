require("dotenv").config('./.env')
require('./db')
const app = require('./../app')
const port = process.env.PORT || 3001
app.listen(3000,()=>{
    console.log(`server is running on port ${port}`)
})