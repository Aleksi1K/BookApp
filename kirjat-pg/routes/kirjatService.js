const USER = process.env.PGUSER;
const PASSWORD = process.env.PGPASSWORD;


const Pool = require('pg').Pool;
require('dotenv').config();
const conopts = {
    user: USER,
    password: PASSWORD,
    host: 'localhost',
    database: 'kirjat'
}




const pool=new Pool(conopts)  

const haekirjat = (b) => {
    pool.query('SELECT * from kirja ORDER BY id', (err, results) => {
        if (err) throw err;
        console.dir(results);
        b(results.rows);
    })
}
const haekirja = (id, b) => {
    pool.query('SELECT * FROM kirja WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results.rows);
        b(results.rows);
    })
}
const luokirja = (uusikirja, b) => {
    const { title, rating } = uusikirja;
    pool.query('INSERT INTO kirja (title, rating) VALUES ($1, $2)', [title, rating], (err, results) => {
        if (err) throw err;
        console.dir(results);
        b(results.rowCount);
    })
}

const paivitakirja = (kirja, id, b) => {
    const { title, rating } = kirja;
    pool.query('UPDATE kirja SET title=$1, rating=$2 WHERE id=$3', [title, rating, id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        b(results.rowCount);
    })
}
const poistakirja = (id, b) => {
    pool.query('DELETE FROM kirja WHERE id=$1', [id], (err, results) => {
        if (err) throw err;
        console.dir(results);
        b(results.rowCount);
    })
}
module.exports = { haekirjat, haekirja, luokirja, paivitakirja, poistakirja }