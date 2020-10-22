import React, { useContext, useEffect } from 'react'
import ReactPlayer from 'react-player'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import '../App.css'
import { CTX } from '../store';
import { getMovie } from './axios';

function Play() {
    const [state, dispatch]  = useContext(CTX)
    const history = useHistory()
     const goBack = () =>{
        history.push('/')
    }
    useEffect(()=>{
        console.log(state.current)
 
    }, [state.current])
    return (
        <div className='Play' style={{
            display:'flex',
            flexDirection:'column',
            width:'100vw'
        }}>
            <div className="tube" style={{
                width:'100vw',

            }}>
                {!state.current.hasOwnProperty('nameFull')?
                null
                :
                <ReactPlayer style={{
                    margin:' 0 auto'
                }} className='player' controls  url={`http://192.168.0.109:4000/movieStream/${state.current.cat}/${state.current.nameFull}`} />
                }
                
            </div>
            <div className="recomendations" style={{
                width:'100vw',
                backgroundColor:'blue'
            }}>
            </div>
        </div>
    )
}

export default Play