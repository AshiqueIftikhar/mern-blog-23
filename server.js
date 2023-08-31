const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middleware. It parses incoming JSON payload
app.use(express.json({extended: false}));

const withDB = async(operations, res)=>{
    try {
        const client = await MongoClient.connect("mongodb+srv://ifty:ifty123@cluster0.9pvozuw.mongodb.net")
        const db = client.db('mern-blog-23');
        await operations(db);
        client.close();
    } catch (error) {
        res.status(500).json(error)
    }
}

app.get("/api/articles/:name",(req, res)=>{
       withDB(async(db)=>{
           
           const articleName = req.params.name;
           const articleInfo = await db.collection("articles").findOne({name: articleName});
           res.status(200).json(articleInfo);
       }, res)
})

app.get("/api/articles/:name/add-comments", (req, res)=>{
    const {username, text} = req.body;
    const articleName = req.params.name;
    withDB(async(db)=>{
        const articleInfo = await db.collection("articles").findOne({name: articleName});
        await db.collection("articles").updateOne({name: articleName}, {
            $set: {
                comments: articleInfo.comments.concat({username, text})
            }
          }
        );
        const updatedArticleInfo = await db.collection("articles").findOne({name: articleName});
        res.status(200).json(updatedArticleInfo);
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})