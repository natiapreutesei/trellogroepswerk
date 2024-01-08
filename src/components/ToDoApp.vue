<script setup>


import { useToDoListStore } from '@/stores/toDoList.js';
//
// import { storeToRefs } from 'pinia';
//

//
// const { toDoList } = storeToRefs(store);

// We importeren hier twee andere Vue-componenten die we in dit component gaan gebruiken.
// De componenten zijn ToDOForm en ToDoList, beide worden opgehaald vanuit de maplocatie '@/components'.
// De '@' is een alias voor de bron(src) map in het Vue-project.
import ToDoForm from '@/components/ToDoForm.vue';
// import ToDoList from '@/components/ToDoList.vue';

import { ref } from 'vue';

const listName = ref('');

const store = useToDoListStore();

const createNewList = () => {
  if (listName.value.trim()) {
    store.addList({ name: listName.value });
    listName.value = ''; // Reset de input na het toevoegen
  }
}

</script>

<template>
  <!-- In het <template> gedeelte van onze code definiëren we de structuur van onze ToDoApp-component in HTML. -->
  <!-- Deze code zal worden gerendered om de pagina van onze app weer te geven. -->

  <!-- We beginnen met een div-element met een klas 'to-do-app', een container waarin alle andere elementen worden geplaatst. -->

        <div class="to-do-app">


            <div class="d-flex justify-content-center my-4">
              <input type="text" class="form fs-4 me-3" placeholder="Geef lijstnaam in..." v-model="listName">
              <button class="btn btn-success" @click="createNewList">+</button>
            </div>
            <!-- Binnen deze div hebben we een h1-element dat fungeert als de hoofdkop voor onze to-do lijstpagina. -->

            <!-- Dynamisch renderen van ToDoForm voor elke lijst -->
            <div class="d-flex flex-row flex-wrap w-100">
              <to-do-form
                v-for="list in store.toDoList"
                :key="list.id"
                class="mb-3 my-custom-col"
                :list-name="list.name"
              ></to-do-form>
            </div>






          <!--    &lt;!&ndash; En tenslotte hebben we het ToDoList-component. &ndash;&gt;-->
          <!--    &lt;!&ndash; Dit component is verantwoordelijk voor het weergeven van de lijst met to-do-items op onze pagina. &ndash;&gt;-->
          <!--    <to-do-list></to-do-list>-->

        </div>


</template>

<style scoped>
.my-custom-col{
  width: calc(25% - 20px);
  margin-left: 10px;
  margin-right: 10px;
}

</style>