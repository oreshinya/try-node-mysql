const mysql = require('mysql');

//const connection = mysql.createConnection({
//  host     : 'localhost',
//  user     : 'root',
//  database : 'try_node_mysql'
//});
//
//connection.query('TRUNCATE TABLE topics');
//
//connection.query('INSERT INTO topics (name) VALUES (?)', [ 'Test topic' ], function (error, results, fields) {
//  if (error) throw error;
//  console.log('Inserted ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//
//connection.query('SELECT * FROM topics', function (error, results, fields) {
//  if (error) throw error;
//  console.log('Selected ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//connection.query('UPDATE topics SET name = \'Updated topic\' WHERE id = 1', function (error, results, fields) {
//  if (error) throw error;
//  console.log('Updated ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//connection.query('SELECT * FROM topics', function (error, results, fields) {
//  if (error) throw error;
//  console.log('Selected after updated ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//connection.query('DELETE FROM topics WHERE id = 1', function (error, results, fields) {
//  if (error) throw error;
//  console.log('Deleted ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//connection.query('SELECT * FROM topics', function (error, results, fields) {
//  if (error) throw error;
//  console.log('Selected after deleted ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//});
//
//connection.end();


const pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  database : 'try_node_mysql'
});

pool.query('TRUNCATE TABLE topics');

//pool.query('INSERT INTO topics (name) VALUES (?)', [ 'Test topic' ], function (error, results, fields) {
//  console.log('Pool >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
//  if (error) throw error;
//  console.log('Inserted ==================================');
//  console.log(results);
//  console.log('Fields ------------------------------------');
//  console.log(fields);
//  console.log('');
//
//  // エラーテスト
//  //pool.query('INSERT INTO topics (id, name) VALUES (1, ?)', [ 'Test topic' ], function (error, results, fields) {
//  //  if (error) throw error;
//  //});
//
//  // エラーテスト
//  //pool.query('TEKITOU', [ 'Test topic' ], function (error, results, fields) {
//  //  if (error) throw error;
//  //});
//
//  pool.query('INSERT INTO comments (topic_id, body) VALUES (?, ?)', [ 1, 'Test comment' ], function() {
//
//    const q = {
//      sql: 'SELECT * FROM comments INNER JOIN topics ON comments.topic_id = topics.id',
//      nestTables: true
//    };
//
//    pool.query(q, function (error, results, fields) {
//      if (error) throw error;
//      console.log('Selected ==================================');
//      console.log(results);
//      console.log(results[0].topics.created_at.getTime());
//      console.log('Fields ------------------------------------');
//      console.log(fields);
//      console.log('');
//    });
//  });
//});

pool.getConnection(function (err, conn) {
  conn.beginTransaction(function (err) {
    conn.query('INSERT INTO topics (name) VALUES (?)', [ 'Test topic 1' ], function (error, results, fields) {
      conn.query('INSERT INTO topics (name) VALUES (?)', [ 'Test topic 2' ], function (error, results, fields) {
        conn.rollback(function () {
        //conn.commit(function () {
          conn.query('SELECT * FROM topics', function (error, results, fields) {
            if (error) throw error;
            console.log('Transactioned ==================================');
            console.log(results);
            console.log('Fields ------------------------------------');
            console.log(fields);
            console.log('');
            pool.end();
          });
        });
      });
    });
  });
});


