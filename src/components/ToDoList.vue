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
// import { storeToRefs } from 'pinia';

// We creëren een instantie van onze to-do list store
const store = useToDoListStore();

// Met `storeToRefs` conventeren we onze to-do list store naar een reeks `refs`,
// waardoor het gemakkelijker is om ermee te werken in de Vue template.
// const { toDoList } = storeToRefs(store);

// We halen ook de functies `toggleCompleted` en `deleteToDo` uit de store op.
// `toggleCompleted` wisselt de voltooiingsstatus van een to-do item,
// en `deleteToDo` verwijdert een to-do item uit de lijst.
const { toggleCompleted, deleteToDo } = store;

const props = defineProps({
  listId: String
});

import { computed } from 'vue';

// let listTasks = [];
// let displayTasks = ref([]);
//
// watch(() => store.appLists.find(l => l.id === props.listId).tasks, newTasks => {
//   listTasks = newTasks; // Update listTasks when the tasks in the store change
//   displayTasks.value = [...listTasks]; // Update displayTasks when listTasks changes
// });

const listTasks = computed(() => {
  const list = store.appLists.find(l => l.id === props.listId);
  return list ? list.tasks : [];
});

</script>

<template>
  <!-- In het <template> gedeelte van onze code definiëren we de structuur van onze ToDoList-component in HTML. -->
  <!-- Deze code zal worden gerendered om het lijstgedeelte van onze app weer te geven. -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- We gebruiken de `v-for` directive om een to-do item voor elk item in onze `toDoList` te renderen. -->

        <drag-item v-model="listTasks" itemKey="id" class="list-group" :options="{ group: 'todoGroup', handle:'.gripicon' }">
          <template #item="{ element }">
            <div :key="element.id">
              <div class="list-group-item d-flex flex-row p-0">
              <div class="d-flex flex-row align-items-center col-3">
                <span @click.stop="toggleCompleted(element.id)"><i class="bi bi-check"></i></span>
                <span @click="deleteToDo(element.id)" class="del-icoon me-3">&#9932;&nbsp;</span>
              </div>

              <div class="d-flex justify-content-between col-9">
                <span :class="{ completed: element.completed }" class="d-flex align-items-center justify-content-start fw-bold">
                  {{ element.item }}
                </span>
                <span class="d-flex align-items-center justify-content-end px-4 text-bg-secondary gripicon">
                  <i class="bi bi-grip-vertical"></i>
                </span>
              </div>
            </div>
            </div>
          </template>
        </drag-item>


      </div>
    </div>
  </div>
</template>

<style scoped>
.gripicon{
  cursor:pointer;
}

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