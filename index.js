'use strict';

const fs = require('fs');

function StorageEngine(filePath) {
    this.myState = {};
    this.fileState = {};
    this.filePath = filePath;
}

StorageEngine.prototype.set = function (myKey, myValue, persistent) {
    Object.defineProperty(this.myState, myKey, {
        value: myValue,
        enumerable: persistent,
        writable: true,
        configurable: true
    });
}

StorageEngine.prototype.get = function (myKey) {
    return this.myState[myKey];
}

StorageEngine.prototype.load = function (callback) {
    fs.readFile(this.filePath, { encoding: 'utf-8' }, this.loadFromString.bind(this));
}

StorageEngine.prototype.loadFromString = function (err, content) {
    if (err) {
        return myCallback(err);
    }
    this.myState = JSON.parse(content);
    this.fileState = JSON.parse(content);
    // console.log(this.myState, this.fileState);
}

StorageEngine.prototype.save = function (callback) {
    var inMemory = this.myState,
        inFile = this.fileState,
        toWrite = {};

    // TODO: When calling save method, load method MUST be called first, to load everything from file in memory.

        for(var i in inMemory) {
        if (inFile.hasOwnProperty(i)) {
            toWrite[i] = inMemory[i];
            console.log(inFile[i], inMemory[i]);
        }
        else {
            toWrite[i] = inMemory[i];
        }
    }

    console.log(inMemory, inFile, toWrite);

    fs.writeFile(this.filePath, JSON.stringify(toWrite), function (err) {
        if (err) {
            return callback(err);
        }
        callback();
    });
}

function myCallback(err) {
    if (err) {
        return console.trace(err);
    }
}

var storageEngine1 = new StorageEngine('./store/store.txt');

storageEngine1.set('addddsd', 'dsa', true);
storageEngine1.set('rtt', 'QUE?', false);

// console.log(storageEngine1.get('addddsd'));
// console.log(storageEngine1.get('rtt'));
// console.log(storageEngine1.get('addddsd'));

storageEngine1.set('rtt', 'WEQWEQWE', true);

// storageEngine1.load(myCallback);

storageEngine1.save(myCallback);



// setTimeout(function () {
//     console.log(storageEngine1.get('asdasdasd'));
// }, 1000);
