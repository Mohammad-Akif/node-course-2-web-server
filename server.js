const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 4000;

var app = express();

app.set('view engine','hbs');

app.use((request, response, next) => {
    var requestData = `${new Date().toString()}  ${request.method}  ${request.url}`;
    console.log(requestData);
    fs.appendFile('server.log',requestData + "\n",(error) => {
        if(error){
            console.log('Unable to append the file.');
        }
    });
    next();
});

app.use((request, response, next) => {
    response.render('maintainence');
});

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear',() =>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

/*app.get('/',(req, res) => {
 //   res.send('<h1> Hello Express! </h1>');
    res.send({
        name: 'Akif',
        details: [
            {
                age: '25',
                height: 5.10
            }
        ]
    });
});*/

app.get('/about',(req, res) => {
    //   res.send('<h1> Hello Express! </h1>');
       res.render('about.hbs',{
           pageTitle: 'About Page',
       });
});

app.get('/',(req,res) =>{
    res.render('home.hbs',{
        welcomeMessage: 'Welcome to home page',
        pageTitle: 'Home Page',
    });
});
app.get('/bad',(req, res) =>{
    res.send({
        errorMessage: 'Cannot fulfill the request'
    });
});

app.listen(port,() =>{
    console.log(`Server is listning on port ${port}`);
});