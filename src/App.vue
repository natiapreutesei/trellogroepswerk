<!-- In het <script> gedeelte van een Vue-component importeren we eerst andere componenten die we nodig hebben. -->
<!-- Hier importeren we enkel het ToDoApp-component vanuit de directory 'components'. -->
<script setup>
import ToDoApp from '@/components/ToDoApp.vue';
</script>

<!-- Het <template> gedeelte is waar we beschrijven wat er gerenderd moet worden van deze component. -->
<!-- In dit geval renderen we gewoon het ToDoApp-component dat we bovenaan hebben geïmporteerd. -->
<template>
  <to-do-app></to-do-app>
</template>

<!-- In het <style> gedeelte kunnen we CSS schrijven om dit specifieke component op te maken. -->
<!-- Omdat het attribuut "scoped" aanwezig is, zullen de stijlen die we hier schrijven alleen van toepassing zijn op dit component. -->
<!-- Op dit moment zijn er geen stijlen gedefinieerd. -->
<style scoped>

</style>