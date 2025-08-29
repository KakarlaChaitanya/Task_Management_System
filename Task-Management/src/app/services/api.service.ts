import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, User } from '../models/task.model';
import { environment } from '../../environments/environment';



@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Auth
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/login`, { email, password });
  }

  signup(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/auth/signup`, user);
  }

  // Users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  addUser(user: Partial<User>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/users/${userId}`);
  }

  //Tasks 
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks`);
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.baseUrl}/tasks/${id}`);
  }

  addTask(task: Partial<Task>): Observable<Task> {
    return this.http.post<Task>(`${this.baseUrl}/tasks`, task);
  }

  updateTask(taskId: number, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.baseUrl}/tasks/${taskId}`, task);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/tasks/${taskId}`);
  }

  // Tasks for currently logged-in user
  getTasksByUser(userId: number): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.baseUrl}/tasks/user/${userId}`);
  }

  markComplete(taskId: number): Observable<Task> {
    return this.http.patch<Task>(`${this.baseUrl}/tasks/${taskId}`, { status: 'COMPLETED' });
  }
}
