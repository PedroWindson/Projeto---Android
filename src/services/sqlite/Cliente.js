import db from "./SQLiteDatabse";

db.transaction((tx) => {
  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS clientes (id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT(255), endereco TEXT, telefone TEXT, email TEXT, dataDeNascimento TEXT, hipertensao TEXT, hipertensaoObs TEXT, bairro TEXT, diabetes TEXT, diabetesObs TEXT, tireoide TEXT, tireoideObs TEXT, cancer TEXT, cancerObs TEXT, alteracoesCardiacas TEXT, epilepsiaConvulsoes TEXT, intestinoRegulado TEXT, marcaPasso TEXT, tabagista TEXT, gestante TEXT );"
  );
});

const create = (obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO clientes (nome, endereco, telefone, email, dataDeNascimento, hipertensao, hipertensaoObs, diabetes, diabetesObs, tireoide, tireoideObs, cancer, cancerObs, alteracoesCardiacas, epilepsiaConvulsoes, intestinoRegulado, marcaPasso, tabagista, gestante) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ? );",
        [obj.nome, obj.endereco, obj.telefone, obj.email, obj.dataDeNascimento, obj.hipertensao, obj.hipertensaoObs, obj.diabetes, obj.diabetesObs, obj.tireoide, obj.tireoideObs, obj.cancer, obj.cancerObs, obj.alteracoesCardiacas, obj.epilepsiaConvulsoes, obj.intestinoRegulado, obj.marcaPasso, obj.tabagista, obj.gestante],
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
        "UPDATE clientes SET nome=? , endereco=? , telefone=? , email=? , dataDeNascimento=? , hipertensao=? , hipertensaoObs=? , diabetes=? , diabetesObs=? , tireoide=? , tireoideObs=? , cancer=? , cancerObs=? , alteracoesCardiacas=? , epilepsiaConvulsoes=? , intestinoRegulado=? , marcaPasso=? , tabagista=? , gestante=? WHERE id=?;",
        [obj.nome, obj.endereco, obj.telefone, obj.email, obj.dataDeNascimento, obj.hipertensao, obj.hipertensaoObs, obj.diabetes, obj.diabetesObs, obj.tireoide, obj.tireoideObs, obj.cancer, obj.cancerObs, obj.alteracoesCardiacas, obj.epilepsiaConvulsoes, obj.intestinoRegulado, obj.marcaPasso, obj.tabagista, obj.gestante, id],
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
        "SELECT * FROM clientes WHERE id=?;",
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

const findByName = (nome) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM clientes WHERE nome LIKE ?;",
        [nome],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: Nome:" + nome);
        },
        (_, error) => reject(error) 
      );
    });
  });
};

const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM clientes;",
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
        "DELETE FROM clientes WHERE id=?;",
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
        'DROP TABLE clientes;', [],
        (tx, results) => {
          if (results && results.rows && results.rows._array) {
            /* do something with the items */
            // results.rows._array holds all the results.
            console.log(JSON.stringify(results.rows._array));
            console.log('table ')
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
  findByName,
  all,
  remove,
  deleteTable
};