
import { defineStore } from 'pinia';

function generateUniqueId() {
  const date = new Date();
  return date.getTime().toString();
}

export const useToDoListStore = defineStore('todoList', {
  state: () => ({
    appBoards: [],
    appLists: {},
  }),
  actions: {
    addBoard(boardName) {
      const uniqueId = generateUniqueId();
      this.appBoards.push({
        id: uniqueId,
        name: boardName,
        tasks: []
      });
    },
    deleteBoard(boardId) {
      this.appBoards = this.appBoards.filter(board => board.id !== boardId);
      if (this.appLists[boardId]) {
        delete this.appLists[boardId];
      }
    },
    addList(boardId, listName) {
      const uniqueId = generateUniqueId();
      const listId = generateUniqueId();
      if (!this.appLists[boardId]) {
        this.appLists[boardId] = {};
      }
      this.appLists[boardId][listId] = {
        id: uniqueId,
        name: listName,
        tasks: []
      };
    },
    deleteListFromBoard(boardId, listId) {
      if (this.appLists[boardId]) {
        delete this.appLists[boardId][listId];
      }
    },
    addToDo(boardId, listId, item) {
      const uniqueId = generateUniqueId();
      const list = this.appLists[boardId][listId];
      if (list) {
        const task = {
          id: uniqueId,
          item: item,
          completed: false
        };
        list.tasks.push(task);
      }
    },
    deleteToDo(boardId, listId, itemId) {
      const list = this.appLists[boardId][listId];
      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== itemId);
      }
      return list ? list.tasks : [];
    },
    toggleCompleted(boardId, listId, itemId) {
      const list = this.appLists[boardId][listId];
      if (list) {
        const task = list.tasks.find(task => task.id === itemId);
        if (task) {
          task.completed = !task.completed;
        }
      }
      return list ? list.tasks : [];
    },
    moveTask(fromBoardId, fromListId, toBoardId, toListId, taskId) {
      const fromList = this.appLists[fromBoardId][fromListId];
      const toList = this.appLists[toBoardId][toListId];
      const taskIndex = fromList?.tasks.findIndex(task => task.id === taskId);
      if (taskIndex > -1 && fromList && toList) {
        const [task] = fromList.tasks.splice(taskIndex, 1);
        toList.tasks.push(task);
      }
    },
    updateTasksOrder(boardId, listId, newOrder) {
      const list = this.appLists[boardId][listId];
      if (list) {
        list.tasks = newOrder;
      }
    }
  },
})

