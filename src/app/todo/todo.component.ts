import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITask } from '../models/tasks';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  tasks: ITask[] = [];
  inProgress: ITask[] = [];
  done: ITask[] = [];
  todo!: FormGroup;
  updateIndex!: any;
  isEditEnabled: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.todo = this.formBuilder.group({
      item: ['', Validators.required]
    });
  }

  addTask() {
    this.tasks.push({
      description: this.todo.value.item,
      done: false,
    })
    this.todo.reset();
  }

  onUpdate() {
    this.tasks[this.updateIndex].description = this.todo.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todo.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  onEdit(item: ITask, i: number) {
    this.todo.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1)
  }

  deleteProgressTask(i: number) {
    this.inProgress.splice(i, 1)
  }

  deleteDoneTask(i: number) {
    this.done.splice(i, 1)
  }

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
