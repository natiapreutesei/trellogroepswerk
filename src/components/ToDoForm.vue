<!-- We beginnen met het importeren van de nodige modules en componenten. -->
<script setup>
// We importeren de "ref" functie uit Vue. Deze functie wordt gebruikt om reagerende data te beheren.
import { ref } from 'vue';

// We importeren de "useToDoListStore" functie uit onze store. Deze functie geeft ons toegang tot onze to-do lijst data.
import { useToDoListStore } from '@/stores/toDoList.js';

// We maken een nieuwe reagerende referentie voor de taak.
const toDo = ref('');

// We maken een nieuwe reagerende referentie voor het input element.
const inputRef = ref(null);

// We halen onze to-do lijst data op uit de store.
const store = useToDoListStore();

// We definiëren de props die dit component accepteert. Dit component verwacht een "listName", "listId" en "boardId" prop, allemaal strings.
const props = defineProps({
  listName: String,
  listId: String,
  boardId: String
});

// We definiëren een functie om een item toe te voegen en het invoerveld te wissen. Deze functie controleert of de taak niet leeg is, voegt de taak toe aan de store, en reset de taak.
function addItemAndClear(){
  if(toDo.value.trim()){
    store.addToDo(props.boardId, props.listId, toDo.value);
    toDo.value = '';
    inputRef.value.focus();
  }
}
</script>

<!-- Het <template> gedeelte beschrijft wat er gerenderd moet worden door dit component. -->
<template>
  <!-- We maken een container voor ons component. -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">

        <!-- We tonen de naam van de lijst en een knop om de lijst te verwijderen. -->
        <div class="d-flex flex-row col-12 my-3">
          <div class="col-10 d-flex justify-content-center">
            <h1 class="my-0 me-2 fs-3">{{ listName }}</h1>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <button @click="store.deleteListFromBoard(boardId,listId)" class="btn btn-danger"><i class="bi bi-x-octagon"></i></button>
          </div>
        </div>

        <!-- We maken een formulier om een nieuwe taak toe te voegen. -->
        <div class="row">
          <form @submit.prevent="addItemAndClear(toDo)" class="d-flex flex-row mb-3 col-12">
            <div class="col-9">
              <div class="me-2">
                <input class="form-control rounded-0" v-model="toDo" ref="inputRef" type="text" placeholder="Geef taak in...">
              </div>
            </div>
            <div class="col-3">
              <button class="btn btn-dark rounded-0 w-100">Add</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>
