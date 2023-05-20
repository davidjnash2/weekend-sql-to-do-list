console.log('clientjs ready!'); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#add-to-do').on('click', addTask);
  $('#list').on('click', '#delete-button', deleteTask);
  getTasks();
  // $('#list').on('click', '#yes-done-button', completeTask);
    // $('#list').on('click', '#not-done-button', ????uncompleteTask???); maybe in same function as complete?
  
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

// // function completeTask(){
//     console.log('in completeTask');
  
//     const idToUpdate = $(this).closest('tr').data('id');
  
//     let data = {
//       value: false 
//     }
  
//     $.ajax({
//       method: 'PUT',
//       url:`/tasks/${idToUpdate}`
//     }).then(function(response){
//       console.log('task complete updated', response);
//       getTasks();
//     }).catch(function(error){
//       console.log('error with PUT', error);
//     })
// } // end completeTask

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
  for (task of response){
    $('#list').append(`
    <tr data-id="${task.id}">
      <td>${task.task}</td>
      <td class="button"><button id="yes-done-button">DONEZO!</button><button id="not-done-button">NOT!</button></td>
      <td class="button"><button id="delete-button">DELETE!</button></td>
    </tr>
  `)};
} // end renderToDom function

// still need to update styling for completed tasks 
// ${task.complete}