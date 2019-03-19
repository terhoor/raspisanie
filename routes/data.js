const express = require('express');
const controller = require('../controllers/data');

const router = express.Router();

router.get('/groups', controller.getGroups);
router.get('/timeLesson', controller.getTimeLesson);
router.get('/subjects', controller.getSubjects);
router.get('/group/:id', controller.getGroupId);
router.get('/group-delete/:id', controller.deleteGroup);
router.post('/group-create', controller.createGroup);
router.post('/group-change',  controller.changeGroup);


module.exports = router;