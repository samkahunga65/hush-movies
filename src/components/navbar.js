import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import '../App.css'
import { CTX } from '../store'
function Navbar() {
    const [state, dispatch]  = useContext(CTX)
    const history = useHistory()
    const goBack = () =>{
        history.push('/')
        dispatch({type:"DEL_CURRENT"})
       
    }
    return (
        <div className='Navbar'>
            <h1 onClick={goBack}>Home Movies</h1>
        </div>
    )
}

export default Navbar
