import SQLite from 'react-native-sqlite-storage';

export class BaseManager {
  constructor() {
    this.sqlite = SQLite;
    this.sqlite.DEBUG(true);
    this.sqlite.enablePromise(true);
  }

  createLockTable() {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql(
            'CREATE TABLE IF NOT EXISTS Locks (' +
              'id INTEGER PRIMARY KEY NOT NULL ,' +
              'lock TEXT, title TEXT);',
          )
            .then(val => {
              resolve(true);
            })
            .catch(err => {
              reject(false);
            });
        })
        .catch(err => {
          reject(false);
        });
    });
  }

  addLock(model) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql(
            'INSERT INTO Locks (lock,title) ' +
              `VALUES('${model.lock}','${model.title}')`,
          )
            .then(val => {
              console.info('val added');
              resolve(true);
            })
            .catch(err => {
              console.error('val not added', err);
              reject(false);
            });
        });
    });
  }

  updateLock(model) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql(
            'UPDATE Locks SET ' +
              `lock = '${model.lock}',
               title = '${model.title}' 
               where id = ${model.id};`,
          )
            .then(val => {
              resolve(true);
            })
            .catch(err => {
              reject(false);
            });
        });
    });
  }

  getLock() {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql('SELECT * FROM Locks')
            .then(([values]) => {
              var array = [];

              for (let index = 0; index < values.rows.length; index++) {
                const element = values.rows.item(index);
                array.push(element);
              }

              resolve(array);
            })
            .catch(err => {
              reject(false);
            });
        });
    });
  }

  getLockById(id) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql('SELECT * FROM Locks where id=' + id)
            .then(([values]) => {
              var array = [];

              for (let index = 0; index < values.rows.length; index++) {
                const element = values.rows.item(index);
                array.push(element);
              }

              if (array[0]) {
                resolve(array[0]);
              } else {
                reject(false);
              }
            })
            .catch(err => {
              reject(false);
            });
        });
    });
  }

  deleteLock(id) {
    return new Promise((resolve, reject) => {
      this.sqlite
        .openDatabase({
          name: 'easy-lock',
          location: 'default',
        })
        .then(db => {
          db.executeSql('DELETE FROM Locks where id=' + id)
            .then(val => {
              resolve(true);
            })
            .catch(err => {
              reject(false);
            });
        });
    });
  }
}
