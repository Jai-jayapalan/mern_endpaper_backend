const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Blog = require('./models/models')
const cors = require('cors')

const app = express();
const port = 3500;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

// MongoDB connection setup
mongoose.connect('mongodb://localhost/blogDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection

db.on('error',(err)=>{
    console.log(err)
})
db.once('open',()=>{
    console.log('DataBase connected successfully.....')
})

// API endpoints
app.post('/api/blogs', (req, res) => {
  const { title, content, category, subCategory, author } = req.body;
  const newBlog = new Blog({
    title,
    content,
    category,
    subCategory,
    author
  });
  newBlog.save((err) => {
    if (err) {
      res.status(500).json({ error: 'Error creating blog' });
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/api/blogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      res.status(500).json({ error: 'Error retrieving blogs' });
    } else {
      res.status(201).json(blogs);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
