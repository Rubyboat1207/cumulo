import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FilterDropdown from "./UI/FilterDropdown";
import { ADDON_CATEGORIES } from "./CategoryIcon";

interface BannerProps {
    searchInput: string,
    handleSearchChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
    filterSelections: string[],
    setFilterSelections: React.Dispatch<React.SetStateAction<string[]>>
}

function Banner({searchInput, handleSearchChange, filterSelections, setFilterSelections}: BannerProps) {
    const navigate = useNavigate()



    return (
        <div className="banner">
        <div style={{width: '80%', height: '70px', marginTop: 20, backdropFilter: 'blur(30px)', display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
          <TextField
            label="Search Extensions"
            variant="outlined"
            fullWidth
            value={searchInput}
            onChange={handleSearchChange}
            sx={{"input": {color: 'white'}, "label": {color: 'white'}}}
            onKeyDown={(ev) => {
              console.log(`Pressed keyCode ${ev.key}`);
              if (ev.key === 'Enter') {
                ev.preventDefault();

                const query = new URLSearchParams();
                query.set('query', searchInput);
                if(filterSelections.length > 0) {
                  let str = filterSelections.join(',');
                  if(filterSelections.length == 1) {
                    str += ',';
                  }
                  query.set('filter', str)
                }
                navigate({
                  pathname: '/search',
                  search: `?${query.toString()}`
                })
              }
            }}
          />
          <FilterDropdown
            categories={ADDON_CATEGORIES}
            selectedValues={filterSelections}
            setSelectedValues={setFilterSelections}
          />
        </div>
        <span>The Cumulo Market</span>
      </div>
    )
}

export default Banner;