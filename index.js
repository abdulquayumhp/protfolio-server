

const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());

const nodemailer = require("nodemailer");
const mg = require('nodemailer-mailgun-transport');

const port = process.env.port || 8000;






const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wtn02jv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function sendMessageEmail(message) {
  console.log("b", message)

  const { email, messageText, name } = message

  let transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY
    }
  })

  transporter.sendMail({
    from: "SENDER_EMAIL", // verified sender email
    to: "RECIPIENT_EMAIL", // recipient email
    subject: "Test message subject", // Subject line
    text: "Hello world!", // plain text body
    html: "<b>Hello world!</b>", // html body
  }, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

}





async function mongodbConnect() {
  try {
    const myPortfolioAllWorkExperience = client
      .db("myPortfolio")
      .collection("allWorkExperience");

    const myPortfolioAllTestimonial = client
      .db("myPortfolio")
      .collection("allTestimonial");

    const myPortfolioAllBlog =
      client.db("myPortfolio")
        .collection("allBlog");

    const myPortfolioWhatIDid =
      client.db("myPortfolio")
        .collection("Whatidid");

    const myPortfolioExperience =
      client.db("myPortfolio")
        .collection("Experience");

    const myPortfolioMessage =
      client.db("myPortfolio")
        .collection("Message");


    app.get("/allWorkExperience", async (req, res) => {
      const result = await myPortfolioAllWorkExperience
        .find({})
        .limit(6)
        .toArray();
      res.send(result);
    });
    app.get("/designExperience", async (req, res) => {
      const categoryName = "design";
      const query = {
        category: categoryName,
      };
      const result = await myPortfolioAllWorkExperience
        .find(query)
        .limit(6)
        .toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/javascriptExperience", async (req, res) => {
      const categoryName = "javascript";
      const query = {
        category: categoryName,
      };
      const result = await myPortfolioAllWorkExperience
        .find(query)
        .limit(6)
        .toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/reactJsExperience", async (req, res) => {
      const categoryName = "reactjs";
      const query = {
        category: categoryName,
      };
      const result = await myPortfolioAllWorkExperience
        .find(query)
        .limit(6)
        .toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/reactJsTeamExperience", async (req, res) => {
      const categoryName = "ReactTeamProject";
      const query = {
        category: categoryName,
      };
      const result = await myPortfolioAllWorkExperience
        .find(query)
        .limit(6)
        .toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/allWorkExperienceNotLimit", async (req, res) => {
      const result = await myPortfolioAllWorkExperience.find({}).toArray();
      // console.log(result);
      res.send(result);
    });
    app.get("/allTestimonial", async (req, res) => {
      const result = await myPortfolioAllTestimonial.find({}).toArray();
      res.send(result);
    });
    app.get("/allBlog", async (req, res) => {
      const result = await myPortfolioAllBlog.find({}).toArray();
      res.send(result);
    });

    app.get("/whatIDid", async (req, res) => {
      const result = await myPortfolioWhatIDid.find({}).toArray();
      // console.log(result)
      res.send(result);
    });

    app.get("/Experience", async (req, res) => {
      const result = await myPortfolioExperience.find({}).toArray();
      // console.log(result)
      res.send(result);
    });



    // const box = {
    //   "websiteName": "News portal website (Large Scale Team Project)",
    //   "category": "ReactTeamProject",
    //   "details": "This is reselling product buying platform and also it's fully MERN stuck website and a user can buy,add product ",
    //   "LiveSideLink": "https://daylight-news-withteam.web.app/",
    //   "imageLink": "https://i.ibb.co/nfvdDHf/screencapture-daylight-news-withteam-web-app-2023-03-06-01-41-13.png"
    // }

    // const about = myPortfolioAllWorkExperience.insertOne(box)






    app.post("/message", async (req, res) => {
      const message = req.body;
      // send email about 
      const result = await myPortfolioMessage.insertOne(message)
      // sendMessageEmail(message)
      console.log("h", message);
      res.send(result)

    });







  } finally {
  }
}
mongodbConnect().catch((err) => console.log(err));

app.get("/", async (req, res) => {
  res.send("server is running on port 8000");
});

app.listen(port, () => {
  console.log(`server is prothfolio ${port} `);
});
