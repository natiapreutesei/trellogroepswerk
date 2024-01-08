
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
      const list = this.appLists.find(l => l.id === listId);
      if (list) {
        list.tasks.unshift({
          item: item,
          id: uniqueId,
          completed: false
        });
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

