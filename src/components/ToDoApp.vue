<!-- We beginnen met het importeren van de nodige modules en componenten. -->
<script setup>
// We importeren de "useToDoListStore" functie uit onze store. Deze functie geeft ons toegang tot onze to-do lijst data.
import { useToDoListStore } from '@/stores/toDoList.js';

// We importeren het "ToDoBoard" component. Dit component wordt gebruikt om een to-do bord weer te geven.
import ToDoBoard from '@/components/ToDoBoard.vue';

// We importeren de "ref" functie uit Vue. Deze functie wordt gebruikt om reagerende data te beheren.
import { ref } from 'vue'

// We halen onze to-do lijst data op uit de store.
const store = useToDoListStore();

// We maken een nieuwe reagerende referentie voor de naam van het bord.
const bordName = ref('');

// We definiëren een functie om een nieuw bord te maken. Deze functie controleert of de naam van het bord niet leeg is, voegt het bord toe aan de store, en reset de naam van het bord.
const createNewBoard = () => {
  if (bordName.value.trim()) {
    store.addBoard(bordName.value);
    bordName.value = '';
  }
}

// We maken een nieuwe reagerende referentie voor het geselecteerde bord.
const selectedBoard = ref(null);

// We definiëren een functie om een bord te selecteren. Deze functie stelt de waarde van "selectedBoard" in op het gegeven bord.
const selectBoard = (board) => {
  selectedBoard.value = board;
}
</script>

<!-- Het <template> gedeelte beschrijft wat er gerenderd moet worden door dit component. -->
<template>
  <!-- We tonen een invoerveld en een knop om een nieuw bord te maken. -->
  <div class="to-do-app">

    <div class="d-flex justify-content-center my-3">
      <form @submit.prevent="createNewBoard" class="d-flex flex-row mb-3 col-3">
        <div class="col-9">
          <div class="me-2">
            <input type="text" class="form-control fs-4 me-3" placeholder="Geef bordnaam in..." v-model="bordName" maxlength="30">
          </div>
        </div>
        <div class="col-3">
          <button class="btn btn-success bi-clipboard-plus" @click="createNewBoard" style="height: 100%"></button>
        </div>
      </form>
    </div>


    <!-- We renderen een "ToDoBoard" component voor elk bord in de store. -->
    <div class="d-flex flex-row flex-wrap w-100">
      <div
        v-for="board in store.appBoards"
        :key="board.id"
        class="mb-3 border border-dark d-flex flex-column justify-content-center align-items-center my-custom-col p-2">
        <div class="d-flex flex-row col-12">
          <!-- We tonen de naam van het bord en maken het klikbaar om het bord te selecteren. -->
          <div class="boardName col-10 d-flex justify-content-center" @click="selectBoard(board)">
            <h2>{{ board.name }}</h2>
          </div>
          <!-- We tonen een knop om het bord te verwijderen. -->
          <div class="col-2 d-flex justify-content-end">
            <button @click="store.deleteBoard(board.id)" class="btn btn-danger"><i class="bi bi-x-octagon"></i></button>
          </div>
        </div>
      </div>
    </div>

    <!-- Als er een bord geselecteerd is, renderen we het "ToDoBoard" component voor dat bord. -->
    <div v-if="selectedBoard">
      <to-do-board :board="selectedBoard" :selected-board="selectedBoard" @board-deleted="selectedBoard = null"></to-do-board>
    </div>
  </div>
</template>

<!-- We definiëren enkele stijlen voor dit component. -->
<style scoped>
/* We maken de naam van het bord klikbaar. */
.boardName{
  cursor:pointer;
}

/* We definiëren de stijl voor de borden. */
.my-custom-col{
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