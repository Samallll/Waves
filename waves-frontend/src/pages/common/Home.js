import { useEffect,useState } from "react"
import demo from "../../apis/demo"; 
import { useNavigate } from "react-router";

function Home(){
  
  const[demoStr,setDemoStr] = useState('')
  const navigate = useNavigate();

  const logout = () => {
    
    const token = sessionStorage.getItem('access_token');
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${token}`);

    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('id_token');
    
    fetch("http://127.0.0.1:8000/connect/logout",{
      method:'GET',
      mode: 'no-cors'
    }).then(async (demoData) => {
      console.log(demoData)
    }).catch(error=>{
      console.log(error)
    })

    navigate("/login")
  }

  useEffect(() => {

      const token = sessionStorage.getItem('access_token');
      const headers = new Headers();
      headers.set('Authorization', `Bearer ${token}`);
      const url = demo();

      fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers
      }).then(async (demoData) => {
          const demo = await demoData.text();
          setDemoStr(demo);
      }).catch(error => {
        console.log(error)
      })

  }, []);

  return (
    <>
      <div className="header">
        <h1>Welcome to home</h1>
      </div>
      <div>
        <p>
          <h4>Articles are:</h4>
          {demoStr}
        </p>
      </div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Home
