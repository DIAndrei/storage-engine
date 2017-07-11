const StorageEngine = require('./lib/StorageEngine.js');

let storageEngine1 = new StorageEngine('./store/store.txt');

storageEngine1.set('nume', 'Gheorghe', true);
storageEngine1.set('adresa', 'Strada', false);
storageEngine1.set('email', 'gore@grigmail.com', true);
console.log(storageEngine1.get('nume'));
console.log(storageEngine1.get('adresa'));
console.log(storageEngine1.get('email'));
storageEngine1.set('test', 'QPWOEQKIWPQIPIP', true);
storageEngine1.set('adresa', 'str. Copacului', true);
storageEngine1.set('cheiecarenuexista', 'laskdj', true);
storageEngine1.set('asd', 'asd', false);

// storageEngine1.load();

storageEngine1.set('nume', 'Grigore', true);
storageEngine1.set('test3', 'pqowiepqwoeipqwoeipqowei', true);

storageEngine1.save();
