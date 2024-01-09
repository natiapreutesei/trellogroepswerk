// We importeren de CSS-bestanden die nodig zijn voor onze applicatie. Dit zijn de stijlen die onze app er goed uit laten zien.
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// We importeren de "createApp" functie uit Vue. Deze functie wordt gebruikt om een nieuwe Vue-applicatie te maken.
import { createApp } from 'vue'

// We importeren de "createPinia" functie uit de Pinia bibliotheek. Pinia is een bibliotheek die ons helpt bij het beheren van de toestand van onze applicatie.
import { createPinia } from 'pinia'

// We importeren het hoofdcomponent van onze Vue-applicatie, genaamd "App". Dit is het startpunt van onze Vue-applicatie.
import App from './App.vue'

// We importeren de "draggable" bibliotheek. Deze bibliotheek maakt het mogelijk om elementen in onze app te verslepen.
import draggable from 'vuedraggable'

// We maken een nieuwe instantie van onze Vue-applicatie. We geven het "App" component mee als parameter.
const app = createApp(App)

// We vertellen onze Vue-applicatie om de Pinia bibliotheek te gebruiken. Hiermee kunnen we de toestand van onze applicatie beheren.
app.use(createPinia())

// We registreren de "draggable" bibliotheek als een component in onze Vue-applicatie. We kunnen dit component nu in onze app gebruiken.
app.component('drag-item', draggable);

// We "mounten" onze Vue-applicatie op een element in onze HTML met de id "app". Dit betekent dat onze Vue-applicatie binnen dit element zal worden weergegeven.
app.mount('#app')