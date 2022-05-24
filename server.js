const express = require("express");
const path = require("path");
const app = express();
app.use(express.static('./dist/puja_pratham_frontend'));
app.get('/',(req,res)=>{
    res.sendFile('index.html',{root:'dist/puja_pratham_frontend'})
});
app.use((request,response)=>{
    res.sendFile('index.html',{root:'dist/puja_pratham_frontend'});
})
app.listen(process.env.PORT || 8080);