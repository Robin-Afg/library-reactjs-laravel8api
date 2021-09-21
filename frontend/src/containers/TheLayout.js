import React from 'react';
import {Link} from 'react-router-dom';
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'

const TheLayout = (props) => {
  if(props.loggedIn){ 
    return (
      <div className="c-app c-default-layout">
        <TheSidebar/>
        <div className="c-wrapper">
          <TheHeader logout={props.logout} />
          <div className="c-body">
            <TheContent/>
          </div>
          <TheFooter/>
        </div>
      </div>
    )
  }else{
    return(
      <div className="text-center mt-5">
        <h3> Opps..! you forgot to login </h3>
        <Link to="/login" className="btn btn-primary m-4">Login Now</Link>
      </div>
    ); 
  }
}

export default TheLayout
