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
      formData.append('code_verifier', 'm1vPAe8FO_w2GMSIyxr-NtTdAF8e2b_475XMF3Q1pIEWCC1LmaO2LWdzurW-MA46wfZcqkBsqmo257XYgeP-1KXjoElxMl7dHJ-d4iCqouR1QJ4Do40xaT1JKOz8KWe5');
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
        console.log(token.access_token)
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
