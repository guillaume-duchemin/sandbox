const util = require('util');
const Crawler = require("crawler");

let counter = 99999;
let url = [];
let result = [];
let limit = 1000000;

const c = new Crawler({
    rateLimit: 100,
    maxConnections: 10,
    callback: (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`connected to http://www.hammerfest.fr/user.html/${counter}`);

            const $ = res.$;
            const pseudo = $('.profile > dd').eq(0).text().toLowerCase();

            if (pseudo.indexOf('n3o7okyo') > -1 || pseudo.indexOf('taku') > -1 || pseudo.indexOf('joyau') > -1 || pseudo.indexOf('itachi') > -1) {
                result = [pseudo, ...result];
            }

            counter++;
            console.log(pseudo);
            if (counter > limit ) {
                process.stdout.write('\x1B[2J\x1B[0f');
                console.log(util.inspect(result, {maxArrayLength: null}));
            }
        }
        done();
    }
});

let i = limit;

while(i--) {
    url = [...url, `http://www.hammerfest.fr/user.html/${i}`];
    if (i % 10 === 0) {
        c.queue(url);
        url = [];
    }
}
