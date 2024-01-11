import { useEffect,useState } from "react"
import demo from "../../apis/authorize"; 

function Home(){
  
  const[demoStr,setDemoStr] = useState('')

  useEffect(() => {
      const token = sessionStorage.getItem('access_token');
      const headers = new Headers();
      headers.set('Content-type', 'plain/text');
      headers.set('Authorization', `Bearer ${token}`);
      const url = demo();
      fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers
      }).then(async (demoData) => {
          const demo = await demoData.text();
          setDemoStr(demo);
      })

  }, []);

  return (
    <>
      <div className="header">
        <h1>Welcome to home</h1>
      </div>
      <div>
        <p>
          {demoStr}
        </p>
      </div>
    </>
  )
}

export default Home
