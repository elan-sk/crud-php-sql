let edit = false

function fetchTasks() {
  $.ajax({
    url: 'task-list.php',
    type: 'GET',
    success: function(response){
      let tasks = JSON.parse(response)
      let template = ''

      tasks.forEach(task => {
        template += `
        <tr>
          <td>${task.id}</td>
          <td><a href="#" class="task-item" data-id="${task.id}">${task.name}</a></td>
          <td class="d-flex justify-content-between">
          ${task.description}
           <button class="task-delete btn btn-danger p-2" data-id="${task.id}">
              <i class="fas fa-trash-alt"></i>
           </button>
          </td>
        </tr>
        `
      });

      $('#tasks').html(template)
    }
  })
}

function searchTasks() {
  let search = $('#search').val();
  $.ajax({
    url: 'task-search.php',
    type: 'POST',
    data: { search },
    success: function (response) {
      let tasks = JSON.parse(response);
      let template = '';

      tasks.forEach(task => {
        template += `<li>${task.name}</li>`;
      });

      $('#task-result-content').html(template);
      $('#task-result').show();
    },
  });
}

function addTasks() {
  if ($('#name').val() == '' || $('#description').val() == '') {
    alert('Please fill in all fields')
    return
  }
  const postData = {
    name: $('#name').val(),
    description: $('#description').val(),
    id: $('#task-id').val()
  }

  let url = edit ? 'task-edit.php' : 'task-add.php'

  $.post(url, postData, function(response) {
    fetchTasks()
    console.log(response);
    $('#task-form').trigger('reset')
  })
}

function deleteTasks($element) {
  if (confirm('Are you sure you want to delete it?')) {
    let id = $element.data('id');
    $.post('task-delete.php', { id }, function (response) {
      fetchTasks();
      console.log(response);
    });
  }
}

function updateTasks($element) {
  let id = $element.data('id')

  $.post('task-single.php', { id }, function (response) {
    const task = JSON.parse(response);
    edit = true;

    $('#name').val(task.name);
    $('#description').val(task.description);
    $('#task-id').val(task.id);
  });
}

$(document).ready(function() {
  // Fetch tasks
  fetchTasks()
  $('#task-result').hide()

  // Search tasks
  $('#search').keyup(function(){
    if ($('#search').val()){
      searchTasks();
    }
  })

  // Add tasks
  $('#task-form').submit(function(e) {
    addTasks();
    e.preventDefault()
  })

  // Delete tasks
  $(document).on('click', '.task-delete', function(){
    deleteTasks($(this));
  })

  // Update tasks
  $(document).on('click', '.task-item', function(){
    updateTasks($(this));
  })
});


