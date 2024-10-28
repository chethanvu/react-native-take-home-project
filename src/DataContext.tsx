import React, { createContext, useState, useContext } from 'react';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  status : string
}

interface DataContexType {
  tasks: Task[];
  addTask: (task: Task) => void;
  editTask: (id: string, updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const DataContext = createContext<DataContexType | ''>('');

export const TaskContextProvider: React.FC = ( props: any) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const editTask = (id: string, updatedTask: Task) => {
    setTasks(tasks.map(task => (task.id === id ? updatedTask : task)));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <DataContext.Provider value={{ tasks, addTask, editTask, deleteTask, toggleTaskCompletion }}>
      {props.children}
    </DataContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};