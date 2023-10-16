import {useState,useEffect,useReducer} from 'react'
import {projectFirestore,timestamp} from '../firebase/config.js'

let initialState={
    document:null,
    isPending:false,
    error:null,
    success:null,
}
const firestoreReducer=(state,action)=>{
    switch (action.type){
        case 'IS_PENDING':
            return {document:null, isPending:true,error:null,success:false};
        case 'ADDED_DOC':
            return {document:action.payload,isPending:false,error:null,success:true};
        case 'DELETED_DOC':
            return {document:null,isPending:false,error:null,success:true};
        case 'ERROR':
            return {document:null,isPending:false,error:action.payload,success:false};
        default:
            return state;
    }
}

export const useFirestore=(collection)=>{
    const [response,dispatch]=useReducer(firestoreReducer,initialState);
    const [iscancel,setiscancel]=useReducer(false);

    const ref=projectFirestore.collection(collection);
    const dispatchifnotcancelled=(action)=>{
        if(!iscancel){
            dispatch(action);
        }
    }

    const addDocument=async(doc)=>{
        dispatch({type:'IS_PENDING'});
        try{const createdat=timestamp.fromDate(new Date());
            const addedDocument=await ref.add({...doc,createdat});
            dispatchifnotcancelled({type:'ADDED_DOC',payload:addedDocument});
        }catch(err){
            dispatchifnotcancelled({type:'ERROR',payload:err.message});
        }

    }
    const deleteDocument=async(id)=>{
        dispatch({type:'IS_PENDING'});
        try{await ref.doc(id).delete();
            dispatchifnotcancelled({type:'DELETED_DOC'});

        }
        catch(err){
            dispatchifnotcancelled({type:'ERROR',payload:'could not delete'});
        }    }
    useEffect(()=>{
        return ()=>setiscancel(true);
    },[])

    return {addDocument,deleteDocument,response};
}