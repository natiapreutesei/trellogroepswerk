// We importeren de "defineStore" functie uit de Pinia bibliotheek. Deze functie wordt gebruikt om een nieuwe store te maken.
import { defineStore } from 'pinia';

// We definiëren een functie om een unieke ID te genereren. Deze ID's worden gebruikt om onze borden, lijsten en taken te identificeren.
function generateUniqueId() {
  // We maken een nieuw Date object, dat de huidige datum en tijd bevat.
  const date = new Date();
  // We retourneren de tijd in milliseconden sinds 1 januari 1970 00:00:00 UTC. Dit is een unieke waarde.
  return date.getTime().toString();
}

// We definiëren onze store. Een store is een object dat de toestand van onze applicatie bevat.
export const useToDoListStore = defineStore('todoList', {
  // De "state" functie retourneert het initiële state object van onze store.
  state: () => ({
    // "appBoards" is een array die al onze borden bevat.
    appBoards: [],
    // "appLists" is een object dat al onze lijsten bevat. De sleutels van dit object zijn de ID's van de borden.
    appLists: {},
  }),
  // De "actions" object bevat functies die we kunnen aanroepen om de state van onze store te veranderen.
  actions: {
    // De "addBoard" functie voegt een nieuw bord toe aan onze "appBoards" array.
    addBoard(boardName) {
      // We genereren een unieke ID voor ons nieuwe bord.
      const uniqueId = generateUniqueId();
      // We voegen een nieuw bord object toe aan de "appBoards" array.
      this.appBoards.push({
        id: uniqueId,
        name: boardName,
        lists: []
      });
    },
    // De "deleteBoard" functie verwijdert een bord uit onze "appBoards" array.
    deleteBoard(boardId) {
      // We filteren de "appBoards" array om alleen de borden over te houden die niet het gegeven "boardId" hebben.
      this.appBoards = this.appBoards.filter(board => board.id !== boardId);
      // Als er een lijst bestaat voor het gegeven "boardId", verwijderen we deze ook.
      if (this.appLists[boardId]) {
        delete this.appLists[boardId];
      }
    },
    // De "addList" functie voegt een nieuwe lijst toe aan een specifiek bord.
    addList(boardId, listName) {
      // We genereren een unieke ID voor onze nieuwe lijst.
      const uniqueId = generateUniqueId();
      // Als er nog geen lijsten bestaan voor het gegeven "boardId", maken we een nieuw object aan.
      if (!this.appLists[boardId]) {
        this.appLists[boardId] = {};
      }
      // We voegen een nieuw lijst object toe aan het "appLists" object onder het gegeven "boardId".
      this.appLists[boardId][uniqueId] = {
        id: uniqueId,
        name: listName,
        tasks: []
      };
    },
    // De "deleteListFromBoard" functie verwijdert een lijst van een specifiek bord.
    deleteListFromBoard(boardId, listId) {
      // Als er lijsten bestaan voor het gegeven "boardId", verwijderen we de lijst met het gegeven "listId".
      if (this.appLists[boardId]) {
        delete this.appLists[boardId][listId];
      }
    },
    // De "addToDo" functie voegt een nieuwe taak toe aan een specifieke lijst van een specifiek bord.
    addToDo(boardId, listId, item) {
      // We genereren een unieke ID voor onze nieuwe taak.
      const uniqueId = generateUniqueId();
      // We halen de lijst op waar we de taak aan willen toevoegen.
      const list = this.appLists[boardId][listId];
      // Als de lijst bestaat, voegen we de nieuwe taak toe.
      if (list) {
        const task = {
          id: uniqueId,
          item: item,
          completed: false
        };
        list.tasks.unshift(task);
      }
    },
    // De "deleteToDo" functie verwijdert een taak van een specifieke lijst van een specifiek bord.
    deleteToDo(boardId, listId, itemId) {
      // We halen de lijst op waar we de taak van willen verwijderen.
      const list = this.appLists[boardId][listId];
      // Als de lijst bestaat, filteren we de taken om alleen de taken over te houden die niet het gegeven "itemId" hebben.
      if (list) {
        list.tasks = list.tasks.filter(task => task.id !== itemId);
      }
      // We retourneren de nieuwe lijst van taken. Als de lijst niet bestond, retourneren we een lege array.
      return list ? list.tasks : [];
    },
    // De "toggleCompleted" functie verandert de "completed" status van een specifieke taak van een specifieke lijst van een specifiek bord.
    toggleCompleted(boardId, listId, itemId) {
      // We halen de lijst op waar de taak in zit.
      const list = this.appLists[boardId][listId];
      // Als de lijst bestaat, zoeken we de taak op.
      if (list) {
        const task = list.tasks.find(task => task.id === itemId);
        // Als de taak bestaat, veranderen we de "completed" status.
        if (task) {
          task.completed = !task.completed;
        }
      }
      // We retourneren de nieuwe lijst van taken. Als de lijst niet bestond, retourneren we een lege array.
      return list ? list.tasks : [];
    },
    // De "moveTask" functie verplaatst een taak van een lijst naar een andere lijst.
    // De functie accepteert nu een extra parameter "newPosition", die de nieuwe positie van de taak in de doellijst aangeeft.
    moveTask(fromBoardId, fromListId, toBoardId, toListId, taskId, newPosition) {
      // We halen de lijst op waar de taak nu in zit.
      const fromList = this.appLists[fromBoardId][fromListId];
      // We halen de lijst op waar we de taak naar toe willen verplaatsen.
      const toList = this.appLists[toBoardId][toListId];
      // We zoeken de index van de taak in de huidige lijst.
      const taskIndex = fromList?.tasks.findIndex(task => task.id === taskId);
      // Als de taak bestaat en beide lijsten bestaan, verplaatsen we de taak.
      if (taskIndex > -1 && fromList && toList) {
        // We verwijderen de taak uit de huidige lijst.
        const [task] = fromList.tasks.splice(taskIndex, 1);
        // We voegen de taak toe aan de nieuwe lijst op de opgegeven positie.
        toList.tasks.splice(newPosition, 0, task);
      }
    },
    // De "updateTasksOrder" functie verandert de volgorde van de taken in een specifieke lijst van een specifiek bord.
    updateTasksOrder(boardId, listId, newOrder) {
      // We halen de lijst op waar we de volgorde van de taken van willen veranderen.
      const list = this.appLists[boardId][listId];
      // Als de lijst bestaat, veranderen we de volgorde van de taken.
      if (list) {
        list.tasks = newOrder;
      }
    }
  },
})