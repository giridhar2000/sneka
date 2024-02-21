import React, { useState } from 'react'
import "../Home/Home.css"
import axios from 'axios'
import { message } from 'antd';

export default function Home() {
  const [values, setValues] = useState([])
  const [messageApi, contextHolder] = message.useMessage();
  const error = () => {
    messageApi.open({
      type: 'error',
      content: 'Invalid Input',
    });
  };
  var month = new Date();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  var getDaysArray = function (start, end) {
    //calculate no of days between given dates
    for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
      arr.push(new Date(dt));
    }
    arr = arr.map((element) => { //date format function                  
      var d = new Date(element);
      month = monthNames[d.getMonth()];  //convert the numeric month obtained from a Date object into its corresponding textual representation.
      return d.getDay() === 6 || d.getDay() === 0 ? "" : `${d.getDate()}`;
    });
    return arr.filter(Boolean);
  };

  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const submit = async () => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(values.employeeid)) {
      var leave_dates = getDaysArray(values.leavefrom, values.leaveto)
      await axios.post('http://localhost:9000/post', { values, leave_dates, month, "Reason": "Casual" }).then((res) => console.log(res)).catch((err) => console.log(err))
      console.log(values)

    }
    else {
      error();
    }
  }

  return (
    <div className="formdiv">
      {contextHolder}
      <h2>Leave Form</h2>
      <form action="" className="form">
        <div className="formgroup">
          <label>Employee ID</label>
          <input type="text" id="employeeid" name="employeeid" placeholder="Enter your employee id" onChange={handleOnChange} />
        </div>
        <div className="formgroup">
          <label> Employee Name</label>
          <input type="text" id="name" name="name" placeholder="Enter your Name" onChange={handleOnChange} />
        </div>
        <div className="formgroup">
          <label>Leave From</label>
          <input type="date" id="leavefrom" name="leavefrom" onChange={handleOnChange} />
        </div>
        <div className="formgroup">
          <label>Leave To</label>
          <input type="date" id="leaveto" name="leaveto" onChange={handleOnChange} />
        </div>

      </form>
      <button className="submit_btn" onClick={submit}>Submit</button>
    </div>
  )
}
