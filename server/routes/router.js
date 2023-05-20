const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET
router.get('/',(req,res)=>{
    console.log('in server GET');
    let queryText = `SELECT * FROM "to_do_list";`;
    pool.query(queryText) 
    .then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('server GET error', error);
        res.sendStatus(500);
    })
});




// POST
router.post('/',(req,res)=>{
    console.log('in server POST');
    const newTask = req.body;
    console.log('req.body is', req.body);
     // santizining query text via - "parameterized query" (to prevent SQL injection)
    let queryText = `INSERT INTO "to_do_list"("task", "task_complete")
    VALUES ($1, $2);`;
    const queryValues = [newTask.task, newTask.complete];
    pool.query(queryText, queryValues)
    .then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('server POST error', error);
        res.sendStatus(500);
    })
});


// PUT
router.put('/:id', (req, res) => {
    console.log('in server PUT');
    let idToUpdate = req.params.id;
    console.log('idToUpdate', idToUpdate);
    let queryText = `UPDATE "to_do_list" SET "task_complete" = true WHERE "id" = $1;`;
    pool.query(queryText,[idToUpdate])
    .then((result) => {
        console.log('Task updated!', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('server PUT error', error);
        res.sendStatus(500);
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    console.log('in server DELETE');
    let idToDelete = req.params.id;
    let queryText = `DELETE FROM "to_do_list" WHERE "id" = $1;`;
    pool.query(queryText,[idToDelete])
    .then((result) => {
        console.log('Task deleted!', result.rows);
        res.sendStatus(200);
    })
    .catch((error) => {
        console.log('server DELETE error', error);
        res.sendStatus(500);
    })
})

module.exports = router;