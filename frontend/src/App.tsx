import { useEffect, useState } from "react";
import { fetchTasks, createTask, editTask, deleteTask } from "./api";
import { Input } from "./components/inputs/Input";
import { Button } from "./components/buttons/Button";
import { ListItem } from "./components/ListItem/ListItem";
import { Checkbox } from "./components/checkbox/Checkbox";

interface Task {
  id: number;
  name: string;
  status: string;
}

function App() {
  const [taskName, setTaskName] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks();
      setTasks(data);
    }
    loadTasks();
  }, []);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsNew((prev) => !prev);
  };

  const handleDelete = async (id: number) => {
    const response = await deleteTask(id);
    if (response) {
      setTasks(tasks.filter((t) => t.id !== id));
    }
  };

  const handleEdit = async (id: number) => {
    const updatedTask = { name: "Nova tarefa editada", status: "novo" };
    const task = await editTask(id, updatedTask);
    if (task) {
      setTasks(tasks.map((t) => (t.id === id ? task : t)));
    }
  };

  const handleAddTask = async () => {
    if (taskName.trim() === "") return;

    const newTask = { name: taskName, status: isNew ? "novo" : "usado" };
    const createdTask = await createTask(newTask);

    if (createdTask) {
      setTasks((prevTasks) => [...prevTasks, createdTask]);
      setTaskName("");
      setIsNew(true);
    }
  };

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Lojinha em Go
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "16px",
          width: "100%",
        }}
      >
        <Input
          value={taskName}
          onChange={handleNameChange}
          placeholder="Digite o nome do produto"
        />
        <Checkbox
          checked={isNew}
          onChange={handleCheckboxChange}
          label="Produto novo?"
        />
      </div>
      <Button text="adicionar item" onClick={handleAddTask} />
      <div>
        <h2>Itens à venda</h2>
        {tasks.length ? (
          <ul>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                id={task.id}
                name={task.name}
                status={task.status}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        ) : (
          <p>Sem itens no momento</p>
        )}
      </div>
    </div>
  );
}

export default App;
