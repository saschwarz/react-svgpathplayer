'use strict';

require('babel/register');

var ghpages = require('gh-pages');

var config = require('../webpack.config.babel');

main();

function main() {
  ghpages.publish(config.output.path,
                  // needed when running on travis-ci
                  {
                      repo: 'https://' + process.env.GH_TOKEN + '@' + process.env.GH_REF,
                      user: {
                          name: 'Steve Schwarz',
                          email: 'steve@agilitynerd.com'
                      }
                  },
                  console.error.bind(console));
}
