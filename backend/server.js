const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

let BlogSchema = require('./models/blogSchema');

const app = express();
const router = express.Router();
const PORT = 4000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/blog', {
    useNewUrlParser: true,
    useFindAndModify: false
});

const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use("/", router);

router.route("/addBlogPost/:authorName").put(function (req, res) {
    const authorName = req.params.authorName;
    console.log(req.body);

    BlogSchema.findOne({ "author.authorName": authorName }, function (err, blog) {
        if (!blog) {
            console.log(res);
            res.status(404).send("Data not found");
        } else if (err) {
            console.log(err);
            res.status(400).send(err);
        } else {
            let post = {
                title: req.body.blogPosts[0].title,
                body: req.body.blogPosts[0].body,
                date: req.body.blogPosts[0].date
            };

            blog.blogPosts.push(post);

            blog.save().then(blog => {
                res.json(blog);
            })
                .catch(err => {
                    res.status(400).send(err);
                });
        }
    });
});

router.route("/addNewAuthor").post(function (req, res) {
    let blogPost = new BlogSchema(req.body);

    blogPost.save().then(blogPost => {
        res.status(200).json({ 'author': `Author: ${blogPost} added successfully` });
        console.log("/addNewAuthor was a success.");
    })
        .catch(err => {
            res.status(400).send(`Adding new Author: ${blogPost} failed`);
            console.log("/addNewAuthor failed");
        });
});

router.route("/getBlogs").get(function (req, res) {
    BlogSchema.find({}, function (err, result) {
        if (err) {
            res.send(err);
            console.log("/getBlogs failed.");
        } else {
            res.send(result);
            console.log("/getBlogs was a success.");
        }
    });
});

router.route("/getBlogs/:authorName").get(function (req, res) {
    const authorName = req.params.authorName;

    BlogSchema.find({ "author.authorName": authorName }, function (err, result) {
        if (err) {
            res.send(err);
            console.log(`/getBlogs/:authorName failed. ${err}`);
        } else {
            res.send(result);
            console.log("/getBlogs/:authorName was a success.");
        }
    });
});

router.route("/getAuthors").get(function (req, res) {
    BlogSchema.distinct('author', function (err, result) {
        if (err) {
            res.send(err);
            console.log("/getAuthors failed");
        } else {
            res.send(result);
            console.log("/getAuthors was a success.");
        }
    });
});

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});