import React, { createContext, useReducer } from "react";
export const CTX = createContext();

const initState = {
  categories : [],
  ready:false,
  current:{},
  all:{},
  current2:{}
};
let reducer = (state, action) => {
  switch (action.type) {
    case "DEL_CURRENT2":
      return{
        ...state,
        current2:{}
      }
    case "SET_CURRENT2":
    return{
      ...state,
      current2:action.payload
    }
    case "SET_ALL":
      return{
        ...state,
        all:action.payload
      }
    case "SET_CURRENT":
      return{
        ...state,
        current:action.payload
      }
    case "DEL_CURRENT":
      return{
        ...state,
        current:{}
      }
    case "DEL_ALL":
      return{
        categories : [],
        ready:false,
        current:{}
      }
    case "SET_READY":
      return{
        ...state,
        ready:true
      }
    case "ADD_CATEGORIE":
      let anc =false
      if(state.categories.length>0){
        state.categories.forEach(tt=>{
          if(tt.name == action.payload.name){
            anc = true
          }
        })
      }
      if(anc){
        return {
          ...state
        }
      }else{
        return {
          ...state,
          categories: [...state.categories, {
            name:action.payload.name
          }]
        }
      }
     
      case "ADD_MOVIES":
          let os = state.categories
         
          os.forEach((ct)=>{
            if (action.payload.name == ct.name){
              ct.movies = action.payload.movies.data.movies
            }
          })
        return {
          ...state,
          categories:os
        }
    default:
      return state;
  }
};
export default function Store(props) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <CTX.Provider value={[state, dispatch]}>{props.children}</CTX.Provider>
  );
}
