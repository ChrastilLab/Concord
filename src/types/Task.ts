import {TaskStatus, TaskType} from "./ProjectEnums";
interface Task {
    projectId: number
    taskId: number;
    status: TaskStatus;
    taskName: string;
    type: TaskType;
    endDate: Date;
    startDate?:Date; // if it's type deadline, it doesn't necessarily have a start date
    assignedDate: Date;
    assignedBy: string;
    assignedTo: string;
}


export default Task;