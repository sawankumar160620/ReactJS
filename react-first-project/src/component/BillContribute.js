import React, { useEffect, useState } from "react";
// import logo from '../logo.svg';
import logo from '../logo.svg';
import { Button } from "reactstrap";
import './BillContribute.css';
import ItemPrice from "./ItemPrice";
const BillContribute = (props) =>
{
    const {userDetails,getAllCandidateNameList, updateBillExpenses, index} = props
    const checkedList = props.getAllCandidateNameList()
    let [itemID,setItemId]=useState(2)
    // const item =[{name : "ssaawaan" , price : 2000}]
    const [candidateName, setCandidateName] = useState("");
    const [data, setData] = useState('');
    const [secondData, setSecondData] = useState('')
    const [total,setTotal] = useState(0)
    const [array, setArray] = useState([{id:1,what:"",price:0,includeCandidateId:[]}])
      const AddItem =() =>{
        // billList.push()
        setItemId(itemID+1)
        props.addBillExpenses(index,{id:itemID,what:"",price:0,includeCandidateId:[]})
        setArray([...array , {id:itemID,what:"",price:0,includeCandidateId:[]} ] )
      }
    // const getValue = (event) =>
    // {
    //     // console.log(event.target.id)
    //     setData(event.target.value)
    // }
    const getValueDynamic = (event) => {
        // console.log(event.target.id)
        // console.log("total value "+event.target.value)
        // setSecondData(event.target.value)
        const arr = userDetails.expenses.map((item,index)=>{
            // console.log("id  :-"+item['id'])
            // console.log("event.id  :-"+event.target.id)
            // console.log("item.id===event.target.id  :-"+ (Number(event.target.id) == item['id']))
            if(item.id == Number(event.target.id))
            {
                if(!isNaN(event.target.value)){
                    item.price = event.target.value
                    // console.log(event.target.value)
                }
                // console.log(Number(event.target.price))
            }
            return item
        })
        let sum=getTotal();
        updateBillExpenses(index,{...userDetails,sum})
        // console.log(arr)
    }
    const getText = (event) =>
    {
        const arr = userDetails.expenses.map((item)=>{
        if(item.id == Number(event.target.id))
        {
            // console.log("getTExt : -"+ item.what)
            // if(event.target.value !== ""){
                item.what = event.target.value
                // console.log("new What value :-"+item.what)
                // console.log(event.target.value)
            // }
        }
        return item
        })
        // let sum =getTotal()
        // updateBillExpenses(index,{...userDetails,name:candidateName,sum,expenses:userDetails.expenses})
        // console.log("new text array :- "+arr)
    }
    const getTotal =() => {
        let sum = 0
        userDetails.expenses.filter((item)=>{
            sum+=Number(item.price)
        })
        setTotal(sum+=Number(data))
        return sum;
    }
    useEffect(() => {
    array.map((item)=>{
        console.log(item);
    })
    array.map((item)=>{
        // console.log(" new array :-----"+(item))
    })
    // setTotal(Number(total)+Number(secondData))
    // let sum = 0
    // array.filter((item)=>{
    //     sum+=Number(item.price)
    // })
    // setTotal(sum+=Number(data))
    // console.log(candidateName)
    // console.log(total)
    // // console.log(isNaN(total))
    // console.log("data of first :-"+Number(data))
    // console.log("new Added data :-" + Number(secondData))
    // setTotal(Number(data) + Number(secondData)) 
    // console.log(total) 
    setCandidateName(userDetails.defaultName)
    // let sum = getTotal()
    // updateBillExpenses(index,{...userDetails,name:userDetails.defaultName,sum,expenses:userDetails.expenses})
    },[])
    const inputChangeHandler = (type,event) =>
    {
        switch(type){
            case "name":
                setCandidateName(event.target.value);
                //console.log(candidateName)
                // let sum = getTotal()
                userDetails.name = event.target.value
                updateBillExpenses(index,{...userDetails,name:event.target.value})
                // updateBillExpenses(index,{...userDetails,name:event.target.value,sum})
                break;
        }
    }
    const inputFocusHandler = (type,event) =>
        {
            switch(type){
                case "name":
                    if(event.target.value !==""){
                    setCandidateName(event.target.value);
                    // console.log(candidateName)
                    //userDetails.name = event.target.value
                    // let sum = getTotal()
                    updateBillExpenses(index,{...userDetails,name:event.target.value})
                }
                else{
                    setCandidateName(userDetails.defaultName);
                    // console.log(candidateName)
                    // let sum = getTotal()
                    //userDetails.name = event.target.value
                    updateBillExpenses(index,{...userDetails,name:userDetails.defaultName})
                }
                    break;
            }
        }
    const [candidateData,setCandidateData] =useState([{id:1,name:""}])
    const persons = () =>
    {
        const data = props.getAllCandidateNameList()
              return data;
    }
    const updateIncludingCandidates = (index,indexing , id,isChecked) =>
    {
        updateBillExpenses(index,{...userDetails,expensesId:indexing,checkBoxId:id,isChecked})
        // array.map((item)=>{
        //     if(item.id == indexing)
        //     {
        //         item.includeCandidateId = includingCandidate.includeCandidateId
        //     }
        //     return item
        // })
        // console.log(array)
    }
    const subtractItems = (index,indexing)=>{
        // userDetails.expenses.splice(indexing)
        props.subtractItems(index,indexing)
        getTotal()
    }
    console.log("after including candidates")
    console.log(array)

    return(
        <div id="Form-control">
            <div id="WrapName">
                <input id={index} placeholder="Enter name" value={candidateName} type="text" onBlur={(event) => {inputFocusHandler("name",event)}} onChange={(event) => {inputChangeHandler("name",event)}}></input>
                <label id ="total" value="">{total}</label>
            </div>
            <header className="Candidate">
                {/* <ItemPrice  temp = {item} key={item.id} setWhat={getText} setPrice={getValue}>test</ItemPrice> */}
                {/* {false && <p>working</p>} */}
                {/* <input id="Element" placeholder="What?" type="text"/>
                <input id="Element-price!" placeholder="How much!" type="number" onKeyUp={getValue}></input>
                <Button id="Include-candidates"></Button> */}
            </header>
            {userDetails.expenses.map((item,indexing)=>
            {
                return <ItemPrice temp = {item} key={item.id} indexingOfExpenses={indexing} indexing ={item.id} index={index} candidateData={persons} getAllCandidateNameList = {getAllCandidateNameList} setWhat={getText} setPrice={getValueDynamic} updateIncludingCandidates={updateIncludingCandidates} subtractItems={subtractItems}>test</ItemPrice> 
            })}
            <Button onClick={AddItem} id="More">More</Button>
        </div>
    );
}
export default BillContribute