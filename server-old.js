const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 5000;

const articlesInfo={
    "learn-react":{ "comments": []},
    "learn-node": {"comments": []},
    "my-thoughts-on-learning-react":{"comments":[]}
}

// Initialize middleware. It parses incoming JSON payload
app.use(express.json({extended: false}));

// Just a test route
// app.get("/", (req, res) => res.send("Hello World!"));
// app.post('/',(req, res)=> res.send(req.body.name));
// app.get("/hello/:name", (req, res)=> res.send(`Hello ${req.params.name}`))
app.get("/api/articles/:name", async (req, res)=>{
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect("mongodb+srv://ifty:ifty123@cluster0.9pvozuw.mongodb.net")
        //mern-blog-23?retryWrites=true&w=majority");
        const db = client.db("mern-blog-23");
        const articleInfo = await db.collection("articles").findOne({name: articleName});
        res.status(200).json(articleInfo);
        client.close();
    } catch (error) {
        res.status(500).json(error)
    }
})

app.get("/api/articles/:name/add-comments", (req, res)=>{
    const {username, text} = req.body;
    const articleName = req.params.name;
    articlesInfo[articleName].comments.push({username, text});
    res.status(200).send(articlesInfo[articleName]);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})