// Eerst importeren we de functie 'defineStore' uit de Pinia library. Pinia is een state management library voor Vue.js.
// De `defineStore` functie wordt gebruikt om een nieuwe store te definiëren.
import { defineStore } from 'pinia';

// We definiëren onze store met de naam 'todoList'. Dit maakt een unieke store aan die we kunnen gebruiken om de staat van onze to-do lijst te beheren.
// De functie `defineStore` keert een andere functie terug genaamd `useToDoListStore`, die we zullen exporteren.
export const useToDoListStore = defineStore('todoList', {
  // Binnenkant van onze store definiëren we eerst de initiale staat. In onze staat hebben we een lijst van to-dos(`toDoList`) en een id teller(`id`).
  state: () => ({
    toDoList: [],
    id: 0
  }),
  
  // Vervolgens definiëren we acties. Acties zijn functies die we kunnen aanroepen op onze store om de staat te wijzigen.
  // Acties in de store vormen de belangrijkste methoden waarmee je de status kunt wijzigen.
  // In je to-do lijst store heb je drie acties gedefinieerd: addToDo, deleteToDo, en toggleCompleted.
  actions: {
    // Actie om een nieuwe to-do toe te voegen aan `toDoList` met een gegeven item tekst(`item`).
    // Deze actie wordt aangeroepen als je een nieuw to-do item wilt toevoegen aan je to-do lijst.
    // Het neemt één parameter, item, dat de tekst van het nieuwe to-do item zou zijn.
    // Binnen deze functie, creëer je een nieuw object dat de details van je nieuwe to-do item bevat.
    // Het object heeft de velden item (de to-do tekst), id (een unieke id die is gegenereerd van de huidige waarde van this.id++),
    // en completed (een Boolean waarde dat aangeeft of het item is voltooid, in eerste instantie ingesteld op false).
  // Je voegt dit nieuwe to-do item vervolgens toe aan het begin van je todoList array met behulp van de JavaScript methode unshift
    
    addToDo(item) {
      // Elk to-do item is een object met eigenschappen: item (de tekst), id (een uniek identificatienummer),
      // en completed (een boolean waarde of de taak is voltooid of niet)
      this.toDoList.unshift({ item: item, id: this.id++, completed: false });
    },
    
    // Actie om een to-do item uit `toDoList` te verwijderen op basis van zijn id (`itemId`).
    // Deze actie wordt aangeroepen als je een bestaand to-do item wilt verwijderen uit je to-do lijst.
    // Het neemt één parameter, itemId, dat de id van het to-do item is dat je wilt verwijderen.
    //   Binnen deze functie, filter je op je todoList array en behoud je alleen die items waarvan de id
    //   niet gelijk is aan itemId. Dit heeft effectief als gevolg dat het item met id itemId uit de lijst wordt verwijderd.
    deleteToDo(itemId) {
      this.toDoList = this.toDoList.filter((object) => object.id !== itemId);
    },
    
    // Actie om de 'completed' status van een to-do item te veranderen. Het item wordt geïdentificeerd door zijn id (`idToFind`).
    // Deze actie wordt aangeroepen als je de voltooiingsstatus van een bestaand to-do item wilt omschakelen.
    // Het neemt één parameter, idToFind, dat de id van het to-do item is waarvan je de voltooiingsstatus wilt omschakelen.
    // Binnen deze functie, zoek je eerst het to-do item met de id idToFind in je todoList array.
    // Als je het item vindt, verander je de waarde van zijn completed veld in zijn tegengestelde (van true naar false of omgekeerd)
    // met de ! operator.
    toggleCompleted(idToFind) {
      const toDo = this.toDoList.find((obj) => obj.id === idToFind);
      if (toDo) {
        toDo.completed = !toDo.completed;
      }
    }
  }
})