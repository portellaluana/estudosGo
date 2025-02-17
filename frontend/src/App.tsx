import { useEffect, useState } from "react";
import { fetchTasks, createTask, editTask, deleteTask } from "./api";
import { Input } from "./components/inputs/input";
import { Button } from "./components/buttons/button";

interface Task {
  id: number;
  name: string;
  status: string;
}

function App() {
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ name: "", status: "pendente" });

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }

    loadTasks();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTask(id);
    if (response) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleCreate = async () => {
    const createdTask = await createTask(newTask);
    if (createdTask) {
      setTasks([...tasks, createdTask]);
    }
  };

  const handleEdit = async (id: number) => {
    const updatedTask = { name: "Nova tarefa editada", status: "concluída" };
    const task = await editTask(id, updatedTask);
    if (task) {
      setTasks(tasks.map((t) => (t.id === id ? task : t)));
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() === "") return;

    const newTask = { name: taskName, status: "pendente" };
    const createdTask = await createTask(newTask);

    if (createdTask) {
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setTaskName("");
    }
  };

  return (
    <div>
      <h1>Frontend React</h1>
      <Input value={taskName} onChange={handleInputChange} className="mb-4" />
      <Button text="Adicionar Tarefa" onClick={handleAddTask} />
      <h2>Lista de Tarefas</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.name} - {task.status}
            <button onClick={() => handleEdit(task.id)}>Editar</button>
            <button onClick={() => handleDelete(task.id)}>Deletar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
