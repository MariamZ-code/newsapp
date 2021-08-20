const  express  = require("express");
const app = express();
const port = 3000;
const request = require ("request");
app.set("view engine" ,"hbs")
////////// PATHS
const path = require('path');
const publicDirectory = path.join(__dirname,'../public');
app.use(express.static(publicDirectory));


//////////// registerPartials
const viewsPath = path.join(__dirname,'../templates/views');
app.set('views',viewsPath);

//////// HBS  
const hbs = require('hbs');

const pathPartiales = path.join(__dirname,'../templates/partials');
hbs.registerPartials(pathPartiales);





app.get('/news',(req,res)=>{
const urlNews="http://newsapi.org/v2/everything?q=egypt&apiKey=e0ca013adc83423d84e0773e9d801cf7";

request ({url:urlNews,json:true} , (error , response)=>{
    if(error)
    {
      return  res.send('Error has occurred');
    }/*
    else if (response.body.articles.length ==0){
      return res.send('Error!! please write Name of country right');
   }*/
    else if (response.body.totalResults ==0){
       return res.send('Error!! please write Name of country right');
    }
    else{
        const newsData =response.body.articles
        res.render('index',{
            data:newsData,
            header:"NEWS APP",
            footer:"EYGPT NEWS", 
           
        })
      }
    })
    
    
})








app.listen(port, () => {
    console.log('Server is running')
  })