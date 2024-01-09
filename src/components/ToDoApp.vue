<script setup>

import { useToDoListStore } from '@/stores/toDoList.js';
import ToDoBoard from '@/components/ToDoBoard.vue';

import { ref } from 'vue'
const store = useToDoListStore();
const bordName = ref('');

const createNewBoard = () => {
  if (bordName.value.trim()) {
    store.addBoard(bordName.value);
    bordName.value = '';
  }
}


const selectedBoard = ref(null);

const selectBoard = (board) => {
  selectedBoard.value = board;
}

</script>

<template>
  <div class="to-do-app">
    <div class="d-flex justify-content-center my-5">
      <form @submit.prevent="createNewBoard" class="d-flex">
        <input type="text" class="form form-control fs-5 me-3 border-dark" placeholder="Geef bordnaam in..." v-model="bordName" :maxlength="30">
        <button type="submit" class="btn btn-success bi-clipboard-plus"></button>
      </form>
    </div>
  </div>




    <div class="d-flex flex-row flex-wrap w-100">
<!--      hier zou misschien tekst staan om te vertellen dat dit boards zijn en je hierop kan klikken om lijsten toe te voegen-->
      <div
        v-for="board in store.appBoards"
        :key="board.id"
        class="mb-3 border border-dark d-flex flex-column justify-content-center align-items-center my-custom-col p-2 drop-shadow bg-secondary">
        <div class="d-flex flex-row col-12 d-flex justify-content-center align-items-center">
          <div class="boardName col-10 d-flex justify-content-center" @click="selectBoard(board)">
            <h2 class="text-break m-0 fs-5 text-white">{{ board.name }}</h2>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <div class="x-button-size">
              <button @click="store.deleteBoard(board.id)" class="btn btn btn-outline-light m-0">X</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedBoard">
      <to-do-board :board="selectedBoard" :selected-board="selectedBoard" @board-deleted="selectedBoard = null"></to-do-board>
    </div>
</template>

<style scoped>
.boardName{
  cursor:pointer;
}

.my-custom-col{
  width: calc(20% - 20px);
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 10px;

}

</style>


