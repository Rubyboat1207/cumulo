import './App.css'
import { GITHUB_RAW_CONTENT_URL, InstalledExtension, RemoteExtension, getInstalledAddonList, getManifest, listRemoteAddons } from './api'
import bouncy from "./assets/bouncy.png"
import wifi from "./assets/wifistats.png"
import Extension from './components/Extension'
import { Divider, Paper, Typography } from '@mui/material'
import { useEffect, useState } from 'react'



function ExtensionGroup({list, installed, reloadInstalled}: {list: RemoteExtension[], installed: InstalledExtension[], reloadInstalled: () => void}) {
  return (<Paper sx={{paddingTop: 4, paddingBottom: 4, marginBottom: 15, width: '100%'}} elevation={3}>
    <div style={{textAlign:'left', paddingLeft: 30}}>
      <Typography variant={'h4'} fontWeight={700} color={'#022f40'} sx={{marginBottom: 0.2}}>Most Popular</Typography>
      <Divider sx={{width: '25%', marginBottom: 2}}/>
    </div>
    <div className='row'>
      {list.map(i => {
        if (i == undefined) {
          return (<></>)
        }

        let local;
        
        if(installed) {
          local = installed.find(inst => inst.identifier == i.identifier);
        }        

        return (<Extension 
          image={GITHUB_RAW_CONTENT_URL + i.identifier + "/icon.png"}
          name={i.name}
          identifier={i.identifier}
          description={i.description}
          version={i.version}
          installedVersion={local ? local.version : undefined}
          reloadInstalled={reloadInstalled}
        />)
      })}
    </div>
  </Paper>)
}

function App() {

  const [installed, setInstalled] = useState<InstalledExtension[]>([]);
  const [popular, setPopular] = useState<string[]>([]);
  const [allIdents, setAllIdents] = useState<string[]>([]);
  const [all, setAll] = useState<RemoteExtension[]>([])

  useEffect(() => {
    reloadInstalled()

    listRemoteAddons().then(l => {
      setAllIdents(l);
    })

    setPopular(['clock', 'bouncy', 'clock2'])
  }, [])

  function reloadInstalled() {
    getInstalledAddonList().then((i) => {
      setInstalled(i);
    });
  }

  useEffect(() => {
    const promises = allIdents.map(l => getManifest(l));

    Promise.all(promises).then(ps => {
      console.log(ps)
      setAll(ps);
    });
  }, [all])


  return (
    <>
      <div className='globalcontainer'>
        <div className='sidenav'>
          <div className='navflex'>
            Installed Extensions:

            <ul>
              {installed.map(i => {
                const mapped = all.find(a => a.identifier === i.identifier)

                if(mapped) {
                  return (<li style={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {mapped.name}
                    <img src={GITHUB_RAW_CONTENT_URL + i.identifier + "/icon.png"} style={{width: 25, aspectRatio: '1/1', marginLeft: '10px', borderRadius: '25px'}}/>
                  </li>)
                }
                
                return (<li>{i.identifier}</li>)
              })}
            </ul>
          </div>
        </div>
        <div className='content'>
          <div className="banner">
            <span>The Cumulo Market</span>
          </div>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <div style={{width: '95%', display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <ExtensionGroup list={popular.map(p => all.find(a => a.identifier == p)) as RemoteExtension[]} installed={installed} reloadInstalled={reloadInstalled}/>
            </div>
          </div>
        </div>
      </div>
      
    </>
    
  )
}

export default App
