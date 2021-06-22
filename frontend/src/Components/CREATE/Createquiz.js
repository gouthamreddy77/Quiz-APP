import React,{useState,useContext} from 'react'
import 'react-responsive-modal/styles.css';
import { useHistory } from "react-router-dom";
import Listquestions from './Listquestions';
import Addquestion from './Addquestion';
import Showcode from './Showcode';
import {AuthContext} from '../Pages/Home';

const Createquiz = () => {

  const {_id} = useContext(AuthContext)
  const[title,settitle] = useState("");
  const[show,setshow] = useState(false)  //for modal button
  var [questions,setQuestions] = useState([]);
  let history = useHistory()
  const[data,setdata] = useState({id:""})

  const onsubmit = async (e) =>{
    e.preventDefault();
    if(title===""){
      alert("Quiz title Should Not be Empty")
      return
    }
    if(questions.length === 0 ){
      alert("Add Atleat one Question")
      return
    }
    console.log("sample 1st ques: ",questions[0].question);
    try{
        const res = await fetch("/data/post",{
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                title:title,questions:questions
            })
        })

        
        var x = await res.json()
        console.log(x)

        if(res.status !== 200 ){
            window.alert("Not Created");
            history.push("/home")
        }

        await fetch("/user/createdquiz",{
          method:"POST",
          headers:{
            "Content-Type" : "application/json"
          },
          body:JSON.stringify({
            userid:_id,quizid:x.id,quiztitle:title,questions:questions.length
          })
        })

        setdata(x)

    }catch(err){
        console.log(err);
    }
  };



  
  
  const buttontrigger = (x)  => setshow(x)
  const addtitle      = (x)  =>  settitle(x)
  
  const addquestions   = (x,y)  =>  {
    var obj={};
    obj.id = questions.length
    obj.question = x;
    obj.options = y;
    setQuestions([...questions,obj])
  }

  const editquestion = (ind,x,y) =>{
    questions[ind].question = x;
    questions[ind].options = y;
    setQuestions(questions);
  }

  const deletequestion = (ind) =>{
    questions = questions.filter( (item,index)=>{
      return (index !== ind);
    })
    setQuestions(questions);
  }

  return (
    (data.id === "" )?(
    <>
      <div className=" p-sm-1 px-md-5 mx-lg-5 pb-1 " >
            <div className="d-flex flex-column justify-content-around bg-white shadow-lg   rounded-3  mt-5 mb-3 m-1 m-md-5 p-3  px-1" style={{"minHeight":"76vh"}}>
                
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h2 className="">Quiz title</h2>
                  <input type="text" value={title} className="input-text" onChange={e => addtitle(e.target.value)} style={{"width":"68%","borderRadius":"25px"}}></input>
                </div>

                <div className="add-question">
                    <button onClick={() => buttontrigger(true)} className="d-button" style={{"width":"150px","borderRadius":"26px","height":"45px"}}>ADD QUESTION</button>
                    {show ? (<Addquestion show={buttontrigger} handlequestion={addquestions} item={null}/> ) : null}
                </div>

                <div className="display-questions" >
                    <div className="List bg-light" style={{"min-height":"190px","borderRadius":"16px"}}>
                      <div className="row" style={{"borderBottom":"2px solid black"}}>
                        <div className="col-6 col-lg-4 text-center " ><h5>Questions:</h5></div>
                        <div className="col-1 col-lg-4 " style={{"textAlign":"center"}}><h5>Options:</h5></div>
                        <div className="col-5 col-lg-4 editdelete" style={{"textAlign":"right"}}><h5>Edit/Delete:</h5></div>
                      </div>
                      <div className="row " >
                        {
                            questions.map( (item,index) => ( <Listquestions key={index} 
                                  index = {index}
                                  question={item.question} 
                                  item={item}
                                  length = {item.options.length}
                                  editquestion={editquestion}
                                  deletequestion={deletequestion}
                                />))
                        }
                      </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                      <button className="d-button" onClick={onsubmit} style={{"width":"150px","borderRadius":"26px","height":"55px"}}>CREATE QUIZ</button>
                </div>

            </div>

        </div>
    </>
    ):(<Showcode id={data.id}/>)
  );
};

export default Createquiz