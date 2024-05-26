import {ProjectStatus, ProjectType} from "./ProjectEnums";
interface Task {
    projectId: number
    taskId: number;
    status: ProjectStatus;
    taskName: string;
    type: ProjectType;
    endDate: Date;
    startDate?:Date; // if it's type deadline, it doesn't necessarily have a start date
    assignedDate: Date;
}


export default Task;