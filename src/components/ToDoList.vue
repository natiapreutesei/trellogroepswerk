<!-- We beginnen met het importeren van de nodige modules en componenten. -->
<script setup>
// We importeren de "useToDoListStore" functie uit onze store. Deze functie geeft ons toegang tot onze to-do lijst data.
import { useToDoListStore } from '@/stores/toDoList.js'

// We importeren enkele functies uit Vue. Deze functies worden gebruikt om reagerende data en side effects te beheren.
import { ref, watch, onMounted, toRefs } from 'vue'

// We halen onze to-do lijst data op uit de store.
const store = useToDoListStore();

// We definiëren de props die dit component accepteert. Dit component verwacht een "listId" en een "boardId" prop, beide zijn strings.
const props = defineProps({
  listId: String,
  boardId: String
});

// We maken reagerende referenties voor de "boardId" en "listId" props.
const { boardId, listId } = toRefs(props);

// We definiëren een functie om een taak te verwijderen. Deze functie haalt de taak uit de store en update de lijst van taken.
const handleDeleteToDo = (itemId) => {
  listTasks.value = store.deleteToDo(props.boardId, props.listId, itemId);
};

// We definiëren een functie om de voltooiingsstatus van een taak te wisselen. Deze functie wisselt de voltooiingsstatus van de taak in de store en update de lijst van taken.
const handleToggleCompleted = (itemId) => {
  listTasks.value = store.toggleCompleted(props.boardId, props.listId, itemId);
};

// We maken een nieuwe reagerende referentie voor de lijst van taken.
const listTasks = ref([]);

// We definiëren een functie om de lijst van taken te updaten. Deze functie haalt de taken uit de store en update de "listTasks" referentie.
const updateTasks = () => {
  const tasks = store.appLists[boardId.value][listId.value]?.tasks;
  if (tasks) {
    listTasks.value = tasks;
  }
};

// We kijken naar de "boardId" en "listId" referenties. Als een van deze verandert, updaten we de lijst van taken.
watch(boardId, updateTasks, { deep: true });
watch(listId, updateTasks, { deep: true });

// We updaten de lijst van taken wanneer het component wordt gemount.
onMounted(updateTasks);

// We definiëren een functie om het einde van een sleepbeweging te verwerken. Deze functie verplaatst de taak naar een andere lijst als nodig en update de lijst van taken.
const handleDragEnd = (evt) => {
  const toListId = evt.to.dataset.listId;
  const fromListId = props.listId;
  const taskId = evt.item.dataset.taskId;

  if (toListId && fromListId && taskId && toListId !== fromListId) {
    store.moveTask(props.boardId, fromListId, props.boardId, toListId, taskId);
    listTasks.value = store.appLists[props.boardId][props.listId]?.tasks || [];
  }
};

// We maken een nieuwe reagerende referentie voor het element dat wordt gesleept.
const draggingElement = ref(null);

// We definiëren een functie om het begin van een sleepbeweging te verwerken. Deze functie voegt een klasse toe aan het element dat wordt gesleept.
const onDragStart = (evt) => {
  draggingElement.value = evt.item;
  draggingElement.value.classList.add('shaking');
};

// We definiëren een functie om het einde van een sleepbeweging te verwerken. Deze functie verwijdert de klasse van het element dat werd gesleept.
const onDragEnd = () => {
  if (draggingElement.value) {
    draggingElement.value.classList.remove('shaking');
    draggingElement.value = null;
  }
};

// We definiëren een functie om het einde van een sleepbeweging te verwerken. Deze functie verwerkt het einde van de sleepbeweging en update de volgorde van de taken in de store.
const onEnd = (evt) => {
  handleDragEnd(evt);
  onDragEnd();
  store.updateTasksOrder(props.boardId, props.listId, listTasks.value);
};
</script>

<!-- Het <template> gedeelte beschrijft wat er gerenderd moet worden door dit component. -->
<template>
  <!-- We maken een container voor ons component. -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <!-- We gebruiken de "drag-item" component om een lijst van taken te maken die kunnen worden gesleept. -->
        <!-- We binden de "listTasks" referentie aan de "v-model" directive. -->
        <!-- We geven aan dat de "id" eigenschap van de taken moet worden gebruikt als sleutel. -->
        <!-- We voegen enkele CSS klassen toe. -->
        <!-- We binden de "onDragStart" functie aan het "start" event. -->
        <!-- We binden de "onEnd" functie aan het "end" event. -->
        <!-- We geven aan dat de taken tot dezelfde groep behoren. -->
        <!-- We binden de "listId" prop aan de "data-list-id" attribute. -->
        <!-- We binden de "boardId" prop aan de "data-board-id" attribute. -->
        <drag-item
          v-model="listTasks"
          itemKey="id"
          class="list-group containerItem"
          @start="onDragStart"
          @end="onEnd"
          group="todoGroup"
          :data-list-id="props.listId"
          :data-board-id="props.boardId"
        >
          <!-- We definiëren een template voor de items in de lijst. -->
          <template #item="{ element }">

            <div :key="element.id" :data-task-id="element.id">
              <!-- We maken een container voor de inhoud van het item. -->
              <div class="list-group-item d-flex flex-row p-0 draggable-item mb-2 ">
                <!-- We maken een container voor de acties van het item. -->
                <div class="d-flex flex-row align-items-center col-3">
                  <!-- We maken een knop om de voltooiingsstatus van het item te wisselen. -->
                  <span @click.stop="handleToggleCompleted(element.id)"><i class="bi bi-check"></i></span>
                  <!-- We maken een knop om het item te verwijderen. -->
                  <span @click="handleDeleteToDo(element.id)" class="del-icon me-3">&#9932;&nbsp;</span>
                </div>
                <!-- We maken een container voor de inhoud en de sleepgreep van het item. -->
                <div class="d-flex justify-content-between col-9">
                  <!-- We tonen de inhoud van het item. -->
                  <span :class="{ completed: element.completed }" class="d-flex align-items-center justify-content-start fw-bold">
                    {{ element.item }}
                  </span>
                  <!-- We maken een sleepgreep voor het item. -->
                  <span class="d-flex align-items-center justify-content-end px-4 text-bg-secondary gripicon">
                    <i class="bi bi-grip-vertical"></i>
                  </span>
                </div>
              </div>
            </div>
          </template>
        </drag-item>
      </div>
    </div>
  </div>
</template>

<style scoped>

.gripicon{
  cursor:pointer;
}

.completed{
  text-decoration: line-through;
  text-decoration-color:red;
}

.del-icon, .bi-check{
  cursor: pointer; /* Verandert de cursor in een handje wanneer je eroverheen gaat */
  transition: color 0.3s; /* Voegt een overgangseffect toe voor een soepele kleurverandering */
}

.del-icon {
  font-size:1.5rem;
}

.bi-check{
  font-size:3rem;
}

.bi-check:hover {
  color: green; /* Verandert de kleur wanneer de muis erover beweegt */
}

.del-icon:hover{
  color: red;
}
@keyframes shake {
  0%, 100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-5px);
  }
  75% {
    transform: translateX(5px);
  }
}
.shaking {
  animation: shake 0.5s ease infinite;
}
.containerItem{
  min-height: 80px;
}
</style>