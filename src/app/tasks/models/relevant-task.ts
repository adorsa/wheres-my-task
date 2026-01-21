import { Task } from "../../core/models/task";

export interface RelevantTask {
    task: Task;
    relevanceScore: number;
    isOverdue: boolean;
}
