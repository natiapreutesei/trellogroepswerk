
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
      if (list) {
        list.tasks = list.tasks.filter((task) => task.id !== itemId);
      }
    },
    toggleCompleted(listId, itemId) {
      const list = this.appLists.find(l => l.id === listId);
      const task = list?.tasks.find(task => task.id === itemId);
      if (task) {
        task.completed = !task.completed;
      }
    }
    
  }
})

