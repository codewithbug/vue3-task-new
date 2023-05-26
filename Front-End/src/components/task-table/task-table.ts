import { ref, onMounted } from 'vue';
import { Task } from '../../models/task-model';
import { TaskService } from '../../services/task-service';
export default {
  name: 'taskTable',
  setup() {

    const tasks = ref<Task[]>([]);

    const newTask = ref<Task>({
      id:0,
      title: '',
      description:"",
      status: 'Opened',

    });

    const editModalData = ref<Task>({
      id:0,
      title: '',
      description:"",
      status: 'Opened',

    })

    const deleteModalData = ref<Task>({
      id:0,
      title: '',
      description:"",
      status: 'Opened',

    })

    let deleteIndex  =  -1;
    let editIndex = -1;


    const newTaskModalIsOpen = ref(false)

    const createSpinnerIsActive = ref(false)

    const editModalIsOpen = ref(false)

    const editSpinnerIsActive = ref(false)

    const deleteModalIsOpen = ref(false)

    const deleteSpinnerIsActive = ref(false);

    function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function openNewTaskModal() {
      newTaskModalIsOpen.value = true
    }

    function closeNewTaskModal(){
      newTaskModalIsOpen.value = false
    }

    function openEditModal(){
      editModalIsOpen.value = true
    }

    function closeEditModal(){
      editModalIsOpen.value = false
    }

    function openDeleteModal(){

      deleteModalIsOpen.value = true
      
    }

    function closeDeleteModal(){

      deleteModalIsOpen.value = false

    }

    function activateDeleteSpinner(){

      deleteSpinnerIsActive.value = true

    }

    function deactivateDeleteSpinner(){

      deleteSpinnerIsActive.value = false

    }

    function activateEditSpinner(){

      editSpinnerIsActive.value = true
    }

    function deactivateEditSpinner(){

      editSpinnerIsActive.value = false;
    }

    function activateCreateSpinner(){

      createSpinnerIsActive.value = true
    }

    function deactivateCreateSpinner(){

      createSpinnerIsActive.value = false
    }

    function checkIfEditDataIsNotEmpty(){

      return editModalData.value.id && editModalData.value.title &&  editModalData.value.description && editModalData.value.status
    }

    function setEditModalData(taskData:Task){


      editModalData.value = {...taskData}

    }

    function setEditIndex (taskIndex : number){

      editIndex = taskIndex;
    }

    function setDeleteModalData ( taskData:Task){

      deleteModalData.value = {...taskData}
    }

    function setDeleteIndex (taskIndex : number){

      deleteIndex = taskIndex;
    }

    async function fetchTasks() {

      let taskData = await new TaskService().getTasks();

      tasks.value = taskData;

    }

    function onEditClick(taskData:Task , taskIndex : number){

      setEditModalData(taskData);

      setEditIndex(taskIndex);

      openEditModal();


    }

    function resetNewTask(){

      newTask.value = {
        id:0,
        title: '',
        description : "",
        status: 'Opened',

      };

    }

    async function createTask() {

      activateCreateSpinner();

      await sleep(1000);

      const result = await new TaskService().createTask(newTask.value);

      if(result){

        deactivateCreateSpinner();

        tasks.value.push({...newTask.value});

        resetNewTask();

        closeNewTaskModal();


      }


    }

    

    async function editTask() {

      if( checkIfEditDataIsNotEmpty() ){

        activateEditSpinner();

        await sleep(1000);

        const updateTask = await new TaskService().updateTask(editModalData.value);

        if(updateTask){
          deactivateEditSpinner();
          tasks.value.splice(editIndex,1,editModalData.value);
          closeEditModal();
        }
      }
    }


    function onDeleteClick (taskData:Task , taskIndex : number){

      setDeleteModalData(taskData);

      setDeleteIndex(taskIndex);

      openDeleteModal();
    }


    async function deleteTask() {

      activateDeleteSpinner();

      await sleep(1000);

      const deleteResult = await new TaskService().deleteTask(deleteModalData.value.id);

      if(deleteResult){
        deactivateDeleteSpinner();
        tasks.value.splice(deleteIndex,1);
        closeDeleteModal();
      }
    }



    onMounted(fetchTasks);

    return {
      newTaskModalIsOpen,
      resetNewTask,
      createSpinnerIsActive,
      activateCreateSpinner,
      deactivateCreateSpinner,
      editModalIsOpen,
      openNewTaskModal,
      closeNewTaskModal,
      openEditModal,
      closeEditModal,
      tasks,
      newTask,
      editModalData,
      createTask,
      editTask,
      deleteModalData,
      deleteModalIsOpen,
      setDeleteIndex,
      deleteIndex,
      openDeleteModal,
      closeDeleteModal,
      setDeleteModalData,
      onDeleteClick,
      deleteTask,
      activateDeleteSpinner,
      deactivateDeleteSpinner,
      deleteSpinnerIsActive,
      onEditClick,
      editSpinnerIsActive,
      activateEditSpinner,
      deactivateEditSpinner,
      setEditModalData,
      checkIfEditDataIsNotEmpty
      
    }
  }
}