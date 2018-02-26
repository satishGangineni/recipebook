

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'), 
    app = express();

const conString = "postgres://tester:tester@localhost:5432/recipebookDB";


//Assign dust engine to the .dust files.

app.engine('dust',cons.dust);


//set default engine to dust.
app.set('view engine','dust');
app.set('views',__dirname + '/views');


//set the public folder.

app.use(express.static(path.join(__dirname,'public')));


//Body parser middleware.

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const { Pool, Client } = require('pg')

const pool = new Pool({
    user: 'tester',
    host: 'localhost',
    database: 'recipebookDB',
    password: 'tester',
    port: 5432,
  })

  const client = new Client({
    user: 'tester',
    host: 'localhost',
    database: 'recipebookDB',
    password: 'tester',
    port: 5432,
  })

app.get('/', (req,res)=>{
    //console.log('request');
   // res.render('index');
    getRecipes((err,results)=>{
        if(!err){
            res.render('index',{ recipes: results });
        }

    }); 
});


app.post('/Add', (req,res)=>{
   
   console.log('Add request');
   Addrecipe(req,res,(err)=>{
    res.redirect('/');
   });
});

app.delete('/delete/:id', (req,res)=>{
    deleteRecipe(req.params.id,(err)=>{
        if(!err){
            res.send(200);
            console.log('result sent back!');
        }
    });
 })

 app.post('/edit', (req,res)=>{

    editrecipe(req, res, (err,res)=>{
        if(!err){
            console.log('inside of the call back');
            res.redirect('/');
           
        }
    });
 });

 const editrecipe = function(req, response, callback){
    pool.query('update recipes set name=$1, ingredients=$2, directions=$3 where id=$4',[req.body.name,req.body.ingredients,req.body.directions, req.body.id], 
    (err, res)=>{
     console.log('inside of the edit query');
     response.redirect('/');
     //callback(err,res);
     });
   }

const getRecipes = function (callback){

    pool.query('SELECT * from recipes', (err, res) => {
      console.log(err, res.rows)
      callback(err,res.rows);
    })
//     client.connect()
//    client.query('SELECT * from recipes', (err, res) => {
//       console.log(err, res.rows)
//       client.end()
//     })

}

const Addrecipe = function(req,res, callback){

    pool.query('Insert into recipes(name, ingredients, directions) values($1, $2, $3)',[req.body.name,req.body.ingredients,req.body.directions], (err, res) => {
        //callback(err,res.rows);
     console.log('inside of the insert query');
     callback(err);
     });
}

const deleteRecipe = (id, callback)=>{
    //console.log('id is '+ id);
    pool.query('Delete from recipes where id = $1',[id], (err,res) => {
     console.log('inside of the delete query');
     callback(err);
     });

}



//server

app.listen(3000,()=>{
    console.log('Server started on port 3000');
})

//pool.end()





