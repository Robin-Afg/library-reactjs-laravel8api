import React, {useState, useEffect} from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
//import { HashRouter, Route, Switch , NavLink } from 'react-router-dom';
import './scss/style.scss';
import axios from 'axios';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

function App() {  // before class App extends Component {


  //handling the login
   const [loggedIn, setLoggedIn]= useState(
           sessionStorage.getItem('loggedIn') === 'true' || false
   );
  
   

//after successionfull login browser session and state changes to true
  const login = () => {
    setLoggedIn(true);
    sessionStorage.setItem('loggedIn', true); 
  }

  

   //deleteBrowser function sets the browser session token and loggedIn status
   //it also changes the state after log out to show different coditions
   const deleteBrowser = () => {
        setLoggedIn(false);
        sessionStorage.setItem('loggedIn', false);
        sessionStorage.setItem('token', '');  
        localStorage.clear();   
   }                     
                       

   const logout = async () => {
        //when the function is triggered it takes the token from browser session
        //and sets in the axios header
        const token = sessionStorage.getItem('token'); 
        axios.defaults.headers.common = { 'Authorization' : `Bearer ${token}` } 

        await axios.post('http://localhost:8000/api/logout').then(response => { 
          console.log(response);
          
          if(response.data.status === 200){
                  //the delete browser function is called when there is a success response from API
                  deleteBrowser();
                  console.log('session deleted');
          }
        });
   }
  
   //to show login and logout links as per state change
  //  const authLink = loggedIn ? <button onClick={logout}>Log out</button> : <NavLink to='/'>Login</NavLink> 
   

    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props} login={login} />} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="Home" render={props => <TheLayout {...props} logout={logout} loggedIn={loggedIn} />} />
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  
}

export default App;
