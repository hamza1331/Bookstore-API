//Imports
const express = require('express')
const app = express()
const process = require('process')
const port = process.env.PORT || 8000
const bodyParser = require('body-parser')
const mongooose = require('mongoose')
const Genre = require('./models/genre')
const Book = require('./models/books')


app.use(bodyParser.json())  //Body Parser MiddleWare

mongooose.connect('mongodb://localhost:27017/bookstore') //MongoDB connection using Mongoose
var db = mongooose.connection //Mongo Connection Instance

app.get('/',function(req,res){  //HomePage for API
    res.send('Hello world form Bookapp...')
})

//Get all Genres
app.get('/api/genres',function(req,res){
    Genre.getGenre(function(err,genres){
        if(err)throw err

        res.json(genres)
    })
})

//Insert a Genre
app.post('/api/genres',function(req,res){
    let genre = req.body
    Genre.addGenre(genre,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})
//Update a Genre
app.put('/api/genres/:_id',function(req,res){
    let id = req.params._id
    let genre = req.body
    Genre.updateGenre(id,genre,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})

//Delete a Genre
app.delete('/api/genres/:_id',function(req,res){
    let id = req.params._id
    Genre.removeGenre(id,function(err,genre){
        if(err)throw err

        res.json(genre)
    })
})

//Get all Books
app.get('/api/books',function(req,res){
    Book.getBooks(function(err,books){
        if(err)throw err

        res.json(books)
    })
})

//Insert a Book
app.post('/api/books',function(req,res){
    let book = req.body
    Book.addBook(book,function(err,book){
        if(err)throw err

        res.json(book)
    })
})

 //get single Book By Id
app.get('/api/books/:_id',function(req,res){
    Book.getBookById(req.params._id,function(err,book){
        if(err)throw err

        res.json(book)
    })
})

//Update a Book
app.put('/api/books/:_id',function(req,res){
    let id = req.params._id
    let book = req.body
    Book.updateBook(id,book,function(err,book){
        if(err)throw err

        res.json(book)
    })
})

//Delete a Book
app.delete('/api/books/:_id',function(req,res){
    let id = req.params._id
    Book.removeBook(id,function(err,book){
        if(err)throw err

        res.json(book)
    })
})

//Server
app.listen(port,function(){
    console.log('Listening on port'+port)
})