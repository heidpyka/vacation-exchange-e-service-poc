const express = require("express"); // Use the express module
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes/api");
const path = require("path");
const passport = require("passport");
const LdapStrategy = require("passport-ldapauth");
require("dotenv").config();

// Create an object of the express module
const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
// useNewUrlParser & useFindAndModify = deprecation purposes
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`Database connected successfully`))
  .catch((err) => console.log(err));

// Mongoose promise is depreciated, override it with node's promise
mongoose.Promise = global.Promise;

// Helps handle CORS related issues when accessing api from different domains
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next(); // pass control to the next handler i.e. the one below
});

app.use(bodyParser.json());

app.use("/api", routes);

app.use((err, req, res, next) => {
  console.log(err);
  next();
});

/*
// The 'res' parameter is used to send content back to the web page.
app.use((req, res, next) => {
  res.send("Welcome to Express"); // Send 'Welcome to Express' response.
});
*/
app.use(passport.initialize());

passport.use(
  new LdapStrategy({
    server: {
      url: process.env.LDAP_URL,
      bindDN: process.env.LDAP_BIND_DN,
      bindCredentials: process.env.LDAP_BIND_PASS,
      searchBase: process.env.LDAP_SEARCH_BASE,
      searchFilter: "uid={{username}}",
      searchAttributes: ["isMemberOf", "manager", "dn"],
    },
  })
);

// Make the server listen on port 5000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
