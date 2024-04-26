import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import rightIconImage from './assets/icons8-next-page-64.png'
import leftIconImage from './assets/icons8-back-to-64.png'
import mlbLogo from './assets/Major_League_Baseball_logo.svg.webp'

function App() {
  const [data, setData] = useState([]) //data - variable that stores, setData - modifies
  const [filteredData, setFilteredData] = useState([]); //how we display teams
  const [league, setLeague] = useState("MLB");
  const [division, setDivision] = useState([]);
  const [arrowPressed, setArrowPressed] = useState(false);

  //Allows us to grab information from the backend server api
  useEffect(() => {
    async function hitApi() {
      const response = await axios.get('http://localhost:3000/api/teams')
      setData(response.data)
      setFilteredData(response.data)
    }
    hitApi()
  }, []); //runs once due to empty dependency

  //If league or division change, we run the function that filters teams
  useEffect(() => {
    const filteredList = data.filter((team) => team.leage == league || league == "MLB");
    const divisionFilter = filteredList.filter((div) => {
      const wordSplitArray = div.division.split(' ')
      const lastWord = wordSplitArray[wordSplitArray.length - 1]
      return division.includes(lastWord) || division.length == 0
    }
    )
    console.log(divisionFilter)
    setFilteredData(divisionFilter)
  }, [league, division])

  //if an event occurs to the checkbox, we add the event values, if not we delete 
  function handleCheckbox(event) {
    if (event.target.checked) {
      setDivision([...division, event.target.value]) //adding event values to the array
    }
    else {
      setDivision(division.filter((div) => div !== event.target.value)) //deletes event values to the array
    }
  }

  return (
    <>
      <header>
        <div id="header-mlb-logo">
          <img id="mlb-logo" src={mlbLogo}></img>
          <h1>MLB Team Search</h1>
        </div>
        <div id="header-buttons-container">
          <button className='header-button' onClick={() => setLeague("MLB")}>MLB</button>
          <button className='header-button' onClick={() => setLeague("National League")}>National League</button>
          <button className='header-button' onClick={() => setLeague("American League")}>American League</button>
        </div>
      </header>

      <div id='main-container'>
        <aside>
          <button id="arrowButton" onClick={() => setArrowPressed(!arrowPressed)}>
            <img id="arrowButtonImage" src={arrowPressed == true ? leftIconImage : rightIconImage}></img>
            <h2>Division Filter</h2>
          </button>

          <ul className={arrowPressed ? 'translate-x-show' : 'translate-x-hide'}>
            <li>
              <label>
                West
                <input type="checkbox" value="West" onChange={handleCheckbox} />
              </label>
            </li>
            <li>
              <label>
                Central
                <input type="checkbox" value="Central" onChange={handleCheckbox} />
              </label>
            </li>
            <li>
              <label>
                East
                <input type="checkbox" value="East" onChange={handleCheckbox} />
              </label>
            </li>
          </ul>

        </aside>

        <div id="team-grid">
          {filteredData.map((team) =>
            <div key={team.id} className='team-box'>
              <img src={team.logo} className='team-logo-image' />
              <h1 className='team-title'>{team.name}</h1>
              <div className='team-text'>
                <p><b>Location:</b> {team.location}</p>
                <p><b>Abbreviation:</b> {team.abbreviation}</p>
                <p><b>Nickname:</b>  {team.nickname}</p>
                <p><b>Division:</b> {team.division}</p>
              </div>
            </div>
          )}
        </div>
      </div>

    </>
  )
}

export default App
