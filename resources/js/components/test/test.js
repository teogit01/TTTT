import React from 'react'
import ReactDOM from 'react-dom';

import { Button, TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

const home = () => {
  return <h1>Home</h1>
}
const about = () => {
  return <h1>About</h1>
}

export default function Test(props){
  const arrays = [
    { title: 'Film 1', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 }
  ]
  
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to='/diemdanh'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </div>

      <div className='autocomplete'>
        <Autocomplete
          freeSolo
          options={arrays}
          getOptionLabel={(array) => array.title}
          style={{ width: 300 }}
          renderInput={(params) => 
              <TextField {...params} label="Giáo viên" variant="outlined" size="small" />}
        />
      </div>



      <Route  path='/diemdanh' component={home} exact />
      <Route  path='/about' component={about} exact />
    </Router>
  )
}

