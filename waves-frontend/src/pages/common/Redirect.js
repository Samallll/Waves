import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import authorize from "../../apis/authorize";
import token from "../../apis/token";
import { Buffer } from "buffer";

function Redirect() {

  const[searchParam] = useSearchParams();
  useEffect(()=>{
    if(searchParam?.get('code')){
      sessionStorage.setItem('code',searchParam?.get('code'));
      console.log(searchParam?.get('code'));
      const client = 'client1';
      const secret = 'myClientSecretValue'
      const headers = new Headers();
      headers.set('Content-type','application/x-www-form-urlencoded');
      headers.set('Authorization',`Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`)
      headers.set('Accept','*/*')
      headers.set('Accept-Encoding','gzip, deflate, br')
      const url = token();
      console.log(`Basic ${Buffer.from(`${client}:${secret}`).toString('base64')}`)
      console.log(url)

      fetch(url,{
        method:'POST',
        mode:'cors',
        headers
      }).then(async (response) => {
        const token = response.json;
        console.log(token);
      })
    }
    else if(!searchParam?.get('code')){
      window.location.href = authorize();
    }
  })

  return (
    <div>
      <h1>Redirecting.........</h1>
    </div>
  )
}

export default Redirect
