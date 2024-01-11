import { useState } from "react"

function Home(){
  const[demoStr,setDemoStr] = useState('default');
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
