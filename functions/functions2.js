let db = require('../db/connection.js')

function insertrating(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")
         let query = [req.body.mid,req.body.company,req.body.rating]
         conn.query("SELECT 1 as val")
           .then(async (rows) => {
             const row = await conn.query("insert into rating(movieid,company,ratings) values ((?),(?),(?))",query);
             console.log(row)
           })
           .then(() => {
             conn.end();
             res.send("Rating registered")
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("Rating registration failed\n"+err)
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("Rating registration failed\n"+err)
       });
 
 }

 function insertbooking(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")
         let query = [req.body.mid,req.body.company,req.body.rating]
         conn.query("SELECT 1 as val")
           .then(async (rows) => {
             const row = await conn.query("insert into rating(movieid,company,ratings) values ((?),(?),(?))",query);
             console.log(row)
           })
           .then(() => {
             conn.end();
             res.send("Rating registered")
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("Rating registration failed\n"+err)
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("Rating registration failed\n"+err)
       });
 
 }

 function searchrating(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")

        //mname,company

         let first ="",last=""
         let i=0

         let query=[]
         query[0] =req.body.mname


         if(req.body.company){
            first=first+" and company =(?) "
            query[1]=req.body.company
         }



         conn.query("SELECT 1 as val")
           .then(async (rows) => {
            //  const row = await conn.query("select theatre,shows,DATE_FORMAT(currentdate, '%Y-%m-%d') as currentdate from shows where movieid = (select id from movie where name =(?))",req.body.mname);
            
            const row = await conn.query("select * from rating r join movie m on r.movieid=m.id where name=(?)"+first,query);

            // const row = await conn.query("select id from movie where name =(?)",req.body.mname);
            
            console.log(row)
            return row
             //select * from shows where movieid in (select id from movie where name =(?)),req.body.name

           })
           .then((row) => {
            
            let output = "<html><head></head><body><table>"

            output=output+"<tr>"
            output=output+"<td>"
            output=output+"Movie"
            output=output+"</td>"
            output=output+"<td>"
            output=output+"Company"
            output=output+"</td>"
            output=output+"<td>"
            output=output+"Rating"
            output=output+"</td>"
            output=output+"</tr>"

            for (i in row){
                output=output+"<tr>"
                output=output+"<td>"
                output=output+row[i].NAME
                output=output+"</td>"
                output=output+"<td>"
                output=output+row[i].company
                output=output+"</td>"
                output=output+"<td>"
                output=output+row[i].ratings
                output=output+"</td>"
                output=output+"</tr>"
            }

            output=output+"</table></body></html>"
   
             conn.end();
             res.send(output)
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("rating search failed\n"+err)
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("rating search failed\n"+err)
       });
 
 }


module.exports = {insertrating,searchrating,insertbooking}