//Author Name: Aiturgan Suiunbai kyzy
//StudentId : 301093804
//WebApp Name: comp229-f2020-midterm.herokuapp.com
//File Name: COMP229-F2020-MidTerm-301093804


// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');
const books = require('../models/books');



/* GET books List page. READ */
router.get('/', (req, res, next) => {
    // find all books in the books collection
    book.find((err, books) => {
        if (err) {
            return console.error(err);
        } else {
            res.render('books/index', {
                title: 'Books',
                books: books
            });
        }
    });

});

//////////////////////////////
//GET ADD BOOK BUTTON TO WORK
router.get('/add', (req, res, next) => {
    res.render('books/details', {
        title: 'Add Books',
        books: ''
    });
});

/////////////////////////////////////////////////////////
//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {


    res.render('books/details', { title: 'Add Books' });


});


/////////////////////////////////////////////////////////////
// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    //instantiate a new book object with the help of Model book,
    //catching displaying errors if there are any,if no error than redirecting to /books page
    let books = book({
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });


    book.create(books, (err, book) => {
        if (err) {
            console.log(err);
            res.end(err);
        }
    })

    console.log(books);

    res.redirect('/books');
});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    let id = req.params.id;

    //pass id to database by finding id with findById function and store it in bookToEdit

    book.findById(id, (err, bookToEdit) => {
        if (err) {
            console.log(err);
            res.end(err);
        }

        //show edit view
        res.render('books/details', { title: 'Edit Books', books: bookToEdit });
    })
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    //require id to find the right book, and editing a book with the help og book model
    //updating book, catching displaying errors if there are any,if no error than redirecting to /books page
    let id = req.params.id;

    let updatedbooks = book({
        "_id": id,
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    book.updateOne({ _id: id }, updatedbooks, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }

        res.redirect('/books');
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/

    //require id to delete the right book, removing it
    //catching and displaying any errors if there are, if no error delete nad process back to /books page  
    let id = req.params.id;

    book.remove({ _id: id }, (err) => {
        if (err) {
            console.log(err);
            res.end(err);
        }

        res.redirect('/books');
    });
});


module.exports = router;