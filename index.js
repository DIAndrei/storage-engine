'use strict';

const fs = require('fs');

function StorageEngine(filePath) {
    this.myState = {};
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
    if (content) {
        this.myState = JSON.parse(content);
    }
    else {
        console.log('Invalid or no file content');
        return;
    }
}

StorageEngine.prototype.save = function (callback) {
    var inMemory = this.myState,
        inFile,
        self = this;

    fs.readFile(this.filePath, { encoding: 'utf-8' }, function (err, content) {
        if (content) {
            inFile = JSON.parse(content);
        }
        else {
            console.log('Invalid or no file content');
            return;
        }

        for (var i in inMemory) {
            inFile[i] = inMemory[i];
        }

        // console.log(inMemory, inFile);

        fs.writeFile(self.filePath, JSON.stringify(inFile), function (err) {
            if (err) {
                return callback(err);
            }
            callback();
        });

    });

}

function myCallback(err) {
    if (err) {
        return console.trace(err);
    }
}

var storageEngine1 = new StorageEngine('./store/store.txt');

storageEngine1.set('nume', 'Gheorghe', true);
storageEngine1.set('adresa', 'Strada', false);
storageEngine1.set('email', 'gheo@gheo.com', true);
// console.log(storageEngine1.get('nume'));
// console.log(storageEngine1.get('adresa'));
// console.log(storageEngine1.get('email'));
storageEngine1.set('test', 'QPWOEQKIWPQIPIP', true);
storageEngine1.set('adresa', 'str. Copacului', true);
storageEngine1.set('cheiecarenuexista', 'laskdj', true);
storageEngine1.set('asd', 'asd', false);
// storageEngine1.load(myCallback);

storageEngine1.save(myCallback);



// setTimeout(function () {
//     console.log(storageEngine1.get('email'));
// }, 1000);
