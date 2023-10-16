import {useState,useEffect} from 'react'
import {projectAuth} from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext";

export const useLogin=()=>{
    const [error,setError]=useState(null);
    const [isPending,setisPending]=useState(false);
    const [iscancel,setiscancel]=useState(false);
    const {dispatch}=useAuthContext();
    //signup
    const login=async(email,password)=>{
        setError(null);
        setisPending(true);

        try{
            const res=await projectAuth.signInWithEmailAndPassword(email,password);
            console.log(res.user);
          
     
     //dispatch login event
            dispatch({type:'LOGIN',payload:res.user})
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
    return {error,isPending,login};
}