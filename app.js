const express = require('express');
const mongoose = require("mongoose");
const { Client } = require("@elastic/elasticsearch");
const cors = require('cors');
const app = express();
const router = express.Router();
const passport = require('passport');
const session = require('express-session');
const logger = require("./log");
app.use(session({ secret: 'SECRET' }));
const elasticsearch = require('elasticsearch');
const Logstash = require('logstash-client');
const { info } = require('winston');
mongoose.set('strictQuery', false);
const mongoUrl = "mongodb://0.0.0.0:27017";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'QJzu5wIqhv8nX3rEJgE4'
  }
});

client.ping({}, (error) => {
  if (error) {
    console.error('Elasticsearch connection failed:', error);
  } else {
    console.log('Connected to Elasticsearch');
  }
});

const logstash = new Logstash({ type: 'tcp', host: 'localhost', port: 9600 });
logstash.connect((error) => {
  if (error) {
    console.error('Logstash connection failed:', error);
  } else {
    console.log('Connected to Logstash');
  }
});

app.use(express.json());

app.post('/log', async (req, res) => {
  try {
    const { index, data } = req.body;

    // Index the data in Elasticsearch
    const response = await client.index({
      index,
      body: data,
    });

    // Send the data to Logstash
    logstash.send(data, (error, response) => {
      if (error) {
        console.error('Error sending data to Logstash:', error);
      } else {
        console.log('Data sent to Logstash:', response);
      }
    });

    res.json({ message: 'Data sent to Elasticsearch and Logstash successfully', response });
  } catch (error) {
    console.error('Error sending data to Elasticsearch:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

require('./Schemas/collectionTask');
require('./Schemas/collectionProject');
require('./Schemas/collectionModule');
require('./Schemas/collectionUser');
require('./Schemas/collectionTeam');
require('./Schemas/Users');
app.use(express.json());
app.use(cors());
app.use(require('./routes/auth'));
app.use(require('./routes/gitlab'));
app.use(require('./routes/database'));
require("./authenticategoogle");
require("./authenticatelinkedIn");
app.use(passport.initialize());

const User = mongoose.model('User');

app.get("/auth/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  async (req, res) => {
    const profile = req.user;
    await delay(5000);
    User.findOne({ ID: profile.id }, async (err, resp) => {
      if (await resp.logged === "1") {
        res.redirect('http://localhost:3000/informationform');
      } else {
        res.redirect('http://localhost:3000/home/account');
      }
    })
  }
);

app.get("/linkedin", passport.authenticate('linkedin'));
app.get(
  '/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3000/login' }),
  async (req, res) => {
    const { error } = req.query;
    if (error === "user_cancelled_login") {
      console.log("cancelled");
    } else {
      const profile = req.user;
      await delay(5000);
      User.findOne({ ID: profile.id }, (err, resp) => {
        if (resp.logged === "1") {
          res.redirect('http://localhost:3000/informationform');
        } else {
          res.redirect('http://localhost:3000/home/account');
        }
      })
    }
  }
);

const delay = ms => new Promise(res => setTimeout(res, ms));

function setUserIDResponseCookie(req, res, next) {
  if (req.user?.id != req.cookies["myapp-userid"]) {
    if (req.user) {
      res.cookie("myapp-userid", req.user.id, {
        expires: new Date(253402300000000),
        httpOnly: false,
      });
    } else {
      res.clearCookie("myapp-userid");
    }
  }
  next();
}

app.post("/signout", (req, res) => {
  console.log();
});

app.listen(5030, () => {
  console.log("Server Started");
});
