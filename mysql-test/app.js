const mysql = require('mysql');
var connection;

function createConnection() {
    return new Promise((resolve, reject) => {

        connection = mysql.createConnection({
            host: 'db4free.net',
            user: 'polijic',
            password: 'polijic1234',
            database: 'polijic'
        });
        connection.connect((err) => {
            if (err) console.log('INTERNAL ERROR:' + err);
            console.log('Connectada!');
            resolve(connection);
        });
    });

}

function listProducts(user, callback) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM productos', (err, rows) => {
            if (err) console.log('INTERNAL ERROR:' + err);

            console.log('Data received from Db:');
            console.log(JSON.stringify(rows));
            rows.forEach((row) => {
                console.log(`${row.name} quantity  ${row.quantity}`);
            });
            resolve(JSON.stringify(rows));
        });

    });
}

function listProductsByname(name, callback) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM productos WHERE name = ?', name, (err, rows) => {
            if (err) console.log('INTERNAL ERROR:' + err);

            console.log('Data received from Db:');
            console.log(JSON.stringify(rows));
            rows.forEach((row) => {
                console.log(`${row.name} quantity  ${row.quantity}`);
            });
            resolve(JSON.stringify(rows));
        });

    });
}

function listProductsById(id, callback) {
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM productos WHERE id = ?', id, (err, rows) => {
            if (err)
                console.log('INTERNAL ERROR:' + err);

            console.log('Data received from Db:');
            console.log(JSON.stringify(rows));
            rows.forEach((row) => {
                console.log(`${row.name} quantity  ${row.quantity}`);
            });
            resolve(JSON.stringify(rows));
        });

    });
}

function insertProduct(product, callback) {
    return new Promise((resolve, reject) => {
        console.log('product', product);
        connection.query('INSERT INTO productos SET ?', product, (err, res) => {
            if (err) console.log('INTERNAL ERROR:' + err);

            console.log('Last insert ID:', res.insertId);
            resolve(res.insertId);
        });

    });
}

function updateProduct(product, callback) {
    return new Promise((resolve, reject) => {
        console.log('product', product);
        console.log('product', product.id);
        connection.query('UPDATE  productos SET ? WHERE id = ?', [product, product.id], (err, res) => {
            if (err) console.log('INTERNAL ERROR:' + err);

            resolve(product);
        });

    });
}


function deleteProduct(id, callback) {
    return new Promise((resolve, reject) => {
        console.log('id', id);
        connection.query('DELETE FROM productos WHERE id = ?', id, (err, res) => {
            if (err) console.log('INTERNAL ERROR:' + err);

            console.log('ID deleted:', id);
            resolve(id);
        });

    });
}

module.exports = {
    createConnection,
    listProducts,
    insertProduct,
    deleteProduct,
    listProductsByname,
    listProductsById,
    updateProduct
}

//createConnection()
//  .then((connection) => {
//    return listUsers(connection)
//})
//.catch((err) => console.log(err));