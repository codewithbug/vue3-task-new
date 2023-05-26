require('dotenv').config();
const express = require('express')
const app = express()
const port = 3500
const cors = require('cors')
// app.use(cors({credentials:true,origin:process.env.BASE_URL}))
app.use(cors({credentials:true,origin:"*"}))
app.use(express.json());
app.use(express.urlencoded({extended:true}));



const taskController = require("./controllers/taskController");

app.use("/tasks" , taskController)

app.listen(port, () => {

    console.log(`Server Is Listening On Port ${port}`)

})