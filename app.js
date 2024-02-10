const express = require("express")
const userRoutes = require("./routes/userRouter")
const itemRoutes = require("./routes/itemRouter")
const invoiceRoutes = require("./routes/invoiceRouter")

const app = express()
app.use(express.json())

app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send("Something went wrong!")
})


app.get("/api/v1/",(req,res)=>{
    res.send("Hello World!")
})
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/items', itemRoutes);
app.use('/api/v1/invoices', invoiceRoutes);

app.all('*', (req, res, next) => {
    res.status(404).send("this url is not found on the server")
})

module.exports = app