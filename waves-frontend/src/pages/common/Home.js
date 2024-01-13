import { useEffect,useState } from "react"
import demo from "../../apis/demo"; 
import { Link } from "react-router-dom";

function Home(){
  
  const[demoStr,setDemoStr] = useState('')

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
      <Link to={"/logout"}>Logout</Link>
    </>
  )
}

export default Home
