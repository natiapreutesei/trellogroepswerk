<script setup>
import { useToDoListStore } from '@/stores/toDoList.js';

import ToDoForm from '@/components/ToDoForm.vue';
import ToDoList from '@/components/ToDoList.vue';

import { ref, watchEffect } from 'vue';

const listName = ref('');


const store = useToDoListStore();

const props = defineProps({
  board: Object,
  selectedBoard: Object
});

const createNewList = () => {
  if (listName.value.trim()) {
    store.addList(props.board.id, listName.value);
    listName.value = '';
  }
}

const emit = defineEmits(['board-deleted']);

watchEffect(() => {
  const boardExists = store.appBoards.some(board => board.id === props.board.id);
  if (!boardExists) {
    emit('board-deleted');
  }
});

</script>

<template>


  <div v-if="props.selectedBoard && props.board.id === props.selectedBoard.id" class="d-flex justify-content-center my-5">
    <form @submit.prevent="createNewList" class="d-flex">
      <input
          type="text"
          class="form form-control fs-5 me-3 border-dark"
          placeholder="Geef lijstnaam in..."
          v-model="listName"
          :maxlength="30">
      <button type="submit" class="btn btn-success bi-clipboard-plus"></button>
    </form>
  </div>


    <div class="d-flex flex-row flex-wrap w-100 ">
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