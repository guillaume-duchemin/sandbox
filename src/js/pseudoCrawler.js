const util = require('util');
const Crawler = require("crawler");

//start of id to crawler
let counter = 220000;
let url = [];
let result = [];
//end of id to crawl
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

let i = limit + 1;
let counterLimit = counter;

while(i-- && i >= counterLimit) {
    url = [...url, `http://www.hammerfest.fr/user.html/${i}`];
    if (i % 10 === 0) {
        c.queue(url);
        url = [];
    }

    if (i === counterLimit) {
        c.queue(url);
    }
}

c.queue(url);
