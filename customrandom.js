/*
    https://stackoverflow.com/questions/12504042/what-is-a-method-that-can-be-used-to-increment-letters/34483399


    https://attacomsian.com/blog/nodejs-write-json-object-to-file

*/
const fs = require('fs');

const myfile = 'mycounter.json';

class StringIdGenerator {
    // chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    constructor(chars = 'abcdefghijklmnopqrstuvwxyz') {
        this._chars = chars;
        this._nextId = [0];
        try {
            if(fs.existsSync(myfile))
            {
                const dat = fs.readFileSync(myfile,'utf-8');
                const currentID = JSON.parse(dat.toString());
                this._nextId = currentID;                
            }
        } catch (error) {
            console.log("Error Occured");
        }

    }

    next() {
        const r = [];
        for (const char of this._nextId) {
            r.unshift(this._chars[char]);
        }
        this._increment();

        try {
            const usr = JSON.stringify(this._nextId);
            fs.writeFileSync(myfile,usr);
        } catch (error) {
            console.log('error while saving..');
        }
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
    let newstring = '';
    for(i=0;i<userstring.length;i++)
    {
        newstring +=myChangeKeys[userstring[i]];
    }
    return newstring;
}

function stringreverse(s){
    return s.split("").reverse().join("");
}

const ids = new StringIdGenerator();

for (x = 1; x <= 5; x++) {
    let mys = ids.next();
    
    mys = convertToMyForm(mys);
    mys = stringreverse(mys);
    console.log(mys);
}
