<!-- In het <script> gedeelte van een Vue-component importeren we eerst andere componenten die we nodig hebben. -->
<!-- Hier importeren we enkel het ToDoApp-component vanuit de directory 'components'. -->
<script setup>
import ToDoApp from '@/components/ToDoApp.vue';
</script>

<!-- Het <template> gedeelte is waar we beschrijven wat er gerenderd moet worden van deze component. -->
<!-- In dit geval renderen we gewoon het ToDoApp-component dat we bovenaan hebben geïmporteerd. -->
<template>
  <nav class="navbar navbar-expand-lg bg-body-secondary">
    <div class="container-fluid d-flex justify-content-center">
      <a class="navbar-brand fw-light fs-2" href="#">Trello Clone</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>
  <to-do-app></to-do-app>
</template>

<!-- In het <style> gedeelte kunnen we CSS schrijven om dit specifieke component op te maken. -->
<!-- Omdat het attribuut "scoped" aanwezig is, zullen de stijlen die we hier schrijven alleen van toepassing zijn op dit component. -->
<!-- Op dit moment zijn er geen stijlen gedefinieerd. -->
<style scoped>

</style>