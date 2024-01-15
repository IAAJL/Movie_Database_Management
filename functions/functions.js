let db = require('../db/connection.js')

function insertuser(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")
         let query = [req.body.username,req.body.password,req.body.email]
         conn.query("SELECT 1 as val")
           .then(async (rows) => {
             const row = await conn.query("insert into "+"user(name,password,email)"+" values (?,?,?)",query);
             console.log(row)
           })
           .then(() => {
             conn.end();
             res.send("User registered")
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("User registration failed")
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("User registration failed")
       });
 
 }

 function insertmovie(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")
         let query = [req.body.name,req.body.genre]
         conn.query("SELECT 1 as val")
           .then(async (rows) => {
             const row = await conn.query("insert into "+"movie(name,genre)"+" values (?,?)",query);
             console.log(row)
           })
           .then(() => {
             conn.end();
             res.send("Movie registered")
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("Movie registration failed")
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("Movie registration failed")
       });
 
 }

 function insertshow(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")
         console.log("Type = "+typeof(req.body.date)+req.body.date)
         let query = [req.body.mid,req.body.theatre,req.body.show,req.body.date]
         conn.query("SELECT 1 as val")
           .then(async (rows) => {
             const row = await conn.query("insert into "+"shows(movieid,theatre,shows,currentdate)"+" values (?,?,?,STR_TO_DATE(?,'%Y-%m-%d'))",query);
             console.log(row)
           })
           .then(() => {
             conn.end();
             res.send("Show registered")
             // pool.end()
           })
           .catch(err => {
             //handle error
             console.log(err); 
             conn.end();
             res.send("Show registration failed\n"+err)
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("Show registration failed\n"+err)
       });
 
 }

 function searchshow(req,res){
    let pool = db.getPool()
    pool.getConnection()
       .then(conn => {
         console.log("connected")

         let query2 = [req.body.mname,req.body.theatre,req.body.show,req.body.date]

         let first ="",last=""
         let i=0

         let query=[]
         


         if(req.body.theatre){
            first=first+"theatre =(?) "
            query[i]=req.body.theatre
            i++
         }

         console.log(i)

         if(req.body.show){
            if(i!=0)
            last+=" and "
            first=first+"shows =(?)"
            query[i]=req.body.show
            i++
         }

         if(req.body.date){
            if(i!=0)
            first+=" and "
            first=first+"currentdate =(?)"
            query[i]=req.body.date
            i++
         }
         last=""
        //  if(req.body.mname){
        //     if(i!=0)
        //         first+=" and "
        //     query[i]=req.body.mname
        //     last = " movieid = (select id from movie where name =(?))"
        //  }

         if(req.body.mname){
          if(i!=0)
          first+=" and "
          first=first+"NAME =(?)"
          query[i]=req.body.mname
          i++
       }

         console.log(first+last)

         conn.query("SELECT 1 as val")
           .then(async (rows) => {
            //  const row = await conn.query("select theatre,shows,DATE_FORMAT(currentdate, '%Y-%m-%d') as currentdate from shows where movieid = (select id from movie where name =(?))",req.body.mname);
            
            // const row = await conn.query("select theatre,shows,DATE_FORMAT(currentdate, '%Y-%m-%d') as currentdate from shows where "+first+last,query);
            const row = await conn.query("select NAME,theatre,shows,DATE_FORMAT(currentdate, '%Y-%m-%d') as currentdate from shows s join movie m on s.movieid=m.id where "+first,query);

            // const row = await conn.query("select id from movie where name =(?)",req.body.mname);
            
            console.log(row)
            return row
             //select * from shows where movieid in (select id from movie where name =(?)),req.body.name

           })
           .then((row) => {
            
            let output = "<html><head></head><body><table>"

            output=output+"<tr>"
            output=output+"<td>"
            output=output+"Name"
            output=output+"</td>"
            output=output+"<td>"
            output=output+"Theatre"
            output=output+"</td>"
            output=output+"<td>"
            output=output+"Show"
            output=output+"</td>"
            output=output+"<td>"
            output=output+"Date"
            output=output+"</td>"
            output=output+"</tr>"

            for (i in row){
                console.log("i-",typeof(row[i].theatre))
                output=output+"<tr>"
                output=output+"<td>"
                output=output+row[i].NAME
                output=output+"</td>"
                output=output+"<td>"
                output=output+row[i].theatre
                output=output+"</td>"
                output=output+"<td>"
                output=output+row[i].shows
                output=output+"</td>"
                output=output+"<td>"
                output=output+row[i].currentdate
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
             res.send("Show search failed\n"+err)
             //  pool.end()
           })
           
       })
       .catch(err => {
         //not connected
         console.log(err)
         res.send("Show search failed\n"+err)
       });
 
 }


module.exports = {insertuser,insertmovie,insertshow,searchshow}