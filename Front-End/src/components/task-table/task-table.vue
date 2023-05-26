<template>

    <div class="bg-white-500 ring-1 ring-slate-900/10 p-5 pb-0 w-5/6 mx-auto mt-5">

        <!--      Add New Task Button      -->
        <div class="text-right"> <button class="bg-blue-600 text-white rounded-full py-2 px-5" @click="openNewTaskModal">New Task</button> </div>

        <!--      Task Table      -->
        <table class="border-collapse table-auto w-full">

            <thead class=" text-left">
                <tr>
                    <th  class="py-5 "> Title</th>
                    <th  class="py-5 "> Description</th>
                    <th  class="py-5 "> Status</th>
                    <th  class="py-5 text-center "> Operations</th>
                </tr>
            </thead>

            <tbody>

                <tr v-for="( task , index ) in tasks" :key="tasks.id" class="border-t border-slate-200">
                    <td  class="py-5 " > {{ task.title  }}</td>
                    <td  class="py-5 " > {{ task.description }}</td>
                    <td  class="py-5 " > {{ task.status  }} </td>
                    <td class="text-center"> 
                        <button class="border-none bg-blue-600 text-white font-bold rounded-md px-5 py-1 mx-2" @click="onEditClick(task,index)"> edit </button>

                        <button class="border-none bg-red-600 text-white font-bold rounded-md px-5 py-1 mx-2" @click="onDeleteClick(task,index)"> delete </button>

                    
                    </td>
                </tr>

                
            </tbody>

        </table>

        <!--      Add New Task Modal -->
        <div v-show="newTaskModalIsOpen" class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-500/50 flex flex-wrap justify-center items-center">

            <div class="border bg-white w-1/3 ">

                <div class="text-right pe-3 pt-3">
                    <button class="bg-blue-600 text-white rounded-full w-7 h-7 leading-none font-bold text-base   font-['Arial']" @click="closeNewTaskModal"> x </button>
                </div>

                <div class="px-10 ">

                    <div class="my-5 mx-auto">
                        <input class="border py-2 px-5 w-full" type="text" placeholder="title" v-model="newTask.title">
                    </div>

                    <div class="my-5  mx-auto ">
                        <textarea class="border py-2  px-5 w-full" rows="10" placeholder="description" v-model="newTask.description"></textarea>
                    </div>

                    <div class="my-5  mx-auto "> 
                        <select class="border rounded-md w-full py-2 px-5" v-model="newTask.status">
                            <option>In progress</option>
                            <option>Done</option>
                            <option>Opened</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div class="my-10 text-center mx-auto "> 
                        <button class="w-1/2 bg-blue-600 py-3 rounded-full text-white flex flex-wrap items-center justify-center mx-auto" @click="createTask"> 
                            
                            <svg v-show="createSpinnerIsActive" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            
                            <span>
                                Create Task
                            </span>

                        </button>

                    </div>

                </div>



            </div>

        </div>

        <!--      Edit Task Modal      -->
        <div v-show="editModalIsOpen" class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-500/50 flex flex-wrap justify-center items-center">

            <div class="border bg-white w-1/3 ">

                <div class="text-right pe-3 pt-3">
                    <button class="bg-blue-600 text-white rounded-full w-7 h-7 leading-none font-bold text-base   font-['Arial']" @click="closeEditModal"> x </button>
                </div>

                <div class="px-10 ">

                    <div class="my-5 mx-auto">
                        <input class="border py-2 px-5 w-full" type="text" placeholder="title" v-model="editModalData.title">
                    </div>

                    <div class="my-5  mx-auto ">
                        <textarea class="border py-2  px-5 w-full" rows="10" placeholder="description" v-model="editModalData.description"></textarea>
                    </div>

                    <div class="my-5  mx-auto "> 
                        <select class="border rounded-md w-full py-2 px-5" v-model="editModalData.status">
                            <option :disabled="editModalData.status == 'Done' || editModalData.status == 'Closed'">In progress</option>
                            <option :disabled="editModalData.status == 'Opened' || editModalData.status == 'Closed'">Done</option>
                            <option :disabled="editModalData.status == 'Done'">Opened</option>
                            <option>Closed</option>
                        </select>
                    </div>

                    <div class="my-10 text-center mx-auto "> 
                        <button class="w-1/2 bg-green-600 py-3 rounded-full text-white mx-auto flex flex-wrap items-center justify-center" @click="editTask"> 
                            
                            <svg v-show="editSpinnerIsActive" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>

                            <span>
                                Save Task 
                            </span>

                        </button>
                    </div>

                </div>


            </div>

        </div>

        <!--      Delete Task Modal      -->
        <div v-show="deleteModalIsOpen" class="fixed top-0 left-0 right-0 bottom-0 z-50 bg-gray-500/50 flex flex-wrap justify-center items-center">

            <div class="border bg-white w-1/3 ">

                <div class="text-right pe-3 pt-3">
                    <button class="bg-blue-600 text-white rounded-full w-7 h-7 leading-none font-bold text-base   font-['Arial']" @click="closeDeleteModal"> x </button>
                </div>

                <div class="px-10 pb-10">

                    <p class="text-center my-10"> Are you sure want to delete <span class="font-bold"> {{ deleteModalData.title }}  ? </span> </p>

                    <div class="text-center bg-white-500 flex flex-wrap items-center justify-center">

                        <button class="border-none font-bold text-white bg-green-500 mx-2 py-1 px-5" @click="closeDeleteModal"> No</button>
                        <button class="border-none font-bold text-white bg-red-500 mx-2 py-1 px-5 flex flex-wrap items-center justify-center" @click="deleteTask"> 
                            
                            <svg v-show="deleteSpinnerIsActive" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>

                            <span> Yes  </span>

                        
                        </button>

                    </div>

                </div>


            </div>

        </div>




        
    </div>


</template>

<script lang="ts"  src="./task-table.ts">

</script>

<style src="./task-table.css"></style>