<!-- In het <script> gedeelte van een Vue-component importeren we eerst andere componenten die we nodig hebben. -->
<!-- Hier importeren we enkel het ToDoApp-component vanuit de directory 'components'. -->
<script setup>
import ToDoApp from '@/components/ToDoApp.vue';
</script>

<!-- Het <template> gedeelte is waar we beschrijven wat er gerenderd moet worden van deze component. -->
<!-- In dit geval renderen we gewoon het ToDoApp-component dat we bovenaan hebben geïmporteerd. -->
<template>
  <header>
    <div class="text-center bg-black py-3">
      <h1 class="text-center bg-white m-0 px-5 rounded-2 border border-2 d-inline">
        Clono
      </h1>
    </div>
  </header>
  <to-do-app></to-do-app>
  <footer class="bg-light-subtle text-center fixed-bottom py-2">
    <p class="m-0">Groepswerk van Anik, Ruben & Natanael</p>
  </footer>
</template>

<!-- In het <style> gedeelte kunnen we CSS schrijven om dit specifieke component op te maken. -->
<!-- Omdat het attribuut "scoped" aanwezig is, zullen de stijlen die we hier schrijven alleen van toepassing zijn op dit component. -->
<!-- Op dit moment zijn er geen stijlen gedefinieerd. -->
<style scoped>

</style>