import React, { useEffect, useState } from "react";
const CandidateName = (props) =>{
    const [count,setCount] = useState(1);
    const [isChecked,setIsChecked] = useState(false)
    // console.log("----------------props.----------")
    // console.log(props)
    const [selectedIds,setSelectedIds] = useState([])
//     useEffect (()=>{
//     props.includeCandidate.map((item)=>{
//         if(props.index+" "+item.id+" "+props.indexing==props.index+" "+props.name.id+" "+props.indexing)
//         {
//             setIsChecked(item.checked)
//         }
//         return item;
//     })
// },[isChecked])
    const inputCheckBoxHandler = (event) =>{
        setIsChecked(!isChecked)
        if(!isChecked)
        {
            selectedIds.push(event.target.id-props.index)
            // props.includeCandidate.map((item)=>{
            //     if(props.index+" "+item.id+" "+props.indexing==event.target.id)
            //     {
            //         item.checked=true
            //     }
            //     return item;
            // })
            props.updateIncludingCandidate(props.index,props.indexing,props.name.id,true)
        }
        else{
            selectedIds.splice()
            // props.includeCandidate.map((item)=>{
            //     if(props.index+" "+item.id+" "+props.indexing==event.target.id)
            //     {
            //         item.checked=false
            //     }
            //     return item
            // })
            props.updateIncludingCandidate(props.index,props.indexing,props.name.id,false)
        }
    }
    // console.log("include Candidates")
    // console.log(props.includeCandidate)
    return(
        <div>
            <input id={props.index+" "+props.name.id+" "+props.indexing} type="checkbox" checked={props.name.checked} onChange={inputCheckBoxHandler}/>
            <label for={props.index+" "+props.name.id+" "+props.indexing} >{props.name.name}</label>
            <br/>
        </div>
    )
}
export default CandidateName;