'use strict';

const express = require('express');
const dns = require('dns'),
      dnscache = require('dnscache')({
          "enable" : true,
          "ttl" : 300,
          "cachesize" : 1000
          });
const morgan = require('morgan')

// Constants
const PORT = 8080;

// App
const app = express();


app.disable('x-powered-by');
app.use(express.static('public'));
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method http://:req[host]:url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" ":res[location]"'))

app.use(function (req, res) {
  var location = '';
  dns.resolveTxt(req.hostname, function(err, rec) {
      if (err) {
        console.log('Error in resolve\n');
        var rec = '';
      }
      if (rec.toString().indexOf('redirect=')>-1) {
        // Redirect exists for this domain
        rec.forEach(function(a) {
          var arr = a.toString().split("=");
          if (arr[0]=="redirect") {
            location=a.toString().replace(/^redirect=/,'');
            res.redirect(301, location);
          }
        });
      } else {
        var arr = req.hostname.split(".")
        if (arr[0]=="www") {
          res.sendFile(__dirname + '/index.html');
        } else {
          res.redirect(301, req.protocol + '://www.' + req.hostname + req.path);
        }
      }
  });
});

app.listen(PORT);
