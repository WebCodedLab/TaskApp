const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

//Displaying data with fs module
app.get('/', (req, res) => {
    fs.readdir('./files', (err, files) => {
        res.render('index', {files: files}); // Sending data to the index page
    })
})

//Creating a new task and redirecting back to the index page
app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=> {
        res.redirect('/');
    })
})

//Displaying FileData on new Page
app.get('/files/:filename', (req, res) =>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",  (err, data) => {
        res.render('show', {filedata: data, filename: req.params.filename});
    })
})

//Deleting a Task
app.get("/delete/:filename", (req, res) => {
    fs.unlink(`./files/${req.params.filename}`, (err) => {
      res.redirect("/");
    });
  });






app.listen(PORT);

