const express    = require("express");
const bodyParser = require('body-parser')
const https      = require('https');
const fs         = require("fs");

const app = express();

const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    res.header('Access-Control-Allow-Methods', "*")
    next();
  }

const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);
  

let missions = [
    {
        id        : 0,
        text      : "hello world",
        condition : true,
        show      : true,
        createAt  : new Date(),
        updateAt  : new Date()
    },{
        id        : 1,
        text      : "hello world 2",
        condition : true,
        show      : true,
        createAt  : new Date(),
        updateAt  : new Date()
    }, {
        id        : 2,
        text      : "hello world 3",
        condition : true,
        show      : true,
        createAt  : new Date(),
        updateAt  : new Date()
    }
]

app.get("/missions", (req, res) => {

    res.json({
        status  : "OK",
        message : "",
        data    : missions
    });
})

app.post("/missions", (req, res) => {

    const data = req.body;
    
    console.log("Push data");

    missions.push(data)

    res.json({
        status  : "OK",
        message : "Create missions successfully",
        data : {
            ...data,
            test : "lol"
        }
    });
})

app.delete("/missions/:id", (req, res) => {

    const {id} = req.params;

    console.log(id)

    console.log("delete");

    const index = missions.findIndex(mission => mission.id === Number(id))

    delete missions[index]

    missions = missions.filter(i => i );

    missions.slice(index, 1);

    res.json({
        status  : "OK",
        message : "Delete missions successfully",
        data : {index}
    });

})

// Create an HTTPS service identical to the HTTP service.
// https.createServer(options, app).listen(5001, () => {

//     console.log("Server run on port 5001");
// })

applisten(5001, () => {

    console.log("Server run on port 5001");
})