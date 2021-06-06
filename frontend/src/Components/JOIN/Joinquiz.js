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
			if(res.status === 200 && data.message !== "Quiz Not Found"){
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

					<div className="conatiner Join-cointainer">
						<div className="Join-contianer-2 shadow-lg p-3 mb-5 bg-white rounded">
							<div className="Join-contianer-content">
								<h1 className="conent-items" >Enter the Code</h1>
								<input type="text" value={code} onChange={handlecode} className="conent-items"/>
								
								<button className="btn btn-primary conent-items"  onClick={fetchquiz}>
									Join Quiz
								</button>
							
							</div>
						</div>
					</div>

				):(
					(valid===0)?(<Errorpage setvalid={setvalid}/>):(<Displayquiz quiz={quiz}/>)
				)
			}
		</>
	);
}
