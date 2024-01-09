<!-- We beginnen met het importeren van de nodige modules en componenten. -->
<script setup>
// We importeren de "useToDoListStore" functie uit onze store. Deze functie geeft ons toegang tot onze to-do lijst data.
import { useToDoListStore } from '@/stores/toDoList.js';

// We importeren de "ToDoForm" en "ToDoList" componenten. Deze componenten worden gebruikt om de to-do lijst weer te geven.
import ToDoForm from '@/components/ToDoForm.vue';
import ToDoList from '@/components/ToDoList.vue';

// We importeren de "ref" en "watchEffect" functies uit Vue. Deze functies worden gebruikt om reagerende data en side effects te beheren.
import { ref, watchEffect } from 'vue';

// We maken een nieuwe reagerende referentie voor de naam van de lijst.
const listName = ref('');

// We halen onze to-do lijst data op uit de store.
const store = useToDoListStore();

// We definiëren de props die dit component accepteert. Dit component verwacht een "board" en een "selectedBoard" prop, beide zijn objecten.
const props = defineProps({
  board: Object,
  selectedBoard: Object
});

// We definiëren een functie om een nieuwe lijst te maken. Deze functie controleert of de naam van de lijst niet leeg is, voegt de lijst toe aan de store, en reset de naam van de lijst.
const createNewList = () => {
  if (listName.value.trim()) {
    store.addList(props.board.id, listName.value);
    listName.value = '';
  }
}

// We definiëren de events die dit component kan uitstoten. Dit component kan een "board-deleted" event uitstoten.
const emit = defineEmits(['board-deleted']);

// We kijken naar de "appBoards" array in de store. Als het geselecteerde bord niet meer in de array zit, stoten we een "board-deleted" event uit.
watchEffect(() => {
  const boardExists = store.appBoards.some(board => board.id === props.board.id);
  if (!boardExists) {
    emit('board-deleted');
  }
});
</script>

<!-- Het <template> gedeelte beschrijft wat er gerenderd moet worden door dit component. -->
<template>
  <!-- We tonen een invoerveld en een knop om een nieuwe lijst te maken als het geselecteerde bord hetzelfde is als het bord van dit component. -->
  <div v-if="props.selectedBoard && props.board.id === props.selectedBoard.id" class="d-flex justify-content-center my-3">
    <form @submit.prevent="createNewList" class="d-flex flex-row mb-3 col-3">
      <div class="col-9">
        <div class="me-2">
          <input type="text" class="form-control fs-4 me-3" placeholder="Geef lijstnaam in..." v-model="listName" maxlength="30">
        </div>
      </div>
      <div class="col-3">
        <button class="btn btn-success bi-clipboard-plus" @click="createNewList" style="height: 100%"></button>
      </div>
    </form>
  </div>

  <!-- We renderen een "ToDoForm" en een "ToDoList" component voor elke lijst in het huidige bord. -->
  <div class="d-flex flex-row flex-wrap w-100">
    <div
      v-for="list in store.appLists[props.board.id]"
      :key="list.id"
      class="mb-3 my-custom-col border border-dark"
    >
      <to-do-form
        :list-name="list.name"
        :list-id="list.id"
        :board-id="props.board.id"
      >
      </to-do-form>
      <to-do-list :list-id="list.id" :board-id="props.board.id"></to-do-list>
    </div>
  </div>
</template>

<style scoped>
.my-custom-col {
  width: calc(20% - 20px);
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.75);
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
}
</style>