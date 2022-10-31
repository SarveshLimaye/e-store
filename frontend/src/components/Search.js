import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const Search = ({getQuery}) => {
    const [search, setSearch] = useState('');

    const onChange = (q) => {
        setSearch(q)
        getQuery(q)
    }
    return (
        <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products"
          inputProps={{ 'aria-label': 'search google maps' }}
          onChange={(e) => { onChange(e.target.value) }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon style={{ fill: "#372948" }}/>
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      </Paper>
    )
}

export default Search;