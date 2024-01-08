<script setup>
// We importeren de `useToDoListStore` functie uit onze `toDoList.js` store.
// Deze functie stelt ons in staat om onze to-do list store te gebruiken, die onze to-do data bevat.
import { useToDoListStore } from '@/stores/toDoList.js';
// En we importeren ook de functie `storeToRefs` van de pinia library.
// De storeToRefs functie komt uit de Pinia library. Pinia is een state management library voor Vue.js en is een alternatief voor Vuex.
// In Pinia wordt een store gebruikt om de state van een toepassing of component te beheren.
// De storeToRefs functie is een hulpmiddel in Pinia om een reactive store object om te zetten naar een object
// met meerdere reactive eigenschappen. Dit maakt het gemakkelijker om store eigenschappen te gebruiken
// in Vue templates of setup functies.
import { storeToRefs } from 'pinia';

// We creëren een instantie van onze to-do list store
const store = useToDoListStore();

// Met `storeToRefs` conventeren we onze to-do list store naar een reeks `refs`,
// waardoor het gemakkelijker is om ermee te werken in de Vue template.
const { toDoList } = storeToRefs(store);

// We halen ook de functies `toggleCompleted` en `deleteToDo` uit de store op.
// `toggleCompleted` wisselt de voltooiingsstatus van een to-do item,
// en `deleteToDo` verwijdert een to-do item uit de lijst.
const { toggleCompleted, deleteToDo } = store;
</script>

<template>
  <!-- In het <template> gedeelte van onze code definiëren we de structuur van onze ToDoList-component in HTML. -->
  <!-- Deze code zal worden gerendered om het lijstgedeelte van onze app weer te geven. -->
  <div class="container">
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <!-- We gebruiken de `v-for` directive om een to-do item voor elk item in onze `toDoList` te renderen. -->
        <ul v-for="toDo in toDoList" :key="toDo.id" class="list-group">
          <li class="list-group-item d-flex flex-row p-0">
            <div class="d-flex flex-row align-items-center">
              <!-- We binden een click event aan de checkmark span, die `toggleCompleted` aanroept voor het huidige to-do item. -->
              <!-- De `.stop` modifier voorkomt dat het click event wordt "gebubbled" naar hogere elementen. -->
              <span @click.stop="toggleCompleted(toDo.id)"><i class="bi bi-check"></i></span>

              <!-- We binden een click event aan de delete span, die `deleteToDo` aanroept voor het huidige to-do item. -->
              <span @click="deleteToDo(toDo.id)" class="del-icoon me-3">&#9932;&nbsp;</span>

              <!-- We renderen de id van het to-do item, plus 1 (omdat we starten met tellen vanaf 0). -->
              <span class="me-3">{{ toDo.id + 1 }}</span>

            </div>

            <!-- We renderen de tekst van het to-do item. -->
            <!-- Daarnaast gebruiken we Vue's bind directive (`v-bind` of `:`) om conditioneel de `completed` klasse toe te voegen aan het item. -->
            <span :class="{ completed: toDo.completed }" class="d-flex align-items-center fw-bold">{{ toDo.item }}</span>

          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.completed{
  text-decoration: line-through;
  text-decoration-color:red;
}

.del-icoon, .bi-check{
  cursor: pointer; /* Verandert de cursor in een handje wanneer je eroverheen gaat */
  transition: color 0.3s; /* Voegt een overgangseffect toe voor een soepele kleurverandering */
}

.del-icoon {
  font-size:1.5rem;
}

.bi-check{
  font-size:3rem;
}

.bi-check:hover {
  color: green; /* Verandert de kleur wanneer de muis erover beweegt */
}

.del-icoon:hover{
  color: red;
}
</style>