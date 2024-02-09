import TaskItem from "./components/Task/index";
import { Container, Paper, Typography, Box }  from '@mui/material';
import { FC } from 'react';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
};

interface MainProps {
    tasks: Array<Task>;
    deleteTask: (id: Task['id']) => void;
    changeTaskStatus: (id: Task['id']) => void;
}

const Main: FC<MainProps> = ({
    tasks, deleteTask, 
    changeTaskStatus
 }) => (
    <div>
        <Box>
            {tasks.map((el) => {
                return (
                <TaskItem                            
                    key={el.id}
                    task={el}
                    deleteTask={deleteTask}
                    changeTaskStatus={changeTaskStatus}
                />
                )
            }) }
            <div>
                {
                !tasks.length && <Container component="main" maxWidth="sm" sx={{ mb: 4 }} >
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography
                    component="h2"
                    variant="subtitle1"
                    color="inherit"
                    align="left"
                    >
                        Задач нет...
                    </Typography>
                </Paper>
                </Container>
                }
            </div>
        </Box>
    </div>
)

export default Main;