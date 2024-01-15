let mariadb = require('mariadb')
let dotenv = require('dotenv')

dotenv.config({path:'../.env'})

let pool;

//   pool = mariadb.createPool({
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

// pool = mariadb.createPool({
//   host: 'localhost', 
//   user:'root', 
//   password: 'root',
//   connectionLimit: 5,
//   database:'movie',
// });




async function getPool(){
    return new Promise(async(resolve,reject)=>{
      await mariadb.createPool({
        host: 'localhost', 
        user:'root', 
        password: 'root',
        connectionLimit: 5,
        database:'movie',
  })
    .then((pool)=>{
        resolve(pool)
    })
    .catch(()=>{
        reject(null)
    })
  }
    )
}

async function insertusers(){
    pool = await getPool()
    await pool.getConnection()
        .then(conn => {

          let query = []
          // query.name = req.body.name
          // query.password = req.body.pass
          // query.email = req.body.email

          query[0] = test
          query[1] = 'ets'
          query[2] = 'ets@gmail.com'

          conn.query("SELECT 1 as val")
            .then(async (rows) => {
              console.log(rows); //[ {val: 1}, meta: ... ]
              //Table must have been created before 
              // " CREATE TABLE myTable (id int, val varchar(255)) "
              const row = await conn.query("Insert into "+"user"+" values (?),(?),(?)",query);
              console.log('inserted')
            })
            .then((res) => {
              console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
              conn.end();
              // pool.end()
            })
            .catch(err => {
              //handle error
              console.log(err); 
              conn.end();
              // pool.end()
            })
            
        })
        .catch(err => {
          //not connected
          console.log(err)
        });
    }
  function getconnect(){
    return new Promise((resolve,reject)=>{
    pool.getConnection()
      .then(conn => {
        resolve(conn)
      })
      .catch(()=>{
          reject(null)
        }
      )
    })
  }

  async function test(){ 
    let conn = await getconnect()
    console.log(conn)
    const row = await conn.query("Select * from "+"user"+" where name='test'",);
    console.log(row)
  }
  
  // async function test2(){ 
  //   await getPool()
  //   .then(async ()=>{
  //     console.log("entered")
  //   await getconnect()
  //   .then((conn)=>{
  //     console.log(conn)
  //     let row = await conn.query("Select * from "+"user"+" where name='test'",);
  //   console.log(row)
      
  //     // insertusers()
  //   )
    
  //   .catch(err=>{
  //     console.log("Some error occured\n",err)
  //   })}
  // }
  
  
function getPool() {
  return mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });
}

// Usage example
async function main() {
  let pool;
  try {
    pool = getPool();
    const conn = await pool.getConnection();
    const rows = await conn.query("select * from user");

    console.log(rows);
  } catch (err) {
    console.error(err);
  } finally {
    if (pool) pool.end();
  }
}
  
insertusers()
  // console.log(conn)
  console.log('connected')
  
  module.exports = {getconnect}