import express from 'express';
import axios from 'axios';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
const apiKey = '';
const URL = 'https://api.public-holidays.nz/v1/';

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", async (req, res) => {
    const allHolidays = await axios.get(URL + `year?apikey=${apiKey}&year=${new Date().getFullYear()}`)
    console.log(allHolidays.data);
    res.render("index.ejs")
})

app.post("/submit", (req, res) => {
    const date = transformDate(req.body.date);
    const result = axios.get(`https://api.public-holidays.nz/v1/day?apikey=${apiKey}&date=${date}`);
    result.then(data => {
        res.render("index.ejs", {
            holiday: data.data
        }) 
    })

})

function transformDate(dateRecieved) {
    const newDate = dateRecieved.split("-");
    const retDate = newDate.reverse();
    return retDate;
}

app.listen(PORT, () => {
    console.log("listening on port " + PORT)
})
