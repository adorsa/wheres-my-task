import { Task } from "../../core/models/task";
import { TaskStatus } from "../../core/models/task-status";
import { TaskDb } from "./task-db.model";

export class TaskMapper {
    static fromDb(db: TaskDb): Task {
        return {
            id: db.id,
            title: db.title,
            description: db.description ?? undefined,
            status: db.status as TaskStatus,
            timeConstraint: db.time_start || db.time_end ? {
                start: db.time_start ? new Date(db.time_start) : undefined,
                end: db.time_end ? new Date(db.time_end) : undefined
            } : undefined,
            locationConstraint: db.latitude !== null && db.longitude !== null ? {
                latitude: db.latitude,
                longitude: db.longitude
            } : undefined,
            createdAt: new Date(db.created_at)
        };
    }
}