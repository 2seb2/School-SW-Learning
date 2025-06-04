var express = require('express');

var router = express.Router();
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())

var dbconnect_module = require('./dbconnect_module');

router.post('/', (req, res, next) => {
    let type = req.query.type;
    if (type == 'list') {
        // 전체 목록 조회
        try {
            req.body.mapper = 'boardsMapper';
            req.body.crud = 'select';
            req.body.mapper_id = 'selectBoardList';
            next();
        } catch (error) {
            console.log('Module > dbconnect error : ' + error);
        }
    } else if (type == 'modify') {
        // 수정
        try {
            req.body.mapper = 'boardsMapper';
            req.body.crud = 'update';
            req.body.mapper_id = 'updateBoardInfo';
            next();
        } catch (error) {
            console.log('Module > update dbconnect error : ' + error);
        }
    } else if (type == 'save') {
        // 삽입
        try {
            req.body.mapper = 'boardsMapper';
            req.body.crud = 'insert';
            req.body.mapper_id = 'insertBoardInfo';
            next();
        } catch (error) {
            console.log('Module > insert dbconnect error : ' + error);
        }
    } else if (type == 'delete') {
        // 삭제
        try {
            req.body.mapper = 'boardsMapper';
            req.body.crud = 'delete';
            req.body.mapper_id = 'deleteBoardInfo';
            next();
        } catch (error) {
            console.log('Module > delete dbconnect error : ' + error);
        }
    }
}, dbconnect_module);

module.exports = router;