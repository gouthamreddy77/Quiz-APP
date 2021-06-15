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
                        <div className="d-flex justify-content-center m-5">
                            <h1>Loading...</h1>
                            <div className="spinner-border m-3" role="status">
                                <span className="sr-only "></span>
                            </div>
                        </div>
                    </> 
                :
                    loading === 2 ? 
                        <h1>Not found</h1> 
                    :
                        <>  
                            <div className="conatiner bg-white border p-4" style={{"backgroundColor":"#F8EFBA","height":"88vh"}}>
                                <h1 style={{"textAlign":"center"}} className="mb-4">Responses</h1>
                                <div className="row mx-3 text-white text-center shadow-lg" style={{"backgroundColor":"#d81e5b","borderTopRightRadius":"10px","borderTopLeftRadius":"10px"}}>
                                    <div className="col col-sm-3 center">
                                            <h5>No</h5>
                                    </div>
                                    <div className="col col-sm-3">
                                            <h5>Name</h5>
                                    </div>
                                    <div className="col col-sm-3">
                                        <h5>Email</h5>
                                    </div>
                                    <div className="col col-sm-3">
                                        <h5>Score</h5>
                                    </div>
                                </div>
                                <div className=" mx-3 shadow-lg bg-light" style={{"borderBottomRightRadius":"10px","borderBottomLeftRadius":"10px"}}>
                                    {
                                        users.map( (user,i) =>

                                                <div className="row mx-3 text-center border-bottom" key={i} >
                                                        <div  className="col col-sm-3" >
                                                            <h5>{i+1}</h5>
                                                        </div>
                                                        <div  className="col col-sm-3">
                                                            <h5>{user.email.split('@')[0]} </h5>
                                                        </div>
                                                        <div  className="col col-sm-3">
                                                            <h5>{user.email} </h5>
                                                        </div>
                                                        <div  className="col col-sm-3">
                                                            <h5>{user.score}</h5>
                                                        </div>
                                                </div>        
                                        )
                                    }
                                </div>
                            </div>
                                
                        </>
            }
        </>
    )
}

export default Responses
