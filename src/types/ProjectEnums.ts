export enum TaskStatus {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Completed = "Completed",
}

export enum TaskType{
    //  is it a task with a deadline, or it's scheduled during some time of day
    Deadline = "Deadline",
    Scheduled = "Scheduled",
}