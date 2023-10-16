import {useState,useEffect} from 'react'
import {projectAuth} from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext";

export const useLogout=()=>{
    const [error,setError]=useState(null);
    const [isPending,setisPending]=useState(false);
    const [iscancel,setiscancel]=useState(false);
    const {dispatch}=useAuthContext();
    //signup
    const logout=async()=>{
        setError(null);
        setisPending(true);

        try{
            const res=await projectAuth.signOut();
            
            
 
     //dispatch logout event
            dispatch({type:'LOGOUT'})
           if(!iscancel){
            setError(null);
            setisPending(false);
           }
        }
        catch(err){
            if(!iscancel){
            console.log(err.message);
            setError(err.message);
            setisPending(false);
            }
        } 
    }
    useEffect(() => {
            
        return () => {
         setiscancel(true);   
        }
    },[])
    return {error,isPending,logout};
}