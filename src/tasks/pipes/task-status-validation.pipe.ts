import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform{
  

  readonly allowedStatus = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE
  ]
  /**
   * wll be called by NestJS and handle the transformation
   */
  transform(value: any){
    value = value.toUpperCase();

    if(!this.isStatusValid(value)){
      throw new BadRequestException(`"${value}" is an invalid status`)
    }

    return value;
  }

  private isStatusValid(status:any){
    return this.allowedStatus.includes(status);
  }
}