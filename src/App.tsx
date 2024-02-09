import Header from "./components/Header";
import Main from "./components/Main/index";
import { Container, Card, CardHeader } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';

const DEFAULT_TODO_LIST = [
  { id: 1, taskName: 'Задача 1', taskDescription: 'Описание 1', taskStatus: false },
  { id: 2, taskName: 'Задача 2', taskDescription: 'Описание 2', taskStatus: false },
  {
    id: 3,
    taskName: 'Задача 3',
    taskDescription:
      'Такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 такое длинное описание задачи 3 ',
    taskStatus: true
  }
];

type Task = {
  id: number;
  taskName: string;
  taskDescription: string;
  taskStatus: boolean;
};

const App = () => {
  const [allTasks, setAllTasks] = useState(DEFAULT_TODO_LIST);
  const [tasks, setTasks] = useState(allTasks);

  const [amountCompletedTasks, setAmountCompletedTasks] = useState<number>(0);
  const [amountUncompletedTasks, setAmountUncompletedTasks] = useState<number>(0);
  
  const [addMode, setMode] = useState(false);

  useEffect(() => {
    updateAmount();
  }, [tasks, allTasks]);


  const deleteTask = (id: Task['id']) => {
    setAllTasks(tasks.filter((task) => task.id !== id));
    setTasks(allTasks);
  };

  const addTask = ({ taskName, taskDescription }: Omit<Task, 'id' | 'taskStatus'>) => {
    const newTasks = allTasks.length ? [ { id: allTasks.length + 1, taskDescription, taskName, taskStatus: false }, ...allTasks] : [{ id: 1, taskDescription, taskName, taskStatus: false }];
    setTasks(newTasks);
    setAllTasks(newTasks);
    setMode(false);
  };

  const searchTask = (searchText: string, filterType: string) => {
    const filteredTasks = filterType ? tasks : allTasks;   
    if (searchText) {
      setTasks(
        filteredTasks.filter((task) => task.taskName.toLowerCase().includes(searchText.toLowerCase()))
      );
    } else {
      setTasks(allTasks);
    }
  };

  const filterTask = (filterType: string) => {
    switch (filterType) {
      case "All":
        setTasks(allTasks);
        break;
      case "Done":
        setTasks(
          allTasks.filter((task) => task.taskStatus)
        );
        break;
      case "Undone":
        setTasks(
          allTasks.filter((task) => !task.taskStatus)
        );
        break;
    }
  };

  const changeTaskStatus = (id: Task['id']) => {
    setAllTasks(
      tasks.map((task) => {
        if (task.id === id) {
          return { ...task, taskStatus: !task.taskStatus };
        }
        return task;
      })
    );
    setTasks(allTasks);
  };

  const updateAmount = () =>  {   
    setAmountCompletedTasks(
      tasks.filter((task: Task) => task.taskStatus && task).length
    );
    setAmountUncompletedTasks(
      tasks.filter((task: Task) => !task.taskStatus && task).length
    );
  };

  return (
    <div className="App">
      <Container maxWidth="sm">
          <CardHeader/>
          <Card sx={{bgcolor: "#B0C4DE"}}>
              <CardHeader/>
              <Header
                countCompletedTasks={amountCompletedTasks}
                countUncompletedTasks={amountUncompletedTasks}
                addTask={addTask}
                addMode={addMode}
                setMode={setMode}
                searchTask={searchTask}
                filterTask={filterTask}
              />
              {!addMode && <Main 
                tasks={tasks}
                deleteTask={deleteTask}
                changeTaskStatus={changeTaskStatus}
              />
              }
          </Card>
      </Container>
    </div>
  );
}

export default App;
