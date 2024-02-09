
import { InputBase, Divider, Paper, Typography, Box, IconButton, Tooltip, Menu, MenuItem, Fade }  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddRounded from '@mui/icons-material/AddRounded';
import AddingTaskForm from "../AddingTaskForm";

import { useState, FC} from 'react';
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
    searchTask: (text: string, filterType: string) => void;
    filterTask: (type: string, searchText: string) => void;
};

const SearchEngine: FC<SearchEngineProps> = ({ countCompletedTasks, countUncompletedTasks, addTask, 
    searchTask, 
    filterTask,
    addMode,
    setMode
}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [searchText, setSearchText] = useState('');
    const [filterType, setFilterType] = useState('All');



    const [modeTask, setModTask] = useState(addMode);

    const onFilterTasks = (type: string) => {
        filterTask(type, searchText);
        setFilterType(type);
        handleClose();
    };

    const onSearch = () => {
        searchTask(searchText, filterType);
    };

    const searchWork = (text: string) => {
        setSearchText(text);
        searchTask(text, filterType);
    };


return (
    <div>
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center'}}
            >
            <Tooltip title="Фильтровать">
                <IconButton 
                    color="default" 
                    sx={{ p: '10px' }} aria-label="menu"
                    onClick={handleClick}
                    >
                    <MenuIcon />
                </IconButton>
            </Tooltip>
            
            <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    open={open}
                    TransitionComponent={Fade}
                >
                    <MenuItem 
                        key='All'
                        onClick={()=>onFilterTasks('All')}
                        >Все задачи</MenuItem>
                    <MenuItem 
                        key='Done'
                        onClick={()=>onFilterTasks('Done')}
                    >Выполненные</MenuItem>
                    <MenuItem 
                        key='Undone'
                        onClick={()=>onFilterTasks('Undone')}
                    >Невыполненные</MenuItem>
                </Menu>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Поиск"
                defaultValue={searchText}
                onChange={(event) => searchWork(event.target.value)}
            />    
            <Tooltip title="Искать">
                <IconButton
                    color="default" 
                    type="button" sx={{ p: '10px' }} aria-label="search"
                    onClick={onSearch}
                    >
                    <SearchIcon />
                </IconButton>
            </Tooltip>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Tooltip title="Добавить новую задачу">
                <IconButton 
                    color="default"
                    sx={{ p: '10px'}}
                    aria-label="add"
                    disabled={addMode}
                    onClick={() => setMode(true)}
                    >
                    <AddRounded />
                </IconButton>
            </Tooltip>
        </Paper>
        <Box sx={{ p: '6px 4px', margin: '4px 0px', border: 0 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', margin: '2px 4px', paddingBottom: 0 }}>
            <Typography
                component="h2"
                variant="subtitle2"
                color="inherit"
                align="left"
                noWrap
                sx={{ flex: 1 }}
                >
                Выполнено: {countCompletedTasks}
            </Typography>
            <Typography
                component="h2"
                variant="subtitle2"
                color="inherit"
                align="right"
                noWrap
                sx={{ flex: -1 }}
                >                    
                Не выполнено: {countUncompletedTasks}
            </Typography>
        </Box>
        </Box>

        
        {addMode && 
                <AddingTaskForm addTask={addTask} setMode={setMode} />
        }
    </div>
)
}

export default SearchEngine;