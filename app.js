var express = require('express');
var moment = require('moment');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
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

