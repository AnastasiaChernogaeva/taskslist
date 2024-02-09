import { Container, Button, Paper, Typography, Box, IconButton, Tooltip, TextField, Grid }  from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useState, FC } from 'react';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
};

const DEFAULT_TASK = { taskName: '', taskDescription: '' };

interface AddingTaskFormProps {
    setMode: (value: boolean) => void
    addTask: ({ taskName, taskDescription }: Omit<Task, 'id' | 'taskStatus'>) => void;
}

const AddingTaskForm: FC<AddingTaskFormProps> = ({setMode, addTask}) => {
    const [task, setTask] = useState(DEFAULT_TASK); 
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setTask({ ...task, [name]: value });
    };
    

return (
    <div>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Box sx={{ display: 'flex'}}> 
                    <Typography component="h1" variant="h6" align="center" sx={{ flex: 1}}>
                        Новая задача
                    </Typography>
                    
                    <Typography component="h1" variant="h6" align="right" sx={{ flex: -1}}>        
                        <Tooltip title="Закрыть">
                            <IconButton                   
                                color="error" 
                                type="button" sx={{ p: '10px'}} aria-label="close"
                                onClick={() => setMode(false)}>
                                <CancelIcon />
                            </IconButton>
                        </Tooltip>
                    </Typography>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="taskName"
                        name="taskName"
                        label= "Название задачи"
                        fullWidth
                        autoComplete="Новая задача"
                        variant="standard"
                        onChange={onChange}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="taskDescription"
                        name="taskDescription"
                        label="Описание задачи"
                        fullWidth
                        autoComplete="..."
                        variant="standard"
                        onChange={onChange}
                    />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Tooltip title="Создать новую задачу">
                    <Button
                    variant="contained"
                    disabled={!task.taskName}
                    onClick={()=>addTask(task)}
                    sx={{ mt: 3, ml: 1 }}
                    > Создать задачу
                    </Button>
                    </Tooltip>
                </Box>
            </Paper>
        </Container>
    </div>
)
}

export default AddingTaskForm;