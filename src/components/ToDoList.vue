<script setup>
import { useToDoListStore } from '@/stores/toDoList.js'
import { ref, watch, onMounted, toRefs } from 'vue'

const store = useToDoListStore();
const props = defineProps({
  listId: String,
  boardId: String
});

const { boardId, listId } = toRefs(props);

const handleDeleteToDo = (itemId) => {
  listTasks.value = store.deleteToDo(props.boardId, props.listId, itemId);
};

const handleToggleCompleted = (itemId) => {
  listTasks.value = store.toggleCompleted(props.boardId, props.listId, itemId);
};

const listTasks = ref([]);

const updateTasks = () => {
  const tasks = store.appLists[boardId.value][listId.value]?.tasks;
  if (tasks) {
    listTasks.value = tasks;
    console.log('listTasks updated:', listTasks.value);
  }
};

watch(boardId, updateTasks, { deep: true });
watch(listId, updateTasks, { deep: true });

onMounted(updateTasks);



const handleDragEnd = (evt) => {
  const toListId = evt.to.dataset.listId;
  const fromListId = props.listId;
  const taskId = evt.item.dataset.taskId;

  if (toListId && fromListId && taskId && toListId !== fromListId) {
    console.log(`Moving task ID ${taskId} from list ID ${fromListId} to list ID ${toListId}`);
    store.moveTask(props.boardId, fromListId, props.boardId, toListId, taskId);
    listTasks.value = store.appLists[props.boardId][props.listId]?.tasks || [];
  }
};

const draggingElement = ref(null);

const onDragStart = (evt) => {
  draggingElement.value = evt.item;
  draggingElement.value.classList.add('shaking');
};

const onDragEnd = () => {
  if (draggingElement.value) {
    draggingElement.value.classList.remove('shaking');
    draggingElement.value = null;
  }
};

const onEnd = (evt) => {
  handleDragEnd(evt);
  onDragEnd();
  store.updateTasksOrder(props.boardId, props.listId, listTasks.value);
};



</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <drag-item v-model="listTasks" itemKey="id" class="list-group containerItem" @start="onDragStart" @end="onEnd" group="todoGroup" :data-list-id="props.listId" :data-board-id="props.boardId">
          <template #item="{ element }">
            <div :key="element.id" :data-task-id="element.id">
              <div class="list-group-item d-flex flex-row p-0 draggable-item mb-2 ">
                <div class="d-flex flex-row align-items-center col-3">
                  <span @click.stop="handleToggleCompleted(element.id)"><i class="bi bi-check"></i></span>
                  <span @click="handleDeleteToDo(element.id)" class="del-icon me-3">&#9932;&nbsp;</span>
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
.containerItem{
  min-height: 80px;
}
</style>