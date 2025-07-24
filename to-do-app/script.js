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
    
   
});