import React from 'react';
import { TextField, InputAdornment, Select, MenuItem, ButtonGroup, Button, ToggleButtonGroup, ToggleButton, Grid } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import styles from './SearchBar.module.css';

import { SORT } from '../../types';
import SearchWithMenu from './searchMenu';

export interface FilterOption {
  value: string;
  label: string;
  sortOrder: 'asc' | 'desc';
}

export interface SearchBarProps {
  filterOption: string;
  filterOptions: FilterOption[];
  searchText: string;
  sortOrder: SORT;
  onFilterOptionChange: (option: string) => void;
  onSearchTextChange: (text: string) => void;
  onSortOrderChange: (order: SORT) => void;
}

const SearchBar = ({
  filterOption,
  filterOptions,
  searchText,
  sortOrder,
  onFilterOptionChange,
  onSearchTextChange,
  onSortOrderChange
}: SearchBarProps) => {
  return (
    <div className={styles.gridContainer}>
      {<TextField
        value={searchText}
        onChange={(e) => onSearchTextChange(e.target.value)}
        placeholder="Search..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />}
      {<Select
        value={filterOption}
        onChange={(e) => onFilterOptionChange(e.target.value as string)}
        fullWidth
      >
        {filterOptions.map(option => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>}
      {<ToggleButtonGroup
        value={sortOrder}
        size='large'
        exclusive
        onChange={(e, value) => onSortOrderChange(value as 'asc' | 'desc')}
      >
        <ToggleButton value="asc" >Asc</ToggleButton>
        <ToggleButton value="desc">Desc</ToggleButton>
      </ToggleButtonGroup>}
    </div>
  );
};

export { SearchBar };
