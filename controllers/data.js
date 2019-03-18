const errorHandler = require('../utils/errorHandler');
const db = require('../shared/db.json');
const fs = require('fs');

module.exports.getGroups = function (req, res) {
  try {
    const groups = db['groups'];
    res.status(200).json(groups);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getSubjects = function (req, res) {
  try {
    const subjects = db['subjects'];
    res.status(200).json(subjects);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getTimeLesson = function (req, res) {
  try {
    const timeLesson = db['timeLesson'];
    res.status(200).json(timeLesson);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getGroupId = async function (req, res) {
  try {
    const id = req.params.id;
    const group = await function () {
      const groups = db['groups'];
      return groups.find((group) => {
        if (group.id.toString() === id) {
          return true;
        }
        return false;
      })
    }();

    res.status(200).json(group);
  } catch (e) {
    errorHandler(res, e);
  }
}


module.exports.createGroup = async function (req, res) {
  try {

    let newDb = db;
    let group = req.body;

    const arrayGroups = [...newDb['groups']];
    let maxId = arrayGroups.reduce((id, elem) => {
      if (elem.id > id) {
        return elem.id;
      }
      return id;
    }, 0);

    group.id = ++maxId;

    newDb['groups'].push(group);

    const dataW = JSON.stringify(newDb);

    fs.writeFile('shared/db.json', dataW, function (error) {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    });


    res.status(200).json(group);
  } catch (e) {
    errorHandler(res, e);
  }
}


module.exports.changeGroup = async function (req, res) {
  try {
    let newDb = db;
    let group = req.body;

    newDb['groups'].forEach((groupF, i) => {
      if (+groupF.id === +group.id) {
        // newDb['groups'].splice(i, 1);
        groupF = group;
        // newDb['groups'].push(group);
      };
    })

    const dataW = JSON.stringify(newDb);
    // запись в файл
    fs.writeFile('shared/db.json', dataW, function (error) {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    });

    res.status(200).json();
  } catch (e) {
    errorHandler(res, e);
  }
}


module.exports.deleteGroup = async function (req, res) {
  try {
    let newDb = db;
    const id = req.params.id;
    newDb['groups'].forEach((group, idx) => {
      if (group.id === +id) {
        newDb['groups'].splice(idx, 1);
      }
    });
    const dataW = JSON.stringify(newDb);
    console.log(dataW);
    fs.writeFile('shared/db.json', dataW, function (error) {
      if (error) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    });


    res.status(200).json("sss");
  } catch (e) {
    errorHandler(res, e);
  }
}