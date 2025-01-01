
import Calculator from './Calculator';
import Menu from './Menu';
import Login from './Login';
import HomePage from './HomePage';
import BillContribute from './BillContribute';
import { useEffect, useRef, useState } from 'react';
import { Button } from 'reactstrap';
import ItemPrice from './ItemPrice';
import { useLocation, useNavigate } from 'react-router-dom';
import Total from './Total';
const Trip=()=>  {
  // all the calculation will be done on this page. 
  // other components will be used to set or get data

  const [ids, setIds] = useState(2)
  var countIds = ids
  const location = useLocation()
  var noOfCandidates = location.state[0].noOfCandidates-1
  const [candidateName,setCandidateName] = useState([{id:1,name:"Name 1",checked:false}])
  const [candidateCalculation,setCandidateCalculation] = useState([{id:1,name:"","Total spend":0,"My spend":0,"I Want":0,"I Pay":0}])
  const myJsonStringOfCandidate = JSON.stringify(candidateName)
  const myJsonCandidate = JSON.parse(myJsonStringOfCandidate)
  const totalSectionRef = useRef(null)
  const [isShowTotalComponet,setIsShowTotalComponent] = useState(false)
  const [billList,setbillList] = useState([
    {
      id:1,
      defaultName:"Name 1",
      name : "Name 1",
      total : 0,
      expenses : [{id:1,what:"",price:0,includeCandidateId:myJsonCandidate}]
    }
    // },{
    //   id:ids,
    //   name : "",
    //   total : 0,
    //   expenses : []
    // }

  ]);
  const [pageNUmber , setPageNumber]  =useState(0)
  const [count,setCount] = useState(2)
  var countCanidateIds = count
  const AddCandidate =() =>{
    // billList.push()
    
    candidateName.push({id:countCanidateIds,name:"Name "+countCanidateIds,checked:false})
    candidateCalculation.push({id:countCanidateIds,name:"","Total spend":0,"My spend":0,"I Want":0,"I Pay":0})
    countCanidateIds++
    setCount(countCanidateIds)
    //setCandidateName([...candidateName , {id:count,name:"Name "+count,checked:false}] )
  }
  const getAllCandidateNameList = () => {
    billList.map((item)=>{
      candidateName.map((temp)=>{
        if(item.id==temp.id && item.name !=="")
        {
          temp.name=item.name;
        }
        if(item.id==temp.id && item.name =="")
        {
          temp.name=item.defaultName
        }
      })
    })
  // billList.filter((item)=>{

  // //   candidateName.map((temp)=>{
  // //     if(item.id!==temp.id)
  // //     {
  // //      return  setCandidateName([...candidateName,{id:item.id,name:item.name}])
  // //     }
  // //     return setCandidateName([...candidateName,{id:item.id,name:item.name}])
  // // })
  // return item;
  // })
  return candidateName
}

// useEffect(()=>{
// const value = getAllCandidateNameList
// billList.map((item)=>{
//   item.expenses.map((temp)=>{
//     temp.includeCandidateId=value
//     return temp
//   })
//   return item
// })
// },[])
  // useEffect(()=>{
  //   // let names = ['Anish', "sawan"]
  //   // for(let i of names){
  //   //   setbillList([...billList , {  name : "Sawan",expenses : []  } ] )
  //   // }
  //   // api call to get data of next page


  //   // jab mein page pr aayga
  //   test()



  //   return ()=>{
      
  //   }
  // },[pageNUmber])
console.log("----original list----------")
console.log(billList)
  const AddItem =() =>{
    // billList.push()
    AddCandidate()
    billList.push({id:countIds,defaultName:"Name "+countIds,name:"Name "+countIds,total:0,expenses:[{id:1,what:"",price:0,includeCandidateId:[]}]})
    countIds++
    setIds(countIds)
    // setbillList([...billList , {id:ids,defaultName:"Name "+ids,name:"",total:0,expenses:[{id:1,what:"",price:0,includeCandidateId:candidateName}]} ] )
    billList.map((item)=>{
      item.expenses.map((teno)=>{
        if(teno.includeCandidateId.length<candidateName.length)
        {
          for(let i=teno.includeCandidateId.length;i<candidateName.length;i++)
          {
            const JsonStringOfupdateCandidates=JSON.stringify(candidateName[i])
            const updateCandidates = JSON.parse(JsonStringOfupdateCandidates)

            teno.includeCandidateId.push(updateCandidates)
          }
        }
        //teno.includeCandidateId=candidateName
        return teno
      })
      return item
    })
    console.log(billList)
  }
  const addBillExpenses = (index,moreExpenses) =>
  {
    billList.map((item)=>{
      if(item.id==index){
        candidateName.filter((item)=>{
          const jsonCandidateNameString = JSON.stringify(item)
          const jsonCandidateName = JSON.parse(jsonCandidateNameString)
          moreExpenses.includeCandidateId.push(jsonCandidateName)
        })
        // moreExpenses.includeCandidateId=candidateName
        const jsonStringMoreExpenses = JSON.stringify(moreExpenses)
        const jsonMoreExpenses = JSON.parse(jsonStringMoreExpenses)
      item.expenses.push(jsonMoreExpenses)
      }
      return item
    })
  }
  const updateBillExpenses  = (index,expensesData) => {
    //console.log(expensesData);
    billList.map((item)=>{
      item.expenses.map((expensesItem)=>{
        expensesItem.includeCandidateId.map((candidateItems)=>{
          if(index==candidateItems.id)
          {
            candidateItems.name = expensesData.name
          }
          if(item.id==index && expensesItem.id==expensesData.expensesId && candidateItems.id==expensesData.checkBoxId)
          {
            candidateItems.checked=expensesData.isChecked;
          }
        })
        // if(expensesData.expenses!=="" && item.id==index && expensesItem.id==expensesData.expensesId)
        //   {
            
        //   }
        
      })
      if(item.id==index)
      {
        item.defaultName = expensesData.defaultName
        item.name = expensesData.name
        if(expensesData.sum!==undefined)
        {
          item.total = expensesData.sum
        }
        //item.expenses = expensesData.expenses
      }
      return item
    })
    
    setbillList([...billList])
    // const arr = billList.map((item) =>
    // {
    //   // const items =[];
    //   item.expenses.map((expensesItem,expensesIndex)=>{
    //     if(expensesItem.what =="" && expensesItem.price ==0)
    //     {
    //       item.expenses.splice(expensesIndex,1)
    //       // return expensesItem
    //     }
    //   })
    //   // return items;
    // })
    // getAllCandidateNameList()
    // console.log(billList)
    // console.log(arr)
  }
  const subtractItems = (index,indexing)=>{
    billList.map((item)=>{
      if(item.id == index && item.expenses.length>1){
          item.expenses.splice(indexing,1)
      }
      return item
    })
    setbillList([...billList])
  }
  const Calculate = () =>{
    const candidateCalculationJsonString=JSON.stringify(candidateCalculation)
    const candidateCalculations = JSON.parse(candidateCalculationJsonString)
    billList.map((candidate)=>{
      candidateCalculations.map((candidateClone)=>{
        if(candidate.id==candidateClone.id)
        {
          candidateClone.name = candidate.name
          candidateClone['Total spend'] = candidate.total
        }
        return candidateClone
      })
    })

    billList.map((candidate)=>{
      candidate.expenses.map((expense)=>{
        var includePersonCount = 0
        const includePerson =[]
        expense.includeCandidateId.filter((includeCandidates)=>{
          if(includeCandidates.checked==true){
            includePersonCount+=1;
          includePerson.push({id:includeCandidates.id})
          }
        })
        const perExpensePrice = expense.price/includePersonCount
        candidateCalculations.map((items)=>{
          includePerson.map((temp)=>{
            if(items.id==temp.id)
            {
              items['My spend'] +=perExpensePrice
            }
            return temp;
          })
          return items
        })
      })
    })
    candidateCalculations.map((item)=>{
      if((item['Total spend']-item['My spend'])>0)
      {
        item['I Want'] = item['Total spend'] - item['My spend']
      }
      else{
        item['I Pay'] = item['My spend'] - item['Total spend']
      }
      return item
    })
    const payerAndReciver = []
    candidateCalculations.map((item)=>{
      if(item['I Pay']>0)
      {
        candidateCalculations.map((temp)=>{
          if(temp['I Want']>0 && item['I Pay']!==0)
          {
            if(temp['I Want']>item['I Pay'])
            {
              payerAndReciver.push({senderName:item.name,receiverName:temp.name,payMoney:Number(item['I Pay'].toFixed(2)),reciveMoney:Number(item['I Pay'].toFixed(2))})
              temp['I Want'] = temp['I Want'] - item['I Pay']
              item['I Pay'] = item['I Pay'] - item['I Pay']
            }
            else{
              payerAndReciver.push({senderName:item.name,receiverName:temp.name,payMoney:Number(temp['I Want'].toFixed(2)),reciveMoney:Number(temp['I Want'].toFixed(2))})
              item['I Pay'] = item['I Pay'] - temp['I Want']
              temp['I Want'] = temp['I Want'] - temp['I Want']
            }
          }
          return temp
        })
      }
      return item
    })
    setIsShowTotalComponent(true)
    setTimeout(()=>{
      scrollToSection()
    },800)
    console.log(payerAndReciver) 
    console.log(candidateCalculations) 
  }
   useEffect (()=>{
  var i = 0
  // Array.from(Array(noOfCandidates)).map((o,i)=>{
  //   setbillList(prev=>[...prev,])
  // })
  while(i<noOfCandidates)
  {
    AddItem()
    i = i+1;
  }
  noOfCandidates=0;
  },[])
  
//   const navigate = useNavigate()
//   const handleNavigate = () =>{
//     navigate('/home')
//   }
  // const updateName

  const scrollToSection = () => {
    totalSectionRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center", // possible value's are 'start', 'end' and 'center's
    });
  };
  return (
<>
    {billList.map((item, index)=>
    {
    return <BillContribute key={item.id} index={item.id} getAllCandidateNameList={getAllCandidateNameList} updateBillExpenses={updateBillExpenses} userDetails={item} addBillExpenses={addBillExpenses} subtractItems={subtractItems}/>
    })}
    <button onClick={() => {AddItem()}}>Click here</button>
    <Button onClick ={()=> {Calculate()}}>Calculate</Button>
    <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
</div>
    { isShowTotalComponet && <div ref={totalSectionRef}><Total ></Total>
      </div>}
    <div>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

</div>
    </>
  );
}

export default Trip;
