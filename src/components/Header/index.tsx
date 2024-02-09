import { FC } from 'react';
import SearchEngine from "./components/SearchEngine";
import Typography from '@mui/material/Typography';
import { Box, Container} from '@mui/material';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
};

interface HeaderProps {
    countCompletedTasks: number;
    countUncompletedTasks: number;
    addMode: boolean;
    setMode: (value: boolean) => void;
    addTask: ({ taskName, taskDescription }: Omit<Task, 'id' | 'taskStatus'>) => void;
    searchTask: (text: string, filterType: string) => void;
    filterTask: (type: string) => void;
}

const Header: FC<HeaderProps> = ({ 
    countCompletedTasks, 
    countUncompletedTasks, 
    addTask, 
    searchTask,
    filterTask,
    addMode,
    setMode
}) => {
 return (
    <div className="header">
        <Box>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Задачи
                </Typography>
                <SearchEngine 
                    countCompletedTasks={countCompletedTasks} 
                    countUncompletedTasks={countUncompletedTasks} 
                    addTask={addTask} 
                    searchTask={searchTask}
                    filterTask={filterTask} 
                    addMode={addMode}
                    setMode={setMode}
                />
            </Container>
        </Box> 
    </div>
 )
}

export default Header;