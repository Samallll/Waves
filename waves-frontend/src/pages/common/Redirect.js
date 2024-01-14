import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import authorize from "../../apis/authorize";
import token from "../../apis/token";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

function Redirect() {

  const[searchParam] = useSearchParams();
  const navigate = useNavigate();

  useEffect(()=>{
    if(searchParam?.get('code')){

      sessionStorage.setItem('code',searchParam?.get('code'));

      const formData = new URLSearchParams();
      formData.append('client_id', 'client1');
      formData.append('grant_type', 'authorization_code');
      formData.append('code_verifier', '8pS4DixsoGFl_7GBK459cNnT1qwdchciRD46xuRb2sBL1X8L4vy2JH2v5n4lUMC6iBjxXHP1S7R7bahLok5gBdziStql9UAqtDnZ0Dyf1YpOO0PnrFcsCFYrufaOOIFY');
      formData.append('redirect_uri', 'http://127.0.0.1:3000/authorized');
      formData.append('code', sessionStorage.getItem('code'));

      const client = 'client1';
      const secret = 'myClientSecretValue'
      const url = token();

      fetch(url,{
        method:'POST',
        mode:'cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`,
        },
        body:formData
      }).then(async (response) => {
        const token = await response.json();
        if(token?.id_token) {
            sessionStorage.setItem('id_token', token.id_token);
            sessionStorage.setItem('access_token', token.access_token);
            navigate('/home');
        }
    }).catch((err) => {
        console.log(err);
    })
    }
    else if(!searchParam?.get('code')){
      window.location.href = authorize();
    }
  },[])

  return (
    <div>
      <h1>Redirecting.........</h1>
    </div>
  )
}

export default Redirect
