/*
    https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters/34483399


    https://attacomsian.com/blog/nodejs-write-json-object-to-file

*/
const fs = require('fs');


class StringIdGenerator {
    // chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    constructor(chars = 'abcdefghijklmnopqrstuvwxyz') {
        this._chars = chars;
        this._nextId = [0];
    }

    next() {
        const r = [];
        for (const char of this._nextId) {
            r.unshift(this._chars[char]);
        }
        this._increment();
        return r.join('');
    }

    _increment() {
        for (let i = 0; i < this._nextId.length; i++) {
            const val = ++this._nextId[i];
            if (val >= this._chars.length) {
                this._nextId[i] = 0;
            } else {
                return;
            }
        }
        this._nextId.push(0);
    }

    *[Symbol.iterator]() {
        while (true) {
            yield this.next();
        }
    }
}

const ids = new StringIdGenerator();

function convertToMyForm(userstring) {
    const myChangeKeys = {
        'a': 'z',
        'b': 'i',
        'c': 'x',
        'd': 'e',
        'e': 'd',
        'f': 'j',
        'g': 'q',
        'h': 'm',
        'i': 'u',
        'j': 'w',
        'k': 'l',
        'l': 'a',
        'm': 'b',
        'n': 's',
        'o': 'c',
        'p': 't',
        'q': 'o',
        'r': 'n',
        's': 'v',
        't': 'h',
        'u': 'y',
        'v': 'r',
        'w': 'f',
        'x': 'g',
        'y': 'p',
        'z': 'k',
    };
    // console.log(myChangeKeys['a']);
    let newstring = '';
    for(i=0;i<userstring.length;i++)
    {
        // userstring[i] = myChangeKeys[userstring[i]];
        newstring +=myChangeKeys[userstring[i]];
    }
    return newstring;
}

console.log(convertToMyForm("siddhant"));
for (x = 1; x <= 100; x++) {
    console.log(ids.next());
}

console.log(ids.next());
console.log(ids._nextId);




const us = JSON.stringify(ids._nextId);
fs.writeFile('mydata.json',us,(err)=>{
    if(err) {
        console.log("Not Saved");
        return;
    }
    console.log("JSON Saved");
});

fs.readFile('mydata.json', 'utf-8', (err, data) => {
    if (err) {
        throw err;
    }

    // parse JSON object
    const user = JSON.parse(data.toString());

    // print JSON object
    console.log(user);
});


console.log(fs.existsSync('mydata.json'));