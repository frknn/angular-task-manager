import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Task } from '../models/task'
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task-input',
  templateUrl: './task-input.component.html',
  styleUrls: ['./task-input.component.css']
})
export class TaskInputComponent implements OnInit {

  /* Parent componentteki task arrayini güncellemek için
    kullanılacak fonksiyon.
    Eklenen yeni görevi ve tüm görevler arrayini içeren bir
    obje döndürür.
   */
  @Output() addNewTask = new EventEmitter<{}>();

  /* tasks: Parenta döndürülecek taskleri tutan array 
     newTask: Oluşturulacak görevi tutan Task objesi
     taskInput: Görev tanımı
     done: Görevin tamamlanma durumu, default olarak false,
     category: Kullanıcının görev için seçtiği kategori
  */
  tasks: Task[];
  newTask: Task;
  taskInput: string = ""
  done: boolean = false
  category: string = "günlük"

  /* Girilen inputlara göre yeni bir görev oluşturup
    parent componente döndüren fonksiyon
   */
  createTask(): void {

    if(!this.taskInput){
      alert('Lütfen görev alanını doldurunuz!')
      return;
    }

    let date: Date = new Date()

    if (this.category === "günlük") {
      date.setDate(date.getDate() + 1)
    } else if (this.category === "haftalık") {
      date.setDate(date.getDate() + 7)
    } else {
      date.setDate(date.getDate() + 30)
    }

    this.newTask = {
      id: Math.random() * 1000 + 1,
      task: this.taskInput,
      done: this.done,
      category: this.category,
      deadline: date
    }

    this.tasks = this.tasksService.addTask(this.newTask)
    this.addNewTask.emit({tasks: this.tasks, newTask: this.newTask})
    this.taskInput = ""
  }

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
  }

}
