var express = require('express');
var moment = require('moment');
var fs = require('fs');
var markdown = require('markdown').markdown;
var app = express();

app.get('/', function (req, res) {
  fs.readFile('README.md', function (err, data) {
    if (err) {
      return console.error(err);
    }
    res.send(markdown.toHTML(data.toString()));
  });
});

app.get('/:date', function (req, res) {
  var momentDate = moment(req.params.date, ['MMMM D, YYYY', 'X'], true);

  if (momentDate.isValid()) {
    res.json({
      unix: momentDate.unix(),
      natural: momentDate.format('MMMM D, YYYY')
    });
  } else {
    res.json({
      unix: null,
      natural: null
    });
  }
});

app.listen(8080, function () {
  console.log('Server running on 8080');
});
