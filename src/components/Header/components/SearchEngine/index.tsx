import { FC, MouseEvent, useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddOutlined from '@mui/icons-material/AddOutlined';
import AddingTaskForm from '../AddingTaskForm';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Typography, Container } from '@mui/material';

type Task = {
    id: number;
    taskName: string;
    taskDescription: string;
    taskStatus: boolean;
};


interface SearchEngineProps {
    countCompletedTasks: number; 
    countUncompletedTasks: number; 
    addMode: boolean;
    setMode: (value: boolean) => void;
    addTask: ({ taskName, taskDescription }: Omit<Task, 'id' | 'taskStatus'>) => void;
    searchTask: (searchText: string, filterType: string) => void;
    filterTask: (filterType: string) => void;
}

const SearchEngine: FC<SearchEngineProps> = ({
    countCompletedTasks, 
    countUncompletedTasks, 
    addTask, 
    searchTask,
    filterTask,
    addMode,
    setMode,
  }) =>{   
  const [filterType, setFilterType] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>('');

  const onChange = (text: string) => {
    setSearchText(text);
    searchTask(searchText, filterType);
  };

  const onClick = () => {
    searchTask(searchText, filterType);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  
  const handleClose = (type: string) => {
    setAnchorEl(null);
    setFilterType(type);
    filterTask(filterType);
  };
  
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
    <Box>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
       <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
       <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <IconButton sx={{ p: '10px' }} aria-label="menu"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
        >
            <MenuIcon />
        </IconButton>
        <Menu
            anchorEl={anchorEl}
            open={open}
        >                
                <MenuItem onClick={() => handleClose('Add')} value="Add">Все</MenuItem>
                <MenuItem onClick={() => handleClose('Done')} value="Done">Выполненные</MenuItem>
                <MenuItem onClick={() => handleClose('Undone')} value="Undone">Невыполненные</MenuItem>
         </Menu>


        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Поиск"
            inputProps={{ 'aria-label': 'search engine' }}
            onChange={(event) => onChange(event.target.value)}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon onClick={onClick}/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="add" disabled={addMode}>
            <AddOutlined  onClick={()=>setMode(true)} />
        </IconButton>
        </Paper>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex'}}>
            <Typography component="h1" variant="subtitle1" align="left" sx={{ flex: 1 }}>
               Выполнено: {countCompletedTasks}
            </Typography>
            <Typography component="h1" variant="subtitle1" align="right" sx={{ flex: -1 }}>
              Не выполнено: {countUncompletedTasks}
            </Typography>
        </Box>

        <Box>        
            {addMode && <AddingTaskForm
                setMode={setMode}
                addTask={addTask}
                />
            }
        </Box>
      </Container>
      </Container>
      </Box>
    </div>
  );
}

export default SearchEngine;