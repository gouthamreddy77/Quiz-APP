import React,{useState,useContext,useEffect} from 'react'
import {AuthContext} from '../Home'

const Dhome = () => {
    
    const{_id} = useContext(AuthContext)
    const [created,setcreated] = useState([])
    const [attempted,setattempted] = useState([])

    
    useEffect(() => {

        const fetchquiz = async ()=>{
            try{
                const res = await fetch("/user/viewquiz",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        userid:_id
                    })
                })
    
                const data = await res.json()
                if(data.message === "User not found")
                     {
                         alert(data.message)
                         return
                     }
                setcreated(data.created)
                setattempted(data.attempted) 
            }
            catch(err){
                console.log(err);
            }

        }

        if(_id  !== undefined)
            fetchquiz()

      },[_id]);
    
    return (
        <>
           {_id === undefined || created===[] || attempted===[] ? <>
            loading<br/>loading<br/>loading<br/>loading<br/>loading<br/>loading<br/>
           </> : 
                <div>
                    Dashboard
                    <h1>Created:</h1>
                    <hr/>
                        <ul>
                            {created===[] ? null : created.map((code,i) => <li key={i}> Title:{code.quiztitle}  Questions:{code.questions}   Code:{code.quizid}   responses:{code.responses}</li> )}
                        </ul>
                    <h1>Attemted:</h1><hr/>
                        <ul>
                            {attempted===[] ? null : attempted.map((code,i) => <li key={i}>Title:{code.quiztitle} Questions:{code.questions} Score:{code.score}</li>)}
                        </ul>
                </div>
           }
            
        </>
    )
}

export default Dhome
