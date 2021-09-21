import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
  CProgress,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useHistory} from 'react-router-dom';
import axios from 'axios';


const Login = (props) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failed, setFailed] = useState('');
  //for alerts
  const [visible, setVisible] = React.useState(10)


  const api = 'http://localhost:8000/api/';
  

  const history = useHistory();
    
  const hundleLogin = async  (e) =>  {
    e.preventDefault();
    const creds = {
        email: username,
        password: password
    }
    //setting logging in to the btn
    const logginIn = document.getElementById('loggingIn');
    //handle login buttone
    logginIn.disabled = true;
    logginIn.innerText = 'Logging In...'; 
    logginIn.className += ' px-4 ';

    


    //setting axios to use credentials
    axios.defaults.withCredentials = true;
    //setting csrf-cookies
    await axios.get('http://localhost:8000/sanctum/csrf-cookie').then(response => {
        

    //logging in 
    axios.post(`${api}login`, creds).then(response => {
      //setting sessionstorage and localstorage
      sessionStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      console.log(response.data.user);
      
      if(response.status === 200){
        //this will help to set login state
        props.login();
        history.push('/dashboard');
      }
     

    }).catch(error => { 
        //handle login button
        logginIn.disabled = false;
        logginIn.color = "btn btn-primary  ";
        logginIn.innerText = 'Login'; 
        
        //handling any login error
        if(error.response.status != null){
          setFailed(error.response.data.message);
        }
  
    });      
       
  }).catch((error) => {
        
        //handle login button classes
        logginIn.disabled = false;
        logginIn.color = "btn btn-primary  ";
        logginIn.innerText = 'Login'; 
        
        //setting failed msg
        if(error.message !== ''){
          setFailed(error.message);
        }else{
          setFailed("Please Enter your Creds");
        }
    
  });  
}



//whatever renders on screen
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={hundleLogin}>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    {failed ? (
                      <CAlert color="warning" show={visible} closeButton onShowChange={setVisible}>
                          {failed} - closing in {visible}s!
                          <CProgress striped color="warning" value={Number(visible) * 10} size="xs" className="mb-3"/>
                      </CAlert>
                    ) : null}
                        
                    <CInputGroup className="mb-3 form-control-warning">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" required onChange={(e)=>setUsername(e.target.value)} autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" id="pass" required placeholder="Password" onChange={(e)=>setPassword(e.target.value)} autoComplete="current-password" />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton color="primary" type="submit" id="loggingIn" className="px-4">Login</CButton>
                      </CCol>
                      <CCol xs="6" className="text-right">
                        <CButton color="link" className="px-0">Forgot password?</CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua.</p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
