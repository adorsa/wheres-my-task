import { LocationConstraint } from "./location-constraint";
import { TaskStatus } from "./task-status";
import { TimeConstraint } from "./time-constraint";

export interface Task {
    id: string;
    title: string;
    description?: string;

    status: TaskStatus;

    timeConstraint?: TimeConstraint;
    locationConstraint?: LocationConstraint;

    createdAt: Date;
}
