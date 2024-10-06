import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const apiKey = '4211f8a417114cd0894a3666cda9d107';
const URL = 'https://api.public-holidays.nz/v1/';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    const allHolidays = await axios.get(URL + `year?apikey=${apiKey}&year=${new Date().getFullYear()}`)
    // console.log(allHolidays.data);
    res.render("index.ejs")
})

app.post("/submit", (req, res) => {
    const {year, type} = req.body;
    getData(year, type).then(d => {
        console.log(d.data);
       res.render("index.ejs", {
        holiday: d.data
       })
    })
});

function getData(year, type){
    switch(type) {
        case 'both' : {
            return axios.get(`${URL}/year?apiKey=${apiKey}&year=${year}`);
        }
    }
    
}

function transformDate(dateRecieved) {
    const newDate = dateRecieved.split("-");
    const retDate = newDate.reverse();
    return retDate;
}

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
