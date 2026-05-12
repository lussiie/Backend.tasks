const EventEmitter = require('events');

class TaskManager extends EventEmitter {
  #completedTasks = 0;

  addTask(taskName) {
    console.log(`Task "${taskName}" added.`);

    this.emit('taskAdded', taskName);
  }

  completeTask(taskName) {
    this.#completedTasks++;

    this.emit(
      'taskCompleted',
      taskName,
      this.#completedTasks
    );
  }
}

module.exports = TaskManager;