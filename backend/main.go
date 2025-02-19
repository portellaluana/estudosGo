package main

import (
	"fmt"
	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Task struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Status string `json:"status"`
	Stock  int    `json:"stock"` // Certifique-se de que esse campo existe
}

var tasks = []Task{}
var nextID = 1

func main() {
	r := gin.Default()
	r.Use(cors.Default())

	r.GET("/tasks", getTasks)
	r.GET("/tasks/:id", getTaskByID)
	r.POST("/tasks", createTask)
	r.PUT("/tasks/:id", updateTask)
	r.DELETE("/tasks/:id", deleteTask)

	r.Run(":8080")
}

func getTasks(c *gin.Context) {
	c.JSON(http.StatusOK, tasks)
}

func getTaskByID(c *gin.Context) {
	id := c.Param("id")
	for _, task := range tasks {
		if fmt.Sprintf("%d", task.ID) == id {
			c.JSON(http.StatusOK, task)
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "produto não encontrado"})
}

func createTask(c *gin.Context) {
	var newTask Task
	if err := c.BindJSON(&newTask); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "dados insuficientes"})
		return
	}
	newTask.ID = nextID
	nextID++
	tasks = append(tasks, newTask)
	c.JSON(http.StatusCreated, newTask)
}

func updateTask(c *gin.Context) {
	id := c.Param("id")
	for i := range tasks {
		if fmt.Sprintf("%d", tasks[i].ID) == id {
			if err := c.BindJSON(&tasks[i]); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": "dados inválidos"})
				return
			}
			c.JSON(http.StatusOK, tasks[i])
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "produto não encontrado"})
}

func deleteTask(c *gin.Context) {
	id := c.Param("id")
	for i := range tasks {
		if fmt.Sprintf("%d", tasks[i].ID) == id {
			tasks = append(tasks[:i], tasks[i+1:]...)
			c.JSON(http.StatusOK, gin.H{"message": "produto deletado"})
			return
		}
	}
	c.JSON(http.StatusNotFound, gin.H{"message": "produto não encontrado"})
}
