const express = require("express");
const { google } = require("googleapis");
const mongoose = require("mongoose");
const Questions = require("./models/questionSchema");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  Questions.find()
    .limit(10)
    .exec((err, question) => {
      if (err) {
        return res.status(400).json({
          error: `NO collection found`,
        });
      }
      res.json(question);
    });
});

const fetchDataFromSpreadSheet = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth
  const client = await auth.getClient();

  // Instance of Google Sheets API
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "1Mjz9tF5Sz2Q3TRvdzloSlDVJNqNgkjSCKwla6QF_7Ps";

  // Get metadata about spreadsheet
  const metaData = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });

  // Read rows from spreadsheet
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "MCQ",
  });

  getRows.data.values
    .slice(1, -1)
    .map((element) => new Questions({ question: element }).save());
};

const deleteExistingDataInDB = () => {
  Questions.deleteMany({})
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
};

//DB Connection String
mongoose
  .connect(
    "mongodb+srv://intern-assignment:<password>@cluster0.9nft7sf.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(async () => {
    deleteExistingDataInDB();
    fetchDataFromSpreadSheet();
    console.log("DB CONNECTED");
  })
  .catch(() => console.log("Ooops FAIL TO MAKE A CONNECTION WITH DB....!!!"));

//for refreshing the DB
setInterval(async () => {
  deleteExistingDataInDB();
  fetchDataFromSpreadSheet();
}, 3600000);

//server initializer
app.listen(8000, (req, res) => console.log("running on 8000"));
