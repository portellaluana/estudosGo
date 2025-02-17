export async function fetchTasks() {
  try {
    const response = await fetch("http://localhost:8080/tasks");
    if (!response.ok) {
      throw new Error("Erro ao buscar tarefas");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function createTask(task: { name: string; status: string }) {
  try {
    const response = await fetch("http://localhost:8080/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Erro ao criar tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function editTask(
  id: number,
  updatedTask: { name: string; status: string }
) {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    if (!response.ok) {
      throw new Error("Erro ao editar tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function deleteTask(id: number) {
  try {
    const response = await fetch(`http://localhost:8080/tasks/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Erro ao deletar tarefa");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
