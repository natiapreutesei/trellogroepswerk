<script setup>
import { ref } from 'vue';
import { useToDoListStore } from '@/stores/toDoList.js';
const toDo = ref('');
const inputRef = ref(null);
const store = useToDoListStore();

const props = defineProps({
  listName: String,
  listId: String,
  boardId: String
});

function addItemAndClear(){
  if(toDo.value.trim()){
    store.addToDo(props.boardId, props.listId, toDo.value);
    toDo.value = '';
    inputRef.value.focus();
  }
}

</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 ">

        <div class="d-flex flex-row justify-content-center mb-3">
          <h1 class="my-0 me-2">{{ listName }}</h1>
          <button @click="store.deleteListFromBoard(boardId,listId)" class="btn btn-danger">x</button>

        </div>
        <form @submit.prevent="addItemAndClear(toDo)" class="d-flex flex-row mb-3">
          <input class="form-control rounded-0 me-2" v-model="toDo" ref="inputRef" type="text" placeholder="Geef taak in...">
          <button class="btn btn-dark rounded-0">Add</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>