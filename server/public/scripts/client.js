console.log('clientjs ready!'); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#add-to-do').on('click', addTask);
  getTasks();
  // $('').on('click', '#complete-button', completeTask);
  // $('').on('click', '#delete-button', deleteTask);
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

// function completeTask(){

// } // end completeTask

// function deleteTask(){

// } // end deleteTask

function renderToDom(response){
  console.log('response from database is:', response);
  $('#list').empty();
  for (task of response){
    $('#list').append(`
    <tr data-id="${task.id}">
      <td>${task.task}</td>
      <td class="button"><button id="yes-done">DONEZO!</button><button id="not-done">NOT!</button></td>
      <td class="button"><button id="delete">DELETE!</button></td>
    </tr>
  `)};
} // end renderToDom function

// still need to update styling for completed tasks 
// ${task.complete}