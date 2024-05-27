import db from "./SQLiteDatabse";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS agendamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, cliente TEXT, data TEXT, horario TEXT);"
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO agendamentos (cliente, data, horario) values (?, ?, ?);",
        [obj.cliente, obj.data, obj.horario],
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj));
        },
        (_, error) => reject(error)
      );
    });
  });
};

const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE agendamentos SET nome=?, data=?, horario=? WHERE id=?;",
        [obj.cliente, obj.data, obj.horario, id],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM agendamentos WHERE id=?;",
        [id],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const findByCliente = (numero) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM agendamentos WHERE nome LIKE ?;",
        [numero],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: nome = " + numero);
        },
        (_, error) => reject(error) 
      );
    });
  });
};

// const findByConcluded = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM notasFiscais WHERE concluded=true;",
//         [],
//         (_, { rows }) => resolve(rows._array),
//         (_, error) => reject(error) 
//       );
//     });
//   });
// };

// const findByNotConcluded = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         "SELECT * FROM notasFiscais WHERE concluded=false;",
//         [],
//         (_, { rows }) => resolve(rows._array),
//         (_, error) => reject(error) 
//       );
//     });
//   });
// };

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM agendamentos;",
        [],
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) 
      );
    });
  });
};

const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM agendamentos WHERE id=?;",
        [id],
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) 
      );
    });
  });
};

const deleteTable = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DROP TABLE agendamentos;', [],
        (tx, results) => {
          if (results && results.rows && results.rows._array) {
            /* do something with the items */
            // results.rows._array holds all the results.
            console.log(JSON.stringify(results.rows._array));
            console.log('table dropped')
          } else {
            console.log('no results')
          }
        },
        (tx, error) => {
          console.log(error);
        }
      )
    });
    });
}

export default {
  create,
  update,
  find,
  findByNumber,
  all,
  remove,
  findByConcluded,
  findByNotConcluded,
  deleteTable
};