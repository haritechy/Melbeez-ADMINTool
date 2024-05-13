import { Card } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import logoImg from "./logos/loginLogo.png";
import useSearchParams from "use-search-params";

export default function EmailConfirm() {

  const decodeUriComponent = require('decode-uri-component');

  const [searchParams, setSearchParams] = useSearchParams();

  setSearchParams.get()

  var fields = (decodeUriComponent(searchParams)).split('&');
  let emailFromurl = fields[0];
  let codeFromurl = fields[1];
  let userType = fields[2];

  emailFromurl = emailFromurl && emailFromurl.substr(6,);
  codeFromurl = codeFromurl && codeFromurl.substr(5,);
  userType = userType && userType.substr(7,);
  console.log(userType)

  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(()=> {
    const reqoption = {
      method: "GET",
      headers: { "Content-Type": "application/json", "melbeez-platform": "AdminPortal", },
    };

    fetch(
      `${process.env.REACT_APP_API_URL}/api/user/email/verify?Email=${emailFromurl}&Code=${codeFromurl}&IsUser=${userType}`,
      reqoption
    )
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        if (result.result == true) {
          setErrorMessage(<h4><img style={{ width: "50px" }} src='https://www.nicepng.com/png/detail/262-2627516_clipart-cross-tick-green-tick-png-icon.png'></img> &nbsp; &nbsp;Email verification has been done successfully.</h4>)   
        }
        else {
          setErrorMessage(<div className="text-danger text-center mb-5"><h4><img src="https://png.monster/wp-content/uploads/2022/01/png.monster-456-370x280.png" alt="img" style={{ width: "30px", height: "30px" }} />Email Verification Failed Re-try with New Link</h4></div>)
        }
      })
      .catch((error) => {
        console.log({ error });
      })
    } ,[])

  return (
    <div style={{marginTop: "90px"}} className="container  col-5"> 
      <img className="d-block mx-auto img-fluid w-50 mb-20" src={logoImg} alt="" />
      <h2 className='text-center' >Thank You </h2>
      <br />
      <Card className='container'>
        <div className="text-center">
           <br />
           {errorMessage && <div className="text-center mb-5"> {errorMessage} </div>}
          <br />
        </div>
      </Card>
    </div>
  )
}
