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

StorageEngine.prototype.load = function () {
    this.loadFromFile()
        .then((content) => {
            this.myState = JSON.parse(content);
            // console.log('Loaded');
        })
        .catch((err) => {
            console.trace(err);
        });
}

StorageEngine.prototype.loadFromFile = function () {
    return new Promise((resolve, reject) => {
        fs.readFile(this.filePath, { encoding: 'utf-8' }, (err, content) => {
            if (err)
                return reject(err);
            resolve(content);
        });
    });
}

StorageEngine.prototype.saveInFile = function (content) {
    return new Promise((resolve, reject) => {
        fs.writeFile(this.filePath, JSON.stringify(content), (err) => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

StorageEngine.prototype.save = function () {
    let inMemory = this.myState,
        inFile;
    this.loadFromFile()
        .then((content) => {
            inFile = JSON.parse(content);
            for (let i in inMemory) {
                inFile[i] = inMemory[i];
            }
            return this.saveInFile(inFile);
        })
        .catch((err) => {
            console.trace(err);
        });
}
