const mariaDB = require("mariadb");

const creds = {
    host     : 'localhost',
    user     : 'root',
    password : 'Ht6H8z2A',
    database : 'personale'
}

const pool = mariaDB.createPool(creds)

// function der henter data med eller uden parameter
exports.getData = async function (id) {
    let dbh, result;
    let sql = id == null ? "select * from persons" : "select * from persons where id = ?";
    try {
        dbh = await pool.getConnection();
        result = await dbh.query(sql, id);
    }
    catch (err) {
        console.log(err);
        result = err;
    }
    finally {
        return result;
    }
}

// function der opretter record i DB
exports.createRecord =  function(data) {
    return new Promise(async function(resolve, reject){
        let sql = "insert into persons (fname, lname, email) values(?,?,?)";
        try {
            dbh = await pool.getConnection();
            dbh.query(sql, [data.fname, data.lname, data.email]);
            resolve("Person added with success")
        }
        catch(err){
            console.log(err);
            reject(err);
        }
    })
}


 // function der opdaterer DB
 exports.putData = function(data, id) {
     return new Promise(async function(resolve, reject){
         let sql = "UPDATE persons set fname = ?, lname = ?, email = ? WHERE id = ?";
         try {
            dbh = await pool.getConnection();
            dbh.query(sql, [data.fname, data.lname, data.email, id]);
            resolve("Person UPDATE with success")
            // console.log();
            // console.log(id);

         } catch (err) {
            console.log(err);
            reject(err);
         }
     })
 }

 // function der fjerner data
 exports.deleteData = function(id) {
    return new Promise(async function(resolve, reject){
        let sql = "DELETE FROM persons WHERE id = ?;";
        try {
           dbh = await pool.getConnection();
           dbh.query(sql, id);
           resolve("Person DELETE with success")

        } catch (err) {
           console.log(err);
           reject(err);
        }
    })

 }