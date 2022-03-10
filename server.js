const express = require("express");
const app = express();
const port = 5000;

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/scripts", express.static(__dirname + "public/scritps"));
app.use("/assets", express.static(__dirname + "public/assets"));

//Template Engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

//listen port
app.get("/", (req,res) => {
    res.render("index");
})

app.listen(port, () => console.log(`listening to ${port}`));