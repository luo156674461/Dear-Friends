'use strict';

var pkg = require('../package.json');

var date = {
  day: new Date().getDate(),
  month: 'January February March April May June July August September October November December'.split(' ')[new Date().getMonth()],
  year: new Date().getFullYear()
};

module.exports = ('\n/**\n * Swiper ' + pkg.version + '\n * ' + pkg.description + '\n * ' + pkg.homepage + '\n *\n * Copyright 2014-' + date.year + ' ' + pkg.author + '\n *\n * Released under the ' + pkg.license + ' License\n *\n * Released on: ' + date.month + ' ' + date.day + ', ' + date.year + '\n */\n').trim() + '\n';