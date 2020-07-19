import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task'
import { TasksService } from '../tasks.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  // Kullanıcıya gösterilecek görevler arrayi
  tasks: Task[];

  // Görevleri filtrelemek için kullanılacak string
  taskFilter: string = 'günlük'

  // Bildirim göstermek için kullanılacak string
  notification: string = ''

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.getTasks()
  }

  /* Servisten tüm görevleri alır ve kategorisine göre
     filtreler, default olarak günlük kategorisi seçilidir.
  */
  getTasks(): void {
    this.tasks = this.tasksService.getTasks().filter(t => t.category === this.taskFilter)
    this.notification = `${this.tasks.length} adet ${this.taskFilter} görev bulundu.`
  }

  /* Görevler default olarak yapılmadı şeklinde oluşturulur.
    Görevin yapılıp yapılmama durumunu bir switch şeklinde
    değiştirir.  
  */
  switchTaskDone(task: Task): void {
    this.tasks = this.tasksService.switchTaskDone(task).filter(t => t.category === this.taskFilter)
    if (task.done) {
      this.notification = `${task.task} görevi geri alındı.`
    } else {
      this.notification = `${task.task} görevi tamamlandı.`
    }
  }

  // Argüman olarak verilen görevi siler
  deleteTask(task: Task): void {
    this.tasks = this.tasksService.deleteTask(task).filter(t => t.category === this.taskFilter)
    this.notification = `${task.task} görevi silindi.`
  }

  /* Child componentte görevler yaratılır ve parent componente
    yeni yaratılan görev ile tüm görevleri içeren bir obje döner.
    Childdan dönen task arrayini parent componente set eder,
    yeni eklenen görevi notification'a yazar.
  */
  createTask(tasksObj): void {
    this.tasks = tasksObj.tasks.filter(t => t.category === this.taskFilter)
    this.notification = `${tasksObj.newTask.task} ${tasksObj.newTask.category} görevi eklendi.`
  }

  
  /* Görevleri servisten çağırıp, argüman olarak verilen
    filtreye göre filtreler.
   */
  filterTasks(filter: string): void {
    this.taskFilter = filter
    let filteredTasks: Task[] = this.tasksService.getTasks().filter(t => t.category === this.taskFilter)
    this.tasks = filteredTasks
    this.notification = `${this.tasks.length} adet ${this.taskFilter} görev bulundu.`
    console.log(this.notification)
  }

  // Seçili kategörideki tamamlanmış görevleri siler.
  deleteDone(filter: string): void {
    this.tasks = this.tasksService.deleteDone(filter).filter(t => t.category === this.taskFilter)
    this.notification = `Tamamlanan ${this.taskFilter} görevler silindi.`
  }

  // Seçili kategörideki tüm görevleri siler.
  deleteAll(filter: string): void {
    this.tasks = this.tasksService.deleteAll(filter).filter(t => t.category === this.taskFilter)
    this.notification = `Tüm ${this.taskFilter} görevler silindi.`
  }
}
