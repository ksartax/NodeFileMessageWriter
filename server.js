const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.result = [];
app.listen(8085, function () {
    console.log('nasluchuje na 8085');
});

app.get('/', (req, resp) => {
    try {
        var data1 = fs.readFileSync('./mojewiadomosci.json');
        app.result = JSON.parse(data1);
    } catch (e) {
        app.result = [];
    }
    
    resp.render('index.ejs', { wiadomosci: app.result });
});

app.post('/wiadomosci', (req, resp) => {
    app.result.push({
        "imie": "" + req.body.imie + "",
        "nazwisko": "" + req.body.nazwisko + "",
        "wiadomosc": "" + req.body.wiadomosc + ""
    });
    fs.writeFileSync('./mojewiadomosci.json', JSON.stringify(app.result));

    resp.redirect('/');
});

app.get('/wyczysc', (req, resp) => {
    try {
        fs.writeFileSync('./mojewiadomosci.json', '');
    } catch (e) {
        app.result = [];
    }

    resp.redirect('/');
});

