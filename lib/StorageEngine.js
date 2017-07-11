'use strict';

const fs = require('fs');

module.exports = StorageEngine;

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
        console.trace('Invalid or no file content');
        return;
    }
}

StorageEngine.prototype.save = function (callback) {
    let inMemory = this.myState,
        inFile,
        self = this;

    fs.readFile(this.filePath, { encoding: 'utf-8' }, function (err, content) {
        if (content) {
            inFile = JSON.parse(content);
        }
        else {
            console.trace('Invalid or no file content');
            return;
        }

        for (let i in inMemory) {
            inFile[i] = inMemory[i];
        }

        fs.writeFile(self.filePath, JSON.stringify(inFile), function (err) {
            if (err) {
                return callback(err);
            }
            callback();
        });

    });

}
