const express = require("express");
const cors = require("cors")
const connecttoMongo = require("./database/db")
require("dotenv").config();

const app = express();
const port = process.env.PORT || 7000;

// Middle ware
app.use(cors());
app.use(express.json());
app.disable('x-powered-by')// because of this less hacker will know about stack

//Rountes
app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.post("/admin/uploadProducts",require("./routes/products"));
app.get("/admin/getallProduct",require("./routes/products"));
app.get("/admin/:id",require("./routes/products"));
app.delete("/delete/:id",require("./routes/products"));

//User Authentication
app.post("/signup",require("./routes/auth"));
app.post("/login",require("./routes/auth"));
app.get("/getuser/:token",require("./routes/auth"))

//Server started
connecttoMongo().then(()=>{
    try {
        app.listen(port,()=>{
            console.log(`Server listening to http://localhost:${port}`);
        })
    } catch (error) {
        console.log("Connection to the server unsuccessfull")
    }

}).catch(err=>{
    console.log(`Invalid Connection error is ${err}`)
});

















