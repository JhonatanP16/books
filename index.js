import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express();

const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test',
})

app.use(express.json());
app.use(cors());
app.get('/',(req,res) =>{
    res.json("hellow this is backend")
});
app.get('/books',(req,res) =>{
    const q = "SELECT * FROM books";
    db.query(q,(err,data) =>{
        if (err) return res.json(err)
        return res.json(data);
    })
})

app.post('/books',(req,res) => {
    const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) values (?)"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];

    db.query(q,[values],(err,data) =>{
        if(err) return res.json(err);
        return res.json('books has been created succesfully');
    })
})

app.delete('/books/:id',(req,res) => {
    const bookId = req.params.id;
    const q = "DELETE from books WHERE id = ?"
    db.query(q,[bookId],(err,data) => {
        if(err) return res.json(err);
        return res.json('books has been deleted succesfully');
    })
})

app.put('/books/:id',(req,res) => {
    const bookId = req.params.id;
    const q = "UPDATE books SET `title` = ?, `desc` = ?, `cover` = ? , `price` = ? WHERE id = ?"
    const values = [
        req.body.title,
        req.body.desc,
        req.body.cover,
        req.body.price,
    ];
    db.query(q,[...values,bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json('books has been updated succesfully');
    })
});

app.listen(8800,() => {
    console.log("Connect to backend")
}) 