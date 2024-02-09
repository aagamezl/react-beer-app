import React, { useState } from 'react';
import { Paper, IconButton, InputBase, Divider, Menu, MenuItem, RadioGroup, FormControlLabel, Radio, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import { FilterOption } from './searchBar';
import { KeyboardArrowDownRounded, KeyboardArrowUpRounded } from '@mui/icons-material';
import { SORT } from '../../types';

// export interface MenuItemOption {
//   label: string;
//   value: string;
//   sortOrder: 'asc' | 'desc';
// }

export interface SearchMenuProps {
  // menuItems: MenuItemOption[];
  menuItems: FilterOption[];
  onSortOrderChange: (order: SORT) => void;
}

const SearchWithMenu = ({ menuItems, onSortOrderChange }: SearchMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <IconButton onClick={handleClick} sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Menu
        id="search-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{ marginTop: '0.5rem' }}
      >
        {menuItems.map((item) => (
          <MenuItem key={item.value}>
            <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
              <input type="checkbox" id={item.value} value={item.value} />

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <span>{item.label}</span>

              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <ToggleButtonGroup
                size='small'
                // value={item.sortOrder}
                exclusive
                onChange={(_, value) => onSortOrderChange(value)}
              >
                <ToggleButton value="asc" >
                  <KeyboardArrowUpRounded />
                </ToggleButton>
                <ToggleButton value="desc">
                  <KeyboardArrowDownRounded />
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </MenuItem>
        ))}
      </Menu>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search Beers"
        inputProps={{ 'aria-label': 'search beers' }}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchWithMenu;
