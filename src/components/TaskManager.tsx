
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Trash } from "lucide-react";

type Task = {
  id: string;
  title: string;
  completed: boolean;
  subject: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
};

type Subject = {
  id: string;
  name: string;
  color: string;
};

export function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete Math Homework",
      completed: false,
      subject: "Mathematics",
      dueDate: "2025-04-23",
      priority: "high",
    },
    {
      id: "2",
      title: "Read Chapter 5 of Physics textbook",
      completed: false,
      subject: "Physics",
      dueDate: "2025-04-25",
      priority: "medium",
    },
    {
      id: "3",
      title: "Prepare notes for Literature class",
      completed: true,
      subject: "Literature",
      dueDate: "2025-04-20",
      priority: "low",
    },
  ]);

  const [subjects] = useState<Subject[]>([
    { id: "1", name: "Mathematics", color: "bg-study-blue" },
    { id: "2", name: "Physics", color: "bg-study-purple" },
    { id: "3", name: "Literature", color: "bg-pink-400" },
    { id: "4", name: "Computer Science", color: "bg-green-400" },
    { id: "5", name: "History", color: "bg-yellow-400" },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

  const handleToggleComplete = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      completed: false,
      subject: "General",
      dueDate: new Date().toISOString().split("T")[0],
      priority: "medium",
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  const getSubjectColor = (subjectName: string) => {
    const subject = subjects.find((s) => s.name === subjectName);
    return subject?.color || "bg-gray-400";
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Study Tasks</h2>
        <div className="flex gap-2">
          <Button
            onClick={() => setFilter("all")}
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            className={filter === "all" ? "bg-study-purple" : ""}
          >
            All
          </Button>
          <Button
            onClick={() => setFilter("pending")}
            variant={filter === "pending" ? "default" : "outline"}
            size="sm"
            className={filter === "pending" ? "bg-study-purple" : ""}
          >
            Pending
          </Button>
          <Button
            onClick={() => setFilter("completed")}
            variant={filter === "completed" ? "default" : "outline"}
            size="sm"
            className={filter === "completed" ? "bg-study-purple" : ""}
          >
            Completed
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          className="flex-grow"
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTask();
          }}
        />
        <Button onClick={handleAddTask} className="bg-study-blue">
          <Plus className="h-5 w-5" />
          Add Task
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Add some tasks to get started!
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-3 flex-grow">
                    <button
                      onClick={() => handleToggleComplete(task.id)}
                      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                        task.completed
                          ? "bg-study-purple border-study-purple"
                          : "border-gray-300"
                      }`}
                    >
                      {task.completed && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </button>
                    <div className="flex-grow">
                      <p
                        className={`text-sm font-medium ${
                          task.completed ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`inline-block w-2 h-2 rounded-full ${getSubjectColor(
                            task.subject
                          )}`}
                        ></span>
                        <span className="text-xs text-gray-500">
                          {task.subject}
                        </span>
                        <span className="text-xs text-gray-500 ml-2">
                          Due: {task.dueDate}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManager;
