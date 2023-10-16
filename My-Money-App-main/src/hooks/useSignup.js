import {useState,useEffect} from 'react'
import {projectAuth} from '../firebase/config.js'
import { useAuthContext } from "./useAuthContext";

export const useSignup=()=>{
    const [error,setError]=useState(null);
    const [isPending,setisPending]=useState(false);
    const [iscancel,setiscancel]=useState(false);
    const {dispatch}=useAuthContext();
    //signup
    const signup=async(email,password,displayName)=>{
        setError(null);
        setisPending(true);

        try{
            const res=await projectAuth.createUserWithEmailAndPassword(email,password);
            console.log(res.user);
            if(!res){
                throw new Error("signup failed");
            }
     //add displayname
            await res.user.updateProfile({displayName})
     //dispatch login event
            dispatch({type:'SIGNUP',payload:res.user})
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
    return {error,isPending,signup};
}