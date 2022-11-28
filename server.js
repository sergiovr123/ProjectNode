var express = require('express')
var http = require('http')
var bodyParser = require('body-parser')
const db = require('./mysql-test/app');

var app = express()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
    //PerfWidgetExternal
var users = ['oscar', 'juan', 'marcos']

app.get('/', (req, res) => {
    res.status(200).send("Welcome to API REST")
})

app.get('/users/listProducts', jsonParser, (req, res) => {

    try {
        console.log('product in request' + req.query.name);
        console.log('1');

        if (req.query.name != undefined) {

            db.createConnection()
                .then((connection) => {
                    return db.listProductsByname(req.query.name)
                })
                .then((rows) => {
                    console.log('antes del response');
                    res.json(rows)
                    console.log('antes del return');
                    return;
                })
                .catch((err) => console.log(err));
        } else {
            db.createConnection()
                .then((connection) => {
                    return db.listProducts(connection)
                })
                .then((rows) => {
                    console.log('antes del response');
                    res.json(rows)
                    console.log('antes del return');
                    return;
                })
                .catch((err) => console.log(err));
        }


        console.log('3');
    } catch (err) {
        console.error(`Error while getting programming languages `, err.message);
    }
})

app.post('/users/saveProducts', jsonParser, function(req, res) {
    console.log(JSON.stringify(req.body));
    var product = req.body;
    try {
        console.log('products in request' + product);
        console.log('1');
        db.createConnection()
            .then((connection) => {
                return db.insertProduct(product)
            })
            .catch((err) => console.log(err));

        console.log('3');
    } catch (err) {
        console.error(`Error in catch `, err.message);

    }
    res.send('product inserted' + JSON.stringify(req.body))
})

app.post('/users/updateProducts', jsonParser, function(req, res) {
    console.log(JSON.stringify(req.body));
    var product = req.body;
    try {

        var jsonString = JSON.stringify(req.body);
        var json = JSON.parse(jsonString);
        console.log("nueva2" + json);
        console.log("product id" + json.id)
        if (json.id != undefined) {
            console.log('product in request' + json.id);
            console.log('1');
            db.createConnection()
                .then((connection) => {
                    return db.listProductsById(json.id)
                })
                .then((rows) => {
                    console.log('antes del update');
                    if (rows != undefined && rows.length > 2) {
                        console.log('entro al if' + JSON.stringify(rows) + "size: " + rows.length);
                        return db.updateProduct(product)
                    } else {
                        console.log('entro al else');
                        res.send('product not found' + JSON.stringify(req.body))
                        return
                    }
                }).then((product) => {
                    res.send('product updated' + JSON.stringify(req.body));
                })
                .catch((err) => console.log("ENTRO AL CATCH" + err));


        } else {
            res.send('product id is requered' + JSON.stringify(req.body))
            return
        }

    } catch (err) {
        console.error(`Error in catch `, err.message);
    }
})



app.delete('/users/deleteProduct', jsonParser, (req, res) => {
    try {

        var jsonString = JSON.stringify(req.body);
        var json = JSON.parse(jsonString);
        console.log("nueva2" + json);
        console.log("product id" + json.id)
        if (json.id != undefined) {
            console.log('product in request' + json.id);
            console.log('1');
            db.createConnection()
                .then((connection) => {
                    return db.deleteProduct(json.id)
                })
                .catch((err) => console.log(err));

            console.log('3');
        }

    } catch (err) {
        console.error(`Error in catch `, err.message);
    }
    res.send('Product with Id ' + json.id + 'was deleted')
})



http.createServer(app).listen(80, () => {
    console.log('Server started at http://localhost:80');
});
