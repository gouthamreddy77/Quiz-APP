import React, { useState } from 'react';
import Errorpage from './Errorpage';
import Displayquiz from './Displayquiz'

export default function Joinquiz() {
	const [quiz,setquiz] = useState({Questions:[
		{
			question:"",
			options:[
				{}
			]
		}
	]})
	const [valid,setvalid] =useState(2);
	//sample codes  ->> 60ae8f9cc5cd09a900f17c33
	const [code,setcode] =useState("60af9cecf1dd6398d452bd44")

	const handlecode = (e) =>	setcode(e.target.value)
	
	const fetchquiz = async () =>{
		try{
			const res = await fetch("/data/get",{
				method:"POST",
				headers:{
					"Content-Type" : "application/json"
				},
				body:JSON.stringify({
					id: code
				})
			})
			
			const data = await res.json()
			console.log(data);
			if(data.message === "Quiz Found"){
				console.log(data.newquiz[0]);
				setquiz(data.newquiz[0])
				setvalid(1);
			}
			else{
				setvalid(0);
			}
		}catch(err){
			console.log("err");
			setvalid(0);
		}
	}


	return (
		<>
			{
				(valid === 2)?(
					<>
					<div className="row d-flex justify-content-center align-items-center" style={{"height":"88vh"}}>
						<div className="col-sm-12 col-md-5  d-flex flex-column border p-5 justify-content-between login1" style={{"height":"50vh"}}>
							<h1 className="text-center fs-1 fw-bold" >Enter the Code</h1>
							<input type="text" value={code} onChange={handlecode} className="conent-items" style={{"height":"50px","borderRadius":"16px","width":"80%","marginLeft":"10%","paddingLeft":"15%"}}/>
							
							<button className="btn btn-primary conent-items d-button"  onClick={fetchquiz} style={{"width":"80%","marginLeft":"10%"}}>
								Join Quiz
							</button>	
						</div>
					</div>
					</>

				):(
					(valid===0)?(<Errorpage setvalid={setvalid}/>):(<Displayquiz quiz={quiz} code={code}/>)
				)
			}
		</>
	);
}
