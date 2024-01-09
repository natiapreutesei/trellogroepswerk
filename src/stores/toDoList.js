
import { defineStore } from 'pinia';

function generateUniqueId() {
  const date = new Date();
  return date.getTime().toString();
}

export const useToDoListStore = defineStore('todoList', {
  state: () => ({
    appLists: [],
  }),
  actions: {
    deleteList(listId) {
      this.appLists = this.appLists.filter(list => list.id !== listId);
    },
    addList(listName) {
      const uniqueId = generateUniqueId();
      this.appLists.push({
        id: uniqueId,
        name: listName,
        tasks: []
      });
    },
    addToDo(listId, item) {
      const uniqueId = generateUniqueId();
      console.log('Generated uniqueId:', uniqueId); // Log the generated uniqueId
      
      const list = this.appLists.find(l => l.id === listId);
      console.log('Found list:', list); // Log the found list
      
      if (list) {
        const newTask = {
          item: item,
          id: uniqueId,
          completed: false
        };
        console.log('New task:', newTask); // Log the new task before adding it to the list
        
        list.tasks.unshift(newTask);
        
        console.log('Updated list:', list); // Log the updated list
      }
    },
    deleteToDo(listId, itemId) {
      const list = this.appLists.find(l => l.id === listId);
      const task = list?.tasks.find(task => task.id === itemId);
      if (task) {
        task.completed = !task.completed;
      }
      return list ? list.tasks : [];
    },

    toggleCompleted(listId, itemId) {
      const list = this.appLists.find(l => l.id === listId);
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== itemId);
      }
      return list ? list.tasks : [];
    },
    moveTask(fromListId, toListId, taskId) {
      // Log the attempt to move a task. Useful for debugging.
      console.log(`Attempting to move task with ID ${taskId} from list ${fromListId} to list ${toListId}`);

      // Find the list from which the task is being moved.
      const fromList = this.appLists.find(list => list.id === fromListId);

      // Find the list to which the task is being moved.
      const toList = this.appLists.find(list => list.id === toListId);

      // Find the index of the task in the original list.
      const taskIndex = fromList?.tasks.findIndex(task => task.id === taskId);

      // Check if the task exists and both lists are found.
      if (taskIndex > -1 && fromList && toList) {
        // Remove the task from the original list and capture it in a variable.
        const [task] = fromList.tasks.splice(taskIndex, 1);

        // Add the removed task to the destination list.
        toList.tasks.push(task);

        // Log the updated lists after the move. Useful for confirming the move was successful.
        console.log(`Task moved. Updated fromList:`, fromList);
        console.log(`Task moved. Updated toList:`, toList);
      } else {
        // Log an error message if the task couldn't be moved. This helps identify issues.
        console.log('Task move failed. Check if fromList, toList, and taskIndex are correctly identified.');
      }
    }
  },
})

