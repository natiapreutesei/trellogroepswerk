<script setup>
// We importeren de `useToDoListStore` functie uit onze `toDoList.js` store.
// Deze functie stelt ons in staat om onze to-do list store te gebruiken, die onze to-do data bevat.
import { useToDoListStore } from '@/stores/toDoList.js'
// Importing 'ref' and 'watch' from Vue's Composition API.
import { ref, watch } from 'vue'

// We creëren een instantie van onze to-do list store
const store = useToDoListStore();
const props = defineProps({
  listId: String
});
// Creating a reactive reference 'listTasks' initialized with an empty array.
// 'listTasks' will be reactive and can react to changes.
const listTasks = ref([]);

// Setting up a watcher to observe changes in the tasks array of a specific list.
// It watches the tasks of the list with the ID 'props.listId' in 'store.appLists'.
watch(() => store.appLists.find(l => l.id === props.listId)?.tasks, (newTasks) => {
  // When the watched tasks change, this callback updates 'listTasks'.
  // If 'newTasks' is undefined (e.g., no list found), it defaults to an empty array.
  listTasks.value = newTasks || [];
}, { deep: true }); // 'deep: true' makes the watcher sensitive to deep/nested changes.

// Defining a function to handle the end of a drag-and-drop operation.
const handleDragEnd = (evt) => {
  const toListId = evt.to.dataset.listId;
  const fromListId = props.listId;
  const taskId = evt.item.dataset.taskId;  // Use evt.item for the task ID

  // Logic for moving task to a different list
  if (toListId && fromListId && taskId && toListId !== fromListId) {
    console.log(`Moving task ID ${taskId} from list ID ${fromListId} to list ID ${toListId}`);
    store.moveTask(fromListId, toListId, taskId);
    listTasks.value = store.appLists.find(l => l.id === fromListId)?.tasks || [];
  }
};

const handleDeleteToDo = (itemId) => {
  listTasks.value = store.deleteToDo(props.listId, itemId);
};

const handleToggleCompleted = (itemId) => {
  listTasks.value = store.toggleCompleted(props.listId, itemId);
};

const draggingElement = ref(null);

const onDragStart = (evt) => {
  draggingElement.value = evt.item; // Store the reference of the dragging item
  draggingElement.value.classList.add('shaking');
};

const onDragEnd = () => {
  if (draggingElement.value) {
    draggingElement.value.classList.remove('shaking');
    draggingElement.value = null; // Clear the reference
  }
};

const onEnd = (evt) => {
  handleDragEnd(evt); // Handles the logic for dragging items
  onDragEnd(); // Removes the shaking class
};
</script>

<template>
  <!-- In het <template> gedeelte van onze code definiëren we de structuur van onze ToDoList-component in HTML. -->
  <!-- Deze code zal worden gerendered om het lijstgedeelte van onze app weer te geven. -->
  <div class="container">
    <div class="row">
      <div class="col-12">
        <drag-item v-model="listTasks" itemKey="id" class="list-group" @start="onDragStart" @end="onEnd" group="todoGroup" :data-list-id="props.listId">
          <template #item="{ element }">
            <div :key="element.id" :data-task-id="element.id">
              <div class="list-group-item d-flex flex-row p-0 draggable-item mb-2">
                <div class="d-flex flex-row align-items-center col-3">
                  <span @click.stop="handleDeleteToDo(element.id)"><i class="bi bi-check"></i></span>
                  <span @click="handleToggleCompleted(element.id)" class="del-icon me-3">&#9932;&nbsp;</span>
                </div>
                <div class="d-flex justify-content-between col-9">
                  <span :class="{ completed: element.completed }" class="d-flex align-items-center justify-content-start fw-bold">
                    {{ element.item }}
                  </span>
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
</style>