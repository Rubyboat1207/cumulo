import { Button, Checkbox, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import FilterListIcon from '@mui/icons-material/FilterList';

const FilterDropdown = ({categories, selectedValues, setSelectedValues}: {categories: string[], selectedValues: string[], setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (value: any) => {
    const currentIndex = selectedValues.indexOf(value);
    const newValues = [...selectedValues];

    if (currentIndex === -1) {
      newValues.push(value);
    } else {
      newValues.splice(currentIndex, 1);
    }

    setSelectedValues(newValues);
  };

  return (
    <>
      <IconButton
        aria-controls="filter-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{width: 50, height: 50}}
      >
      <FilterListIcon sx={{fill: 'white'}}/>
      </IconButton>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{height: '70vh', overflowY: 'auto'}}
      >
        {categories.map((category) => (
          <MenuItem key={category} onClick={() => handleToggle(category)}>
            <Checkbox checked={selectedValues.indexOf(category) > -1} />
            <ListItemText primary={category} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};


export default FilterDropdown;