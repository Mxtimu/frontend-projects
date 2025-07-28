// Wait for DOM to load before executing
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    const taskCount = document.getElementById('taskCount');
    
    // Array to store tasks
    let tasks = [];
    
    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        
        if (taskText !== '') {
            // Create new task object
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            
            // Add to tasks array
            tasks.push(task);
            
            // Clear input field
            taskInput.value = '';
            
            // Render tasks
            renderTasks();
            
            // Update task count
            updateTaskCount();
        }
    }
    
    // this function is to render all tasks
    function renderTasks() {
        // Clear current task list
        taskList.innerHTML = '';
        
        // Add each task to the list
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) {
                taskItem.classList.add('completed');
            }
            
            // Create task HTML
            taskItem.innerHTML = `
                <input type="checkbox" class="complete-checkbox" ${task.completed ? 'checked' : ''} data-id="${task.id}">
                <span class="task-text">${task.text}</span>
                <button class="task-btn complete-btn" data-id="${task.id}">✓</button>
                <button class="task-btn delete-btn" data-id="${task.id}">✕</button>
            `;
            
            // Add to task list
            taskList.appendChild(taskItem);
        });
    }

    // Function to update task count
    function updateTaskCount() {
        const remainingTasks = tasks.filter(task => !task.completed).length;
        taskCount.textContent = remainingTasks;
    }
    
    // Function to toggle task completion
    function toggleTaskCompletion(taskId) {
        tasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        
        renderTasks();
        updateTaskCount();
    }

    // Function to delete a task
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        updateTaskCount();
    }
    
    // Event listeners
    
    // Add task when button is clicked
    addTaskBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Handle clicks on task list (event delegation)
    taskList.addEventListener('click', function(e) {
        // Complete task
        if (e.target.classList.contains('complete-btn') || e.target.classList.contains('complete-checkbox')) {
            const taskId = parseInt(e.target.getAttribute('data-id'));
            toggleTaskCompletion(taskId);
        }
         // Delete task
        if (e.target.classList.contains('delete-btn')) {
            const taskId = parseInt(e.target.getAttribute('data-id'));
            deleteTask(taskId);
        }
    });
    
    // Initialize
    updateTaskCount();
        
});