const express=require('express');
const expressLayout =require('express-ejs-layouts')
const path=require('path');

const app=express();
app.use(expressLayout);
app.use(express.static('public'))
app.set('layout','./layouts/main');
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/',require('./server/routes/main.js'))
app.listen(5000,()=>{
    console.log("server started...");
})