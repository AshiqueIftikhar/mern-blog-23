const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middleware. It parses incoming JSON payload
app.use(express.json({extended: false}));

// Just a test route
app.get("/", (req, res) => {
    res.send("Hello World!");
})
app.post('/',(req, res)=>{
    res.send(req.body.name);
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})