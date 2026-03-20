import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

@Component({
    selector: 'app-task-manager',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './task-manager.component.html',
    styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {
    private taskService = inject(TaskService);

    tasks: Task[] = [];
    newTask: Task = { title: '', description: '', status: 'OPEN' };
    editingTask: Task | null = null;
    loading = false;
    errorMessage = '';

    ngOnInit() {
        this.loadTasks();
    }

    loadTasks() {
        this.loading = true;
        this.taskService.getTasks().subscribe({
            next: (tasks) => {
                this.tasks = tasks;
                this.loading = false;
            },
            error: (err) => {
                this.errorMessage = 'Failed to load tasks. Make sure the backend is running.';
                this.loading = false;
            }
        });
    }

    addTask() {
        if (!this.newTask.title.trim()) {
            this.errorMessage = 'Title is required';
            return;
        }
        this.errorMessage = '';
        this.taskService.createTask(this.newTask).subscribe({
            next: (task) => {
                this.tasks.unshift(task);
                this.newTask = { title: '', description: '', status: 'OPEN' };
            },
            error: (err) => {
                this.errorMessage = 'Failed to add task.';
            }
        });
    }

    toggleStatus(task: Task) {
        if (!task.id) return;
        this.taskService.toggleTaskStatus(task.id).subscribe({
            next: (updatedTask) => {
                const index = this.tasks.findIndex(t => t.id === updatedTask.id);
                if (index !== -1) {
                    this.tasks[index] = updatedTask;
                }
            }
        });
    }

    deleteTask(id: number | undefined) {
        console.log('deleteTask called for id:', id);
        if (!id) return;

        this.taskService.deleteTask(id).subscribe({
            next: () => {
                console.log('Delete successful for id:', id);
                this.tasks = this.tasks.filter(t => t.id !== id);
            },
            error: (err) => {
                console.error('Delete failed:', err);
                this.errorMessage = 'Failed to delete task. Check console for details.';
            }
        });
    }

    startEdit(task: Task) {
        this.editingTask = { ...task };
    }

    cancelEdit() {
        this.editingTask = null;
    }

    updateTask() {
        if (!this.editingTask?.id) return;
        if (!this.editingTask.title.trim()) {
            this.errorMessage = 'Title is required';
            return;
        }

        this.taskService.updateTask(this.editingTask.id, this.editingTask).subscribe({
            next: (updatedTask) => {
                const index = this.tasks.findIndex(t => t.id === updatedTask.id);
                if (index !== -1) {
                    this.tasks[index] = updatedTask;
                }
                this.editingTask = null;
            },
            error: (err) => {
                this.errorMessage = 'Failed to update task.';
            }
        });
    }
}
