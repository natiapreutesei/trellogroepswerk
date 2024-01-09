<script setup>
// We importeren de `ref` functie van `vue`, die wordt gebruikt om reagerende data te creëren.
import { ref, onMounted } from 'vue';

// We importeren de `useToDoListStore` functie uit onze `toDoList.js` store.
// Deze functie stelt ons in staat om onze ToDo list store te gebruiken, die onze to-do data bevat.
import { useToDoListStore } from '@/stores/toDoList.js';

// We definieren hier twee "refs". Een "ref" is simpel gezegd een manier om reagerende data te maken in Vue.
// `toDo` houdt de waarde van ons nieuwe to-do item bij.
// `inputRef` geeft ons een referentie naar de input waar de gebruiker zijn nieuwe to-do item invoert.
const toDo = ref('');
const inputRef = ref(null);

// We creëren een instantie van onze to-do list store door de `useToDoListStore` functie aan te roepen.
const store = useToDoListStore();

const props = defineProps({
  listName: Object,
  listId: String
});

// We definieren een functie `addItemAndClear` die een nieuw item aan onze to-do lijst toevoegt,
// vervolgens de invoer leegt en de focus teruggeeft aan de invoer.
function addItemAndClear(){
  if(toDo.value.trim()){
    store.addToDo(props.listId, toDo.value);
    toDo.value = '';
    inputRef.value.focus();
  }
}

onMounted(() => {
  if(inputRef.value) {
    inputRef.value.focus();
  }
});
</script>

<template>
  <!-- Dit is de HTML voor ons ToDoForm component. -->
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <div
          id="griptitle"
          :class="['text-center text-bg-light m-0 fs-1 rounded-top-3 border-4 border-top border-start border-end']">
          <i class="bi bi-grip-horizontal"></i>
        </div>
        <div class="d-flex flex-row justify-content-center mb-3">
          <h1 class="my-0 me-2">{{ props.listName.name }}</h1>
          <button @click="store.deleteList(props.listId)" class="btn btn-danger">x</button>
        </div>
        <!-- De vorm waarin de gebruiker een nieuw to-do item invoert. -->
        <!-- Wanneer de gebruiker het formulier indient, roepen we onze `addItemAndClear` functie aan. -->
        <!-- De `.prevent` modifier voorkomt dat de standaard form submit actie plaatsvindt, wat de pagina zou vernieuwen. -->
        <form @submit.prevent="addItemAndClear(toDo)" class="d-flex flex-row mb-3">
          <!-- De invoer waar de gebruiker zijn nieuwe to-do item invoert. -->
          <!-- De `v-model` directive maakt tweerichtingsbinding mogelijk tussen het probleem en de invoer. -->
          <!-- De `ref` attribuut geeft ons een referentie naar deze invoer. -->
          <input class="form-control rounded-0 me-2" v-model="toDo" ref="inputRef" type="text" placeholder="Geef taak in...">
          <!-- De knop die de gebruiker klikt om het formulier in te dienen. -->
          <button class="btn btn-dark rounded-0">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

