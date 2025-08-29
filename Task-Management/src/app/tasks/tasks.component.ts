import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Task } from '../models/task.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;

  constructor(private api: ApiService, private router: Router, private auth: AuthService) {}

  ngOnInit(): void { this.load(); }

  load() {
    this.loading = true;
    this.api.getTasks().subscribe({
      next: (data) => { this.tasks = data; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  add() {
    this.router.navigate(['/tasks/new']);
  }

  edit(t: Task) {
    this.router.navigate(['/tasks', t.taskId, 'edit']);
  }

  markComplete(t: Task) {
    if (!t.taskId) return;
    this.api.updateTask(t.taskId, { status: 'COMPLETED' }).subscribe(() => this.load());
  }

  delete(t: Task) {
    if (!t.taskId) return;
    if (confirm('Delete this task?')) {
      this.api.deleteTask(t.taskId).subscribe(() => this.load());
    }
  }
}