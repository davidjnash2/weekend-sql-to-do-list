console.log('clientjs ready!'); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#add-to-do').on('click', addTask);
  // $('').on('click', '#complete-button', completeTask);
  // $('').on('click', '#delete-button', deleteTask);
  getTasks();
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
  console.log(response);
  $('#to-do-display').empty();
  for (thing of response){
    $('#to-do-display').append(`
    <tr data-id="${thing.id}>
      <td>${thing.task}</td>
      <td>${thing.complete}</td>
      <td><button id="is-it-done">COMPLETE!</button></td>
      <td><button id="delete">DELETE!</button></td>
    </tr>
  `)};
}

