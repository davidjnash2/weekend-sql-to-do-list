const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');


router.get('/',(req,res)=>{ // start GET 
    console.log('in server GET'); // log to test
    let queryText = `SELECT * FROM "to_do_list" ORDER BY "id" DESC;`; // declare variable for sql query to get all items, sorted in descending order by id
    pool.query(queryText) // send request through pg to database
    .then((result) => { // asynchronous response to send resulting rows from query
        console.log('result of server GET is:', result.rows); // log to test
        res.send(result.rows); // actually send result to server
    }) // end then
    .catch((error) => { // catch clause in case of error
        console.log('server GET error', error); // log error
        res.sendStatus(500); // send error message to client
    }) // end catch
}); // end GET





router.post('/',(req,res)=>{ // start POST 
    console.log('in server POST'); // log to test
    const newTask = req.body; // declare variable for data incoming from client-side
    console.log('req.body is', req.body); // log to test
    // queryText, sanitized via "parameterized query" so as to prevent sql injection
    let queryText = `INSERT INTO "to_do_list"("task", "task_complete")
    VALUES ($1, $2);`;
    const queryValues = [newTask.task, newTask.complete]; // assign values to oject data
    pool.query(queryText, queryValues) // submit sql query to database via pg
    .then((result) => { // asynchronous response to send success message
        res.sendStatus(201); // send success message to client
    }) // end then
    .catch((error) => { // catch clause in case of error
        console.log('server POST error', error); // log error
        res.sendStatus(500); // send error message to client
    }) // end catch
}); // end POST



router.put('/:id', (req, res) => { // start PUT 
    console.log('in server PUT'); // log to test
    let idToUpdate = req.params.id; // declare variable for item selected based on serialized id value
    console.log('idToUpdate', idToUpdate); // log to test
    // santized sql query text to update completed value on database table
    let queryText = `UPDATE "to_do_list" 
        SET "task_complete" = true 
        WHERE "id" = $1;`;
    pool.query(queryText,[idToUpdate]) // send request through pg to database
    .then((result) => { // asynchronous response to send success message
        console.log('Task updated!', result.rows); // log resulting rows to test
        res.sendStatus(200); // send success message to client
    }) // end then
    .catch((error) => { // catch clause in case of error
        console.log('server PUT error', error); // log error
        res.sendStatus(500); // send error message to client
    }) // end catch
}); // end PUT


router.delete('/:id', (req, res) => { // start DELETE 
    console.log('in server DELETE'); // log to test
    let idToDelete = req.params.id; // declare variable for item selected based on serialized id value
    let queryText = `DELETE FROM "to_do_list" WHERE "id" = $1;`;
    pool.query(queryText,[idToDelete]) // send request through pg to database
    .then((result) => { // asynchronous response to send success message
        console.log('Task deleted!', result.rows);
        res.sendStatus(200); // send success message to client
    }) // end then
    .catch((error) => { // catch clause in case of error
        console.log('server DELETE error', error); // log error
        res.sendStatus(500); // send error message to client
    }) // end catch
}) // end DELETE

module.exports = router;