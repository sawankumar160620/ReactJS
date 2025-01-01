import React, { useState } from "react";
import './HomePage.css';
import {Button, Container} from 'reactstrap';
import { ToastContainer,toast } from "react-toastify";
import {Jumbotron} from 'reactstrap';
import App from "../App";
import { useNavigate } from "react-router-dom";
const HomePage = () =>
{
    const [data, setData] = useState(0)
    const[isTrip,setIsTrip] = useState([{id:0,tripName:"",noOfCandidates:0}])
    const Minus = () =>{
        if(data!==0 && data>0){
        setData(data-1)
        }
    }
    const navigate = useNavigate()
    const handler = () => {
        isTrip[0].noOfCandidates = data
        navigate("/home",{state:isTrip})
    }
    const inputChangeHandler = (type,event) =>
    {
        switch(type)
        {
            case "TripName":
                isTrip[0].tripName = event.target.value
                break
            case "Candidates":
                setData(data+Number(event.target.value))
        }
    }
    const Add = () =>
    {
        setData(data+1)
        // switch(type){
        //     case "Minus":
        //         setData(data -1)
        //         break;
        //     // case "Add":
        //     //     setData(data +1)
        //     //     break;
        // }
    }
    return(
        <div className="div-header">
            <header className="header">
                <h1>Budget Calculator</h1>
                <p>This project is used for conribution of candidate easy understand</p>
                {/* <hr></hr> */}
            </header>
            <div className="Head-Container">
                 <div className="Second-block">
                    <Container className="container">
                        <Button className="Show-Example">Show Example</Button>
                        <p className="Para-graph">OR</p>
                        <Button className="Demo">Start</Button>
                        <p className="Pragraph">How many people are in your group</p>    
                    </Container>
                    <header className="header-second">
                        <Button className="Minus" onClick={Minus}>-</Button>
                        <input className="candidate" type="number" value={data} onChange={(event)=>{inputChangeHandler("Candidates",event)}}></input>
                        <Button className="Add" onClick={Add}>+</Button>
                    </header>
                    <p className="PARAGRAPH">Give it a trip name!</p>
                    <header className="HeaderTrip">
                    <input className="TripName" placeholder="e.g. Roadtrip" onChange={(event)=>{inputChangeHandler("TripName",event)}}></input>
                    <Button className="Go" onClick={handler}>Go</Button>
                    </header>
                </div>
            </div>
        </div>
    )
}
export default HomePage