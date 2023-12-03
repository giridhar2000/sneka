import React, { useEffect, useState } from 'react'
import "../Table/Table.css"
import { Link } from 'react-router-dom';
import axios from 'axios'

export default function Table() {
    const [data, setData] = useState([]);
    const year = new Date()
    const getData = async () => {
        await axios.get("http://localhost:9000/get").then((response) => { setData(response.data); }).catch((err) => console.log(err))
    }
    useEffect(() => {
        getData();
    }, [])
    const column = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    return (
        <div className='table'>
            <h1>Working days &#40;Incl. Weekends&#41;</h1>
            <h2>{year.getFullYear()}</h2>
            <table>
                <tbody>
                    <tr className='heading'>
                        <td>S No.</td>
                        <td>Employee ID</td>
                        <td>Employee Name</td>
                        {column?.map((value, index) => (
                            <td><Link to={"/month"} onClick={() => sessionStorage.setItem("month", value)}>{value}</Link></td>
                        ))}
                        <td>Leaves</td>
                        <td>Working days</td>
                    </tr>
                    {data?.map((value, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{value.employee_id}</td>
                            <td>{value.employee_name}</td>
                            <td>{31 - value.January}</td>
                            <td>{29 - value.February}</td>
                            <td>{31 - value.March}</td>
                            <td>{30 - value.April}</td>
                            <td>{31 - value.May}</td>
                            <td>{30 - value.June}</td>
                            <td>{31 - value.July}</td>
                            <td>{31 - value.August}</td>
                            <td>{30 - value.September}</td>
                            <td>{31 - value.October}</td>
                            <td>{30 - value.November}</td>
                            <td>{31 - value.December}</td>
                            <td>{value.leaves}</td>
                            <td>{365 - value.leaves}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
