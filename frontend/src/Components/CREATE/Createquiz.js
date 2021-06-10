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
  const [questions,setQuestions] = useState([]);
  let history = useHistory()
  const[data,setdata] = useState({id:""})

  const onsubmit = async (e) =>{
    e.preventDefault();
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

  return (
    (data.id === "" )?(
    <>
      <div className="conatiner createquiz">
        <div className="row ">
            
            <div className="col-12  title">
              <h2>Quiz title</h2>
              <input type="text" value={title} className="input-text" onChange={e => addtitle(e.target.value)}></input>
            </div>

            <div className="col-12  add-question">
                <button onClick={() => buttontrigger(true)} className="btn btn-info" >ADD question</button>
                {show ? (<Addquestion show={buttontrigger} handlequestion={addquestions} /> ) : null}
            </div>

            <div className="col-12  display-questions">
                <h2>Questions:</h2>
                <div className="List">
                  {
                      questions.map(
                        item => (
                          <Listquestions key={item.id} 
                            questions={item.question} 
                            length = {item.options.length}
                          />))
                  }
                </div>
            </div>

            <div className="col-12  quiz-submit">
                  <button className="btn btn-lg" onClick={onsubmit}>Create Quiz</button>
            </div>

        </div>

      </div>

    
    </>
    ):(<Showcode id={data.id}/>)
  );
};

export default Createquiz