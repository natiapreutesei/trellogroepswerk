<!-- In het <script> gedeelte van een Vue-component importeren we de benodigde componenten. -->
<!-- Hier importeren we het ToDoApp-component vanuit de 'components' map. -->
<script setup>
import ToDoApp from '@/components/ToDoApp.vue';
</script>

<!-- Het <template> gedeelte beschrijft wat er gerenderd moet worden door deze component. -->
<!-- We renderen het ToDoApp-component dat we hierboven hebben geïmporteerd. -->
<template>
  <!-- We beginnen met een navigatiebalk. -->
  <nav class="navbar navbar-expand-lg bg-body-secondary py-3">
    <div class="container-fluid d-flex justify-content-center">
      <!-- Dit is de titel van onze app. -->
      <div class="drop-shadow border rounded-2 border-dark bg-white px-4 py-1">
        <a class="navbar-brand fw-light fs-2 m-0" href="#">Trello Clone</a>
      </div>
      <!-- Dit is de knop voor het uitklapmenu op mobiele apparaten. -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

  <!-- Hier renderen we het ToDoApp-component. -->
  <to-do-app class="mb-5"></to-do-app>

  <!-- Dit is de voettekst van onze app. -->
  <footer class="bg-light-subtle text-center fixed-bottom">
    <div class="bg-secondary-subtle">
      <!-- Hier staat wat informatie over wie de app heeft gemaakt. -->
      <p class="m-0 py-2">Groepswerk van Anik, Ruben & Natanael
      </p>
    </div>
  </footer>
</template>