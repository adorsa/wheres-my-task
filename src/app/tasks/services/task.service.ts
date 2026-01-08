import { Injectable } from '@angular/core';
import { SupabaseService } from '../../core/services/supabase/supabase.service';
import { Task } from '../../core/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private supabase: SupabaseService) {}

  async getTasks(): Promise<Task[]> {
    const {data, error} = await this.supabase
      .getClient()
      .from('tasks')
      .select();

    if(error) {
      throw error;
    }

    return data as Task[];
  }

  async createTask(task: Task): Promise<void> {
    const {error} = await this.supabase
      .getClient()
      .from('tasks')
      .insert(task);

    if(error) {
      throw error;
    }
  }
}
