import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'

const Responses = () => {

    const [users,setusers] = useState([])
    const [loading,setloading] = useState(1);
    let { id } = useParams();


    useEffect(()=>{
        const fetchresponses = async ()  =>{
            var res
            try{
                res = await fetch("/user/responses",{
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        quizid:id
                    })
                })
                
                const data = await res.json()
                 if(data.message === "404"){
                     setloading(2)
                     return
                  }
                console.log(data.responses);
                setusers(data.responses);
                setloading(0);
            }
            catch(err){
                console.log(err);
                 setloading(2)
            }
        }

        fetchresponses()
        // eslint-disable-next-line
    },[])

    return (
        <>
            {
                loading === 1 ? 
                    <h1>Loading.........</h1> 
                :
                    loading === 2 ? 
                        <h1>Not found</h1> 
                    :
                        <>  
                            <div className="conatiner bg-light" style={{"background-color":"#F8EFBA","height":"92vh"}}>
                                <h1 style={{"textAlign":"center"}} className="mb-4">Responses</h1>
                                <div className="row">
                                    <div className="col">
                                            <h1>No</h1>
                                    </div>
                                    <div className="col">
                                        <h1>Email</h1>
                                    </div>
                                    <div className="col">
                                        <h1>Score</h1>
                                    </div>
                                </div>
                                {
                                    users.map( (user,i) =>

                                        <div className="row" key={i}>
                                                <div  className="col border-bottom border-top">
                                                       <h1>{i+1}</h1>
                                                </div>
                                                <div  className="col border-bottom border-top">
                                                    <h1>{user.email} </h1>
                                                </div>
                                                <div  className="col border-bottom border-top">
                                                    <h1>{user.score}</h1>
                                                </div>
                                        </div>
                                     
                                    )
                                }
                            </div>
                                
                        </>
            }
        </>
    )
}

export default Responses
