<script setup>
// We importeren hier twee andere Vue-componenten die we in dit component gaan gebruiken.
// De componenten zijn ToDOForm en ToDoList, beide worden opgehaald vanuit de maplocatie '@/components'.
// De '@' is een alias voor de bron(src) map in het Vue-project.
import ToDoForm from '@/components/ToDoForm.vue';
import ToDoList from '@/components/ToDoList.vue';
</script>

<template>
  <!-- In het <template> gedeelte van onze code definiëren we de structuur van onze ToDoApp-component in HTML. -->
  <!-- Deze code zal worden gerendered om de pagina van onze app weer te geven. -->

  <!-- We beginnen met een div-element met een klas 'to-do-app', een container waarin alle andere elementen worden geplaatst. -->
  <div class="to-do-app">

    <!-- Binnen deze div hebben we een h1-element dat fungeert als de hoofdkop voor onze to-do lijstpagina. -->
    <h1 class="text-center mb-3">To Do List</h1>

    <!-- Vervolgens hebben we het ToDoForm-component. -->
    <!-- Dit wordt waarschijnlijk gebruikt voor het invoeren en indienen van nieuwe to-do-items. -->
    <to-do-form class="mb-3"></to-do-form>

    <!-- En tenslotte hebben we het ToDoList-component. -->
    <!-- Dit component is verantwoordelijk voor het weergeven van de lijst met to-do-items op onze pagina. -->
    <to-do-list></to-do-list>

  </div>
</template>