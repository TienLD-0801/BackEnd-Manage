const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Tienld0801@',
});

pool.query('SELECT 1 + 1 as solution', function (err, result) {
  if (err) throw err;
  console.log(`query result : `, result);
  pool.end((err) => {
    if (err) throw err;
    console.log(`connection closed: `);
  });
});
