import React from 'react';
import { Link } from "react-router-dom";
import { authService } from '../../service/authenticationService'
import {Grid, Button} from 'semantic-ui-react';

const Header = () => {

  const handleClick = (event) => {
    event.preventDefault();
    authService.userLogout();
  }

      let userId = JSON.parse(sessionStorage.getItem('userId')); 
  
    return <Grid className='bgColor' stackable colums={2}>
      <Grid.Column tablet={9} computer={10}>
      <h1 className="logo-app">Bitbook</h1>
      </Grid.Column>
 

      
        <Grid.Column tablet={7} computer={6} className='nav-links'>
          <Link to="/" className="header-link">
            Feed
          </Link>
       
        <Link to="/people" className="header-link">
            People
          </Link>
        
        <Link to={`/profile/${userId}`} className="header-link">
            Profile
          </Link>

          <a onClick={handleClick} id='logout' className="header-link">
            Logout
          </a>
        </Grid.Column>
      </Grid>
}



export default Header;