import React, { useContext, useEffect, useState } from 'react'
import { CTX } from '../store';
import { addImage, getAll, getCategories, getData, getMovies, ifMovie, noPic } from './axios';
import CrossfadeImage from 'react-crossfade-image'
import mov from './movie.svg'
import { useHistory } from 'react-router-dom';
function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
//
function NewDashboard() {
    const [state, dispatch] = useContext(CTX);
    const [comps, setComps] = useState(['a', 'p'])
    const [categories, setCategories] = useState([])
    const [dt, setDt] = useState('popopepe')
    const history = useHistory()
    let imageSrc = 
      `http://192.168.0.109:4000/img/favs/Mulan.1998.1080p.BRrip.x264.GAZ.YIFY.mp4.jpeg`
    // let imageSrc = [
    //   `http://192.168.0.109:4000/img/favs/Mulan.1998.1080p.BRrip.x264.GAZ.YIFY.mp4.jpeg`,
    //   `http://192.168.0.109:4000/img/favs/gigachad (1).jpg`
    // ]
    const clicker = (e) => {
      e.preventDefault()
      
      setDt(q=> makeid(20))
      console.log(dt)
    }
    useEffect(()=>{
      // ifMovie('Solar.Opposites.S01.COMPLETE.720p.HULU.WEBRip.x264-GalaxyTV[TGx]','Solar.Opposites.S01E08.720p.HULU.WEBRip.x264-GalaxyTV.mkv', res =>{
      //   console.log(res.data)
      // })
      getAll(res=>{
        // console.log(res)
        if(res.status == 200){
        dispatch({type:"SET_ALL", payload:res.data.anc})
        }
      })
    }, [])
    //
    useEffect(()=>{
      console.log(categories)
    },[categories])
    //
    useEffect(() => {
        (async () => {
          let data = await getCategories();
          // for(category in data){
          //     dispatch({type:"ADD_CATEGORIE", payload:{name :category}})
          // }
    
          data.data.forEach((dt) => {
            dispatch({ type: "ADD_CATEGORIE", payload: { name: dt } });
          });
          data.data.forEach((dt) => {
            async function gtMvs(dt) {
              let data1 = await getMovies(dt);
              dispatch({
                type: "ADD_MOVIES",
                payload: { name: dt, movies: data1 },
              });
              if (dt == data.data[data.data.length - 1]) {
                dispatch({ type: "SET_READY" });
              }
            }
            let y = gtMvs(dt);
          });
        })();
      }, []);
      //
      useEffect(()=>{
        let dat = []
        if (state.all !== {}){
          for(const cat of Object.entries(state.all)){
            dat.push({name:cat[0], movies: cat[1]})
            cat[1].forEach(mv=>{
              ifMovie(cat[0], mv, res=>{
                // console.log(res.data.anc)
                // console.log(mv)
                if(res.data.anc==false){
                  getData(mv.split(".")[0], res=>{
                    if(res.data.hasOwnProperty('Title')){
                      
                      addImage(res.data.Poster, cat[0], mv, res=>{
                        // console.log(res)
                      })
                    }else{
                      // no image found
                      noPic(cat[0], mv, res =>{
                        // console.log(res.data)
                      })
                    }
                  })
                }
              })
            })
            
          }

        }
        setCategories([])
        setCategories(ct=>dat)
      }, [state.all])
    return (
        <div className='newDash' style={{
          display:'flex',
          flexDirection:"row",
          flexWrap:"wrap",
          justifyContent:"space-around",
          width:'90vw',
          margin:'0 auto'
        }}>
            {categories.map((pp)=>{
              let count = 0
              setInterval(()=>{
                count = count+1
                if(count > pp.movies.length){
                  count=0
                }
              
              },3000)
                return(
                    <div className="comp" onClick={(e)=>{
                      e.preventDefault()
                      dispatch({type:'SET_CURRENT2', payload:pp})
                      history.push('/cat')
                    }}>
                      <div className="div1" style={{
                        textAlign: "center",
                        maxWidth:"100%",
                        maxHeight:"2rem"
                      }}>
                      <h1 style={{
                        margin:'auto',
                        marginBottom:'10px',
                        width:'100%',
                        textOverflow:"ellipsis",
                        whiteSpace:'nowrap',
                        overflow:'hidden',
                      }}>{pp.name}</h1>
                      </div>
                      <div className="div2" onClick={e =>clicker(e)}>
                      <div className="card">
                      <img  src={`http://192.168.0.109:4000/img/${pp.name}/${pp.movies[count]}`} style ={{width:"100%"}} alt="no image found"/>
                      </div>
                      </div>
                      <div className="div3"></div>
                      
                        
                    </div>
                )
            })}
        </div>
    )
}

export default NewDashboard
