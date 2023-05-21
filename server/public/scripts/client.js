console.log('clientjs ready!'); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#add-to-do').on('click', addTask);
  $('#list').on('click', '#delete-button', deleteTask);
  getTasks();
  $('#list').on('click', '#yes-done-button', completeTask);
}

function addTask(event){
  event.preventDefault();
  console.log('in addTask');
  let newTask = {
    task: $('#to-do-input').val(),
    complete: false
  };
  $.ajax({
    method: 'POST',
    url: '/tasks',
    data: newTask
  })
  .then(function(response){
    console.log('addTask response is', response);
    $('#to-do-input').val('');
    getTasks();
  })
  .catch(function(error){
    console.log('error with POST', error);
  })
} // end addTask function

function getTasks(){
  console.log('in getTasks');
  $.ajax({
    method: 'GET',
    url: '/tasks'
  })
  .then(function(response){
    console.log('getTasks response is', response);
    renderToDom(response);
  })
  .catch(function(error){
    console.log('error with GET', error);
  });
} // end getTasks function


function completeTask(){
    console.log('in completeTask');
    const idToUpdate = $(this).closest('tr').data('id');
    $.ajax({
      method: 'PUT',
      url:`/tasks/${idToUpdate}`,
      data: {
        complete: true 
      }
    }).then(function(response){
      console.log('PUT task as complete', response);
      getTasks();
    }).catch(function(error){
      console.log('error with PUT', error);
    })
} // end completeTask


function deleteTask(){
    console.log('in deleteTask');
    const idToDelete = $(this).closest('tr').data('id');
    $.ajax({
      method: 'DELETE',
      url:`/tasks/${idToDelete}`
    }).then(function(response){
      console.log('deleteTask response is:', response);
      getTasks();
    }).catch(function(error){
      console.log('error with DELETE', error);
    })
} // end deleteTask

function renderToDom(response){
  console.log('response from database is:', response);
  $('#list').empty();
  for (let i = 0; i < response.length; i++){
    let task = response[i];
    let rowNumber = i + 1;
    $('#list').append(`
      <tr  data-id="${task.id}">
        <td id="row-number">${rowNumber}.</td>
        <td class="completed-task" id="task-text">${task.task}</td>
        <td class="button"><button id="yes-done-button">DONEZO!</button></td>
        <td class="button"><button id="delete-button">DELETE!</button></td>
      </tr>
  `)};
} // end renderToDom function

// still need to update styling for completed tasks 
// ${task.complete}
// maybe add if conditional to render, showing change based on true or false value
// check color swap game and fungus game for inspo