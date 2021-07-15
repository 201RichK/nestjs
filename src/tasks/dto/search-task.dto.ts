import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTaskFilter {
    @IsOptional()
    @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}