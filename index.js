var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var moment = require("moment");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.get("/",function(req,res){
       res.sendFile(__dirname + "/public/main.html");//only when accessing static files in js.
});

app.get("/:timequery",function(req,res){
    var timequery = req.params.timequery;
    
   var isnum = /^\d+$/.test(timequery);
   var timequeryInt = parseInt(timequery);
   
   var apiObj;
   
   if(isnum&&timequeryInt>=0){
      var unixFormat = moment.unix(timequery).format("MMMM D, YYYY");
       apiObj ={ "unix": timequery , "natural": unixFormat  };
   }
    
   else if(isNaN(timequery) && moment(timequery, "MMMM D, YYYY").isValid()){
       var naturalFormat = moment(timequery, "MMMM D, YYYY").format("X");
       apiObj ={ "unix": naturalFormat, "natural": timequery  };
        
    }

    else{
                  apiObj ={ "unix": null, "natural": null  };
    }
    
    
    
    res.send(apiObj);
    
});


   
   

  
    
   


app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The YelpCamp Server Has Started!");
});