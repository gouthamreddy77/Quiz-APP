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
                    <>
                        <div class="d-flex justify-content-center m-5">
                            <h1>Loading...</h1>
                            <div class="spinner-border m-3" role="status">
                                <span class="sr-only "></span>
                            </div>
                        </div>
                    </> 
                :
                    loading === 2 ? 
                        <h1>Not found</h1> 
                    :
                        <>  
                            <div className="conatiner bg-light" style={{"background-color":"#F8EFBA","height":"92vh"}}>
                                <h1 style={{"textAlign":"center"}} className="mb-4">Responses</h1>
                                <div className="row">
                                    <div className="col">
                                            <h2>No</h2>
                                    </div>
                                    <div className="col">
                                        <h2>Email</h2>
                                    </div>
                                    <div className="col">
                                        <h2>Score</h2>
                                    </div>
                                </div>
                                {
                                    users.map( (user,i) =>

                                        <div className="row" key={i}>
                                                <div  className="col ">
                                                       <h3>{i+1}</h3>
                                                </div>
                                                <div  className="col ">
                                                    <h3>{user.email} </h3>
                                                </div>
                                                <div  className="col ">
                                                    <h3>{user.score}</h3>
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
