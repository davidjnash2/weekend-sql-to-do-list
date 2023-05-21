console.log('clientjs ready!'); // log to test

$(document).ready(onReady); // load on page open

function onReady(){ // start onReady
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#add-to-do').on('click', addTask); // event listener for add button
  $('#list').on('click', '#delete-button', deleteTask); // event listener via event delegation for delete button
  $('#list').on('click', '#yes-done-button', completeTask); // event listener via event delegation for complete button
  getTasks(); // run get tasks on load to populate DOM with existing data from database
} // end onReady function

function addTask(event){ // start addTask event handler
  event.preventDefault(); // prevent browswer default on button click
  console.log('in addTask'); // log to test
  let newTask = { // declare object to be sent to server
    task: $('#to-do-input').val(), // capture client input for task name
    complete: false // set default completion value to false
  }; // end object
  $.ajax({ // start ajax call
    method: 'POST', // POST method
    url: '/tasks', // going to this url
    data: newTask // adding object variable for data being sent
  }) // end ajax call
  .then(function(response){ // asynchronous response to pause for response from server
    console.log('addTask response is', response); // log to test
    $('#to-do-input').val(''); // clear input field
    getTasks(); // run getTasks function to update DOM reflecting new addition
  }) // end then
  .catch(function(error){ // catch clause for error
    console.log('error with POST', error); // log error to console
  }) // end catch
} // end addTask function

function getTasks(){ // start getTasks event handler
  console.log('in getTasks'); // log to test
  $.ajax({ // start ajax call
    method: 'GET', // GET method
    url: '/tasks' // going to this url
  }) // end ajax call
  .then(function(response){ // asynchronous response to pause for response from server
    console.log('getTasks response is', response); // log to test
    renderToDom(response); // call renderToDom function to populate DOM with current state
  }) // end then
  .catch(function(error){ // catch clause for error
    console.log('error with GET', error); // log to test
  }); // end catch
} // end getTasks function


function completeTask(){ // start completeTask event handler
    console.log('in completeTask'); // log to test
    const idToUpdate = $(this).closest('tr').data('id'); // declare variable using captured data id value of clicked table row
    $.ajax({ // start ajax call
      method: 'PUT', // PUT method
      url:`/tasks/${idToUpdate}`, // going to this url
      data: {
        complete: true 
      } // assign new object complete value to true
    }) // end ajax call
    .then(function(response){ // asynchronous response to pause for response from server
      console.log('PUT task as complete', response); // log to test
      getTasks(); // run getTasks function to update DOM
    }) // end then
    .catch(function(error){ // catch clause for error
      console.log('error with PUT', error); // log to test
    }) // end catch
} // end completeTask


function deleteTask(){ // start deleteTask event handler
    console.log('in deleteTask'); // log to test
    const idToDelete = $(this).closest('tr').data('id'); // declare variable using captured data id value of clicked table row
    $.ajax({ // start ajax call
      method: 'DELETE', // DELETE method
      url:`/tasks/${idToDelete}` // going to this url
    }) // end ajax call
    .then(function(response){ // asynchronous response to pause for response from server
      console.log('deleteTask response is:', response); // log to test
      getTasks(); // run getTasks function to update DOM
    }) // end then
    .catch(function(error){ // catch clause for error
      console.log('error with DELETE', error); // log to test
    }) // end catch
} // end deleteTask

function renderToDom(response){ // start render function
  console.log('response from database is:', response); // log to test
  $('#list').empty(); // empty field prior to re-populating
  for (let i = 0; i < response.length; i++){ // loop through returning data array
    let task = response[i]; // declare variable for current index value
    let rowNumber = i + 1; // assign row number based on index value plus one, which will keep row numbers dynamic
    let field = task.task_complete ? 'task_complete' : 'task_incomplete'; // declare variable to capture whether task_completed value is true or false, and assign corresponding value
    // below, append DOM with table data, including dynamic buttons and returning info
    $('#list').append(`
      <tr  data-id="${task.id}">
        <td id="row-number">${rowNumber}.</td>
        <td class="${field}" id="task-text">${task.task}</td>
        <td class="button"><button id="yes-done-button">DONEZO!</button></td>
        <td class="button"><button id="delete-button">DELETE!</button></td>
      </tr>
  `)}; // end append
} // end renderToDom function

