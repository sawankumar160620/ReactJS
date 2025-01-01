import React, { useState } from 'react'
import HomePage from './HomePage';
const Menu = () =>
{
    const [data,setData]=useState();
    const getValue = (event) => {
        console.log(event.target.value);
        setData(event.target.value)
        var x=document.getElementById("password").value
        console.log(data)
        // setData(x);
    }
    return(
        <div className='container'>
            <div>
            <input placeholder='Sawan' value={data}/>
            <p id='demo'>Hello</p>
            <input placeholder='password' id='password' type='text'/>
            </div>
            <div>
        <button id="more" onClick={getValue} value="fdghjk">Menu</button>
        </div>
        </div>
    )
}
export default Menu