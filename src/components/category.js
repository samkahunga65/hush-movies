import React, { useContext } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { CTX } from '../store';

function Category() {
    const [state, dispatch] = useContext(CTX);
    const [data, setData] = useState({name:'', movies:[]})
    const history = useHistory()
    useEffect(()=>{
        console.log(state)
        if(state.current2.hasOwnProperty('name')){
            console.log('yes')
            setData(dt=>dt =state.current2)
        }else{
            history.push('/')}
    },[])
    return (
        <div className='category' style={{
            display:'flex',
            flexDirection:"row",
            flexWrap:"wrap",
            justifyContent:"space-around",
            width:'90vw',
            margin:'0 auto'
          }}>
            <h1 style={{
                        margin:'auto',
                        marginBottom:'10px',
                        width:'80%',
                        textOverflow:"ellipsis",
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                      }}>{data.name}</h1>
            {data.movies.map(pp =>{
                return(
                    <div className="card"
                    onClick={(e)=>{
                        e.preventDefault()
                        dispatch({type:'SET_CURRENT', payload:{cat:data.name, nameFull:pp}})
                        history.push('/play')
                    }}
                    style={{
                        width:'30vw',
                        height:'40vh',
                        marginRight:'10px',
                        marginBottom:'1rem'
                    }}>
                        <img style ={{width:"100%"}} src={`http://192.168.0.109:4000/img/${data.name}/${pp}`} alt={pp}/>
                        <h1 style={{
                        margin:'auto',
                        marginBottom:'10px',
                        width:'100%',
                        textOverflow:"ellipsis",
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                      }}>{pp}</h1>
                    </div>
                )
            })}
        </div>
    )
}

export default Category
