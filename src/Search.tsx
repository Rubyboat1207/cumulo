import { useEffect, useState } from "react";
import { GITHUB_RAW_CONTENT_URL, RemoteExtension, getManifest, listRemoteAddons } from "./api";
import Extension from "./components/Extension";
import { TextField } from "@mui/material";
import FilterDropdown from "./components/UI/FilterDropdown";
import { ADDON_CATEGORIES } from "./components/CategoryIcon";

function Search() {
  const [all, setAll] = useState<RemoteExtension[]>([]);
  const [allIdents, setAllIdents] = useState<string[]>([]);
  let params = (new URL(window.location.toString())).searchParams;
  const [searchInput, setSearchInput] = useState(new URLSearchParams(params).get('query') || '');
  const [filterSelections, setFilterSelections] = useState<string[]>(new URLSearchParams(params).get('filter')?.split(',') || []);

  useEffect(() => {
    listRemoteAddons().then(l => {
      setAllIdents(l);
    })
  }, [])

  useEffect(() => {
    const promises = allIdents.map((l) => getManifest(l));

    Promise.all(promises).then((ps) => {
      setAll(ps);
    });
  }, [allIdents]);
  
  useEffect(() => {
    if(filterSelections.includes('')) {
      setFilterSelections(filterSelections.filter(s => s !== ''))
    }
  }, [filterSelections])

  const handleSearchChange = (event: any) => {
    setSearchInput(event.target.value);
  };

  const filteredExtensions = all.filter(extension => {
    let isCategory = true;


    for(const filters of filterSelections) {
      if(!extension.categories.includes(filters)) {
        isCategory = false;
        break;
      }
    }
    

    console.log(filterSelections)

    return (extension.name.toLowerCase().includes(searchInput.toLowerCase()) ||
           extension.description.toLowerCase().includes(searchInput.toLowerCase())) &&
           isCategory;
  });

  return (
    <>
      <div>
      <div className="banner">
            <div style={{width: '80%', height: '70px', marginTop: 20, backdropFilter: 'blur(30px)', display: 'flex', justifyContent: 'center'}}>
              <TextField
                label="Search Extensions"
                variant="outlined"
                fullWidth
                value={searchInput}
                onChange={handleSearchChange}
                sx={{"input": {color: 'white'}, "label": {color: 'white'}}}
              />
              <FilterDropdown
                categories={ADDON_CATEGORIES}
                selectedValues={filterSelections}
                setSelectedValues={setFilterSelections}
              />
            </div>
            <span>The Cumulo Market</span>
          </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '80%'
            }}
          >
          {filteredExtensions.map(extension => (<>
            <div style={{marginBottom: 40}}></div>
            <Extension
              key={extension.identifier}
              image={GITHUB_RAW_CONTENT_URL + extension.identifier + "/icon.png"}
              name={extension.name}
              identifier={extension.identifier}
              description={extension.description}
              version={extension.version}
              installedVersion={""}
              reloadInstalled={() => {}}
              isHorizontal={true}
            />
          </>))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
