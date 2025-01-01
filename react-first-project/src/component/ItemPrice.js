import React ,{useState} from 'react';
import './ItemPrice.css'
import { Button } from 'reactstrap';
import BillContribute from './BillContribute';
import Login from './Login';
import CandidateName from './CandidateName';
import { useNavigate } from 'react-router-dom';

const ItemPrice =(props) =>
{
    const {setPrice,getAllCandidateNameList ,name,index,indexing,updateIncludingCandidates}=props
    //console.log(props)
    // billItem.name
    // billItem.price
    const [itemName,setItemName]=useState("")
    const [itemPrice, setItemPrice] = useState("")
    const [candidateName,setCandidateName] = useState([])
    const [contributeCandidate,setContributeCandidate] = useState([])
    const AddContribteCandidate = (contribute) =>{
        setContributeCandidate([contribute])
    }
    const getValue = (event) =>
    {
        // console.log(props.temp.id)
        props.temp.price = event.target.value
        // console.log(props.temp.what)
        // var x=document.getElementById("Element-prices").value;
        // setData(x);
        // // console.log(x)
        // // console.log(document.getElementById("Element-price").value)
    }
    // console.log("ghklj --"+props.setWhat)
    const getFieldValue = (event) =>
    {
        props.temp.what=event.target.value;
        // console.log(event.target.value)
    }
    const inputChangetHandler = (type,event) =>{
        switch (type) {
            case "name":
                setItemName(event.target.value)
                props.setWhat(event)
                break;
            case "price" :
                setItemPrice(event.target.value)
                props.setPrice(event)
                break;
            case "candidate" :
                // setCandidateName(props.getAllCandidateNameList())
                break;
        
            default:
                break;
        }
    }
    const [allCandidate,setAllCandidate] = useState([])
    let [count,setCount] =useState(0);
    const getDataOfCandidate = () =>
    {
        if(count<1)
        {
        setAllCandidate([...allCandidate,{}])
        const data = props.candidateData() 
        setCandidateName([...data]) 
        //props.temp.includeCandidateId = data  
        // updateIncludingCandidates(indexing,{...props.temp,includeCandidateId:data})
        // data.map((item)=>
        // {
        //     setCandidateName([...candidateName,{id:item.id,name:item.name}])
        // })    
        setCount(1)
        }
        else{
            allCandidate.splice(0,1)
            setCount(0);
        }
    }
    const subtractItems = () =>{
        props.subtractItems(index,props.indexingOfExpenses)
        
    }
    const navigate = useNavigate()
    const handleNavigate = () =>{
        navigate('/home')
    }
    return(
        <div>
            <div className="Candidate">
                <input id={props.temp.id} placeholder="What?" type="text" value={itemName} onChange = {(event)=>{inputChangetHandler("name",event)}}/>
                <input id={props.temp.id} placeholder="How much" type="number" value={itemPrice} onChange={(event)=>{inputChangetHandler("price",event)}}  ></input>
                <Button id="ItemsSubtract" onClick={subtractItems}>-</Button>
                <Button id="Include-candidates" onClick={getDataOfCandidate}>Submit</Button>
            </div>
            {allCandidate.map((item)=>{
                return props.temp.includeCandidateId.map((temp)=>{
                    return <CandidateName AddContribteCandidate={AddContribteCandidate} index={index} indexing = {indexing} name={temp} includeCandidate={props.temp.includeCandidateId} updateIncludingCandidate={updateIncludingCandidates}/>
                })
            })}
        </div>
    )
}
export default ItemPrice