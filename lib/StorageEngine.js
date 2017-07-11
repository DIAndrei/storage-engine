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
    let self = this;
    this.loadFromFile()
        .then(function (content) {
            self.myState = JSON.parse(content);
        })
        .catch(function (err) {
            console.trace(err);
        });
}

StorageEngine.prototype.loadFromFile = function () {
    let self = this;
    return new Promise(function (resolve, reject) {
        fs.readFile(self.filePath, { encoding: 'utf-8' }, (err, content) => {
            if (err)
                return reject(err);
            resolve(content);
        });
    });
}

StorageEngine.prototype.saveInFile = function (content) {
    let self = this;
    return new Promise(function (resolve, reject) {
        fs.writeFile(self.filePath, JSON.stringify(content), function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

StorageEngine.prototype.save = function () {
    let inMemory = this.myState,
        inFile,
        self = this;
    this.loadFromFile()
        .then(function (content) {
            inFile = JSON.parse(content);
            for (let i in inMemory) {
                inFile[i] = inMemory[i];
            }
            self.saveInFile(inFile)
                .then(function () {
                    // console.log('Saved!');
                })
                .catch(function (err) {
                    console.trace(err);
                });
        })
        .catch(function (err) {
            console.trace(err);
        });
}
