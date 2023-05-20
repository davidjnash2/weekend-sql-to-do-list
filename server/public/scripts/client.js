console.log('clientjs ready!'); // log to test

$(document).ready(onReady);

function onReady(){
  console.log('sir, your jQuery has arrived, sir'); // log to test
  $('#submit-button').on('click', addTask);
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
  .then((response) => {
    console.log('response is', response);
    $('#to-do-input').val('');
  })
  .catch((error) => {
    console.log('error with POST', error);
  })
} // end addTask function

function getTasks(event){
  event.preventDefault();
  console.log('in getTasks');
 $.ajax({
    method: 'GET',
    url: '/tasks',
  })
  .then((response) => {
    console.log('response is', response);
    renderToDom(response);
  })
  .catch((error) => {
    console.log('error with GET', error);
  });
} // end getTasks function

// function completeTask(){

// } // end completeTask

// function deleteTask(){

// } // end deleteTask

function renderToDom(tasks){
 $('#to-do-display').empty();
 for (task of tasks){`
  <tr data-id="${task.id}>
    <td>${task.task}</td>
    <td>${task.complete}</td>
  </tr>
 `}
}

