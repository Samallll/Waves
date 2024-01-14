import React from 'react'
import { Link } from 'react-router-dom'

function LoginButton() {
  return (
    <Link className="btn btn-secondary ms-3" to={"/login"}>
        Login
    </Link>
  )
}

export default LoginButton