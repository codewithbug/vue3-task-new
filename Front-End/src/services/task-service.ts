import axios from 'axios';
import { Task } from '../models/task-model';

const API_URL = 'http://localhost:3500/tasks';

export class TaskService {
    
  async getTasks(): Promise<Task[]> {

    try{

      const request = await axios.get(API_URL);

      const response = request.data

      if(response.success){

        let tasks = response.result;

        return tasks;

      }else{

        throw new Error('error while fetching tasks');

      }

    }catch(err){

      throw new Error('error while fetching tasks');

    }


  }

  async createTask(task: Task): Promise<Boolean> {

    try{

      const request = await  axios.post(`${API_URL}` , task);

      const response = request.data;

      if( response.success ){

        return true
      }else{
        throw new Error ("error ocurred while creating task")
      }
      

    }catch(err){

      throw new Error ("error ocurred while creating task")

    }

  }

  async updateTask(task: Task): Promise<Boolean> {

    try{
    
      const request = await axios.put(`${API_URL}/${task.id}`, task);

      const response = request.data;

      if( response.success ){

        return true
      }else{
        throw new Error ("error ocurred while updating task")
      }
    
    }catch(err){

      throw new Error ("error ocurred while updating task")

    }

  }

  async deleteTask(taskId: number): Promise<Boolean> {

    try{

      const request = await axios.delete(`${API_URL}/${taskId}`);

      const response = request.data;
      
      if( response.success ){

        return true
      }else{
        throw new Error ("error ocurred while updating task")
      }

    }catch(err){

      throw new Error ("error ocurred while updating task")

    }


  }
}