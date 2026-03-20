package com.example.taskmanager.service;

import com.example.taskmanager.model.Task;
import com.example.taskmanager.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TaskService {

  private final TaskRepository taskRepository;

  public List<Task> getAllTasks() {
    return taskRepository.findAllByOrderByIdDesc();
  }

  public Optional<Task> getTaskById(Long id) {
    return taskRepository.findById(id);
  }

  public Task createTask(Task task) {
    if (task.getTitle() == null || task.getTitle().isBlank()) {
      throw new IllegalArgumentException("Title cannot be empty");
    }
    return taskRepository.save(task);
  }

  public Task updateTask(Long id, Task taskDetails) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

    task.setTitle(taskDetails.getTitle());
    task.setDescription(taskDetails.getDescription());
    task.setStatus(taskDetails.getStatus());

    return taskRepository.save(task);
  }

  public Task toggleTaskStatus(Long id) {
    Task task = taskRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

    if (task.getStatus() == Task.TaskStatus.OPEN) {
      task.setStatus(Task.TaskStatus.COMPLETED);
    } else {
      task.setStatus(Task.TaskStatus.OPEN);
    }

    return taskRepository.save(task);
  }

  public void deleteTask(Long id) {
    taskRepository.deleteById(id);
  }
}
