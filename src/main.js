// Eerst importeren we CSS-bestanden die nodig zijn voor de applicatie, inclusief bootstrap- en bootstrap-iconenbibliotheken.
import './assets/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// Vervolgens importeren we de functie "createApp" uit Vue, die gebruikt wordt om een nieuwe Vue-applicaties te starten.
import { createApp } from 'vue'

// We importeren ook de functie "createPinia" uit de Pinia bibliotheek. Pinia is een state management bibliotheek
// die helpt bij het beheer van de toestand van de applicatie.
import { createPinia } from 'pinia'

// Hier importeren we het hoofd Vue-component, genaamd "App". Dit is ons startpunt voor de Vue-applicatie.
import App from './App.vue'

// We maken een nieuwe instantie van de Vue-applicatie met behulp van de "createApp" functie en het App-component.
const app = createApp(App)

// Nu vertellen we onze Vue-applicatie instance om Pinia te gebruiken voor state management.
// Hiermee kunnen we de toestand van onze applicatie, zoals een to-do lijst, beheren en toegankelijk maken in de hele app.
app.use(createPinia())

// Tenslotte, "mounten" we onze Vue-applicatie op een element in onze HTML met de id "app".
// Dit betekent dat de Vue-applicatie zal renderen binnen dit element in de browser.
app.mount('#app')