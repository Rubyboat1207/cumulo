import './App.css'
import nick from "./assets/nichol.png"
import bouncy from "./assets/bouncy.png"
import wifi from "./assets/wifistats.png"
import Extension from './components/Extension'

function App() {

  return (
    <>
      <div className='globalcontainer'>
        <div className='sidenav'>
          <div className='navflex'>
            Installed Extensions:

            <ul>
              <li>Bouncy</li>
            </ul>
          </div>
        </div>
        <div className='content'>
          <div className="banner">
            The Cumulo Market
          </div>
          <div className='row'>
            <Extension
              image={bouncy}
              name='Bouncy'
              identifier='bouncy'
              description='The first ever extension developed for cirrus'
              version='v1.1.0'
              installedVersion='v1.1.0'
            />
            <Extension
              image={wifi}
              name='WifiStats'
              identifier='wifistats'
              description='This gets average wifi statistics for your current connection'
              version='v1.0.1'
            />
          </div>
        </div>
      </div>
      
    </>
    
  )
}

export default App
