import express from "express";
import mysql from "mysql"
import cors from "cors"

const app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Prajwal971@",
    database: "test",
});

app.use(express.json())//allows to send any json file to client
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello");
});

app.get("/books", (req, res) => {
    const q = "SELECT * FROM books";
    db.query(q, (err, data) => {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        return res.json(data);
    });
});

app.post("/books",(req,res)=>{
    const q = "INSERT INTO books(`title`, `desc`,`cover`) VALUE (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
    ]

    db.query(q,[values],(err,data)=>{
        if (err) console.log(err);
        return res.json("Book has been created Successfully");
    })
})

app.listen(8800, () => {
    console.log("Connected to backend")
})