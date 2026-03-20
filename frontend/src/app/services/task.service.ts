import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'https://bidyut-task-assesment-2.onrender.com/api/tasks';
    private http = inject(HttpClient);

    getTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.apiUrl);
    }

    getTask(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/${id}`);
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.apiUrl, task);
    }

    updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/${id}`, task);
    }

    toggleTaskStatus(id: number): Observable<Task> {
        return this.http.patch<Task>(`${this.apiUrl}/${id}/toggle`, {});
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
