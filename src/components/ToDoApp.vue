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
    <div class="d-flex justify-content-center my-4">
      <input type="text" class="form fs-4 me-3" placeholder="Geef bordnaam in..." v-model="bordName">
      <button class="btn btn-success bi-clipboard-plus" @click="createNewBoard"></button>
    </div>

    <div class="d-flex flex-row flex-wrap w-100">
      <div
        v-for="board in store.appBoards"
        :key="board.id"
        class="mb-3 border border-dark d-flex flex-column justify-content-center align-items-center my-custom-col p-2"
      >
        <div class="d-flex flex-row col-12">
          <div class="boardName col-10 d-flex justify-content-center" @click="selectBoard(board)">
            <h2>{{ board.name }}</h2>
          </div>
          <div class="col-2 d-flex justify-content-end">
            <button @click="store.deleteBoard(board.id)" class="btn btn-danger">X</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedBoard">
      <to-do-board :board="selectedBoard" :selected-board="selectedBoard" @board-deleted="selectedBoard = null"></to-do-board>
    </div>
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
  background-color: #f0f0f0;
  box-shadow: 0 0 10px 0 rgba(0,0,0,0.75);
}

</style>