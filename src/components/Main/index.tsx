import { FC } from 'react';
import TaskItem from "./components/Task";
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
};

interface MainProps {    
    tasks: Array<Task>;
    deleteTask: (id:  Task['id']) => void;
    changeTaskStatus: (id:  Task['id']) => void;
}

const Main: FC<MainProps> = ({ 
    tasks, 
    deleteTask, 
    changeTaskStatus
}) => {
 return (
    <div className="header">
        <Box>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                { tasks.length ? 
                    tasks.map((task) => 
                            <TaskItem
                                key={task.id}
                                task={task}
                                deleteTask={deleteTask}
                                changeTaskStatus={changeTaskStatus}
                            />
                    ) :                    
                    <Typography component="h1" variant="subtitle1">
                        Задач нет...
                    </Typography>                     
                }
            </Container>
        </Box> 
    </div>
 )
}

export default Main;