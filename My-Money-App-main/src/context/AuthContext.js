import {createContext,useReducer,useEffect} from "react"
import { projectAuth } from "../firebase/config";

export const AuthContext=createContext();

export const authreducer=(state,action)=>{
    switch (action.type) {
        case 'LOGIN':
            return {...state,user:action.payload}
        case 'LOGOUT':
            return {...state,user:null}
        case 'SIGNUP':
            return {...state,user:action.payload}
        case 'AUTH_IS_READY':
            return {...state,user:action.payload,authisready:true}
        default:
            return state;
    }
}
export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authreducer,
        {user:null,
        authisready:false
        }
        )
        useEffect(() => {
           const unsub=projectAuth.onAuthStateChanged((user)=>{
                dispatch({type:'AUTH_IS_READY',payload:user})
            })
            return ()=>unsub();
        }, [])
        console.log(state);
 return (
     <AuthContext.Provider value={{...state,dispatch}}>
         {children}
     </AuthContext.Provider>
 )
}
