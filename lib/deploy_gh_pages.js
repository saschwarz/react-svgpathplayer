'use strict';

require('babel/register');

var ghpages = require('gh-pages');

var config = require('../webpack.config.babel');

main();

function main() {
  ghpages.publish(config.output.path,
                  // needed when running on travis-ci
                  {
                      user: {
                          name: 'Steve Schwarz',
                          email: 'steve@agilitynerd.com'
                      }
                  },
                  console.error.bind(console));
}
