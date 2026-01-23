import { Injectable } from '@angular/core';
import { UserLocation } from '../../core/models/user-location';
import { RelevantTask } from '../models/relevant-task';
import { Task } from '../../core/models/task';
import { addHours } from 'date-fns';
import { Geodesic } from 'geographiclib-geodesic';

@Injectable({
  providedIn: 'root'
})
export class TaskRelevanceService {

  //todo temporary constant, will be fetched from user data when auth implemented
  TASK_RELEVANCE_HOURS = 1;
  TASK_RELEVANCE_RANGE_KM = 1;

  constructor() { }

  evaluate(tasks: Task[], now: Date, userLocation?: UserLocation): RelevantTask[] {
    let relTasks: RelevantTask[] = [];
    tasks.forEach(task => {
      if(task.timeConstraint && task.locationConstraint) {
        //todo double constraint logic
      }
      else if(task.timeConstraint) {
        // time constraint logic        

        if(
          (task.timeConstraint!.start && addHours(now, this.TASK_RELEVANCE_HOURS) >= task.timeConstraint.start!) ||
          (task.timeConstraint!.end && addHours(now, this.TASK_RELEVANCE_HOURS) >= task.timeConstraint.end!)
        ) {
          
          
          let isOverdue = false;
          if(task.timeConstraint!.end && now >= task.timeConstraint.end!)
            isOverdue = true;

          //todo add relevance calculation, temporary set to one for all temporary tasks
          relTasks.push({task: task, relevanceScore: 1, isOverdue: isOverdue});
        }
      }
      else if(task.locationConstraint) {
        //location constraint logic

        if(userLocation) {
          let distance = Geodesic.WGS84.Inverse(userLocation.latitude, userLocation.longitude, task.locationConstraint.latitude, task.locationConstraint.longitude);
          //todo manage distance calculation fail
          if(distance.s12 && distance.s12 <= this.TASK_RELEVANCE_RANGE_KM * 1000) {
            //todo add relevance calculation relative to distance from target location
            relTasks.push({task: task, relevanceScore: 1, isOverdue: false});
          }
        }
      }
    });
    return relTasks; // Placeholder implementation
  }
}
