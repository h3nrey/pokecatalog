const express = require("express");
const app = express();
const port = process.env.PORT ||5000;

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/scripts", express.static(__dirname + "public/scritps"));
app.use("/assets", express.static(__dirname + "public/assets"));

//Template Engine
app.set("views", "./src/views");
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended : true }))

const pokelistRoute = require("./src/routes/pokelist");

app.use("/", pokelistRoute);

//listen port
app.listen(port, () => console.log(`listening to ${port}`));