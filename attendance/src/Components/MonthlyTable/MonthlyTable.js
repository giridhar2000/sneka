import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../MonthlyTable/MonthlyTable.css"

export default function MonthlyTable() {
    const [data, setData] = useState([]);
    const numberofDays = []
    const monthName = sessionStorage.getItem("month")

    const getData = async () => {
        await axios.post("http://localhost:9000/month", { "month": monthName })
            .then((response) => {
                setData(response.data);
            })
            .catch((err) => console.log(err))
    }

    const days = () => {
        const ThirtyOneDays = ["January", "March", "May", "July", "August", "October", "December"];
        let lastDay;
        if (ThirtyOneDays.includes(monthName)) lastDay = 31;
        else if (monthName === "February") lastDay = 28;
        else lastDay = 30;
        for (var i = 1; i <= lastDay; i++) {
            numberofDays.push(i)
        }
    }
    days();

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='monthlyTable'>
            <h1>{monthName} Table</h1>
            <table>
                <tbody>
                    <tr className='heading'>
                        <td>Id</td>
                        <td>Name</td>
                        {numberofDays?.map((value, index) => (
                            <td key={index}>{value}</td>
                        ))}
                        <td>Working</td>
                        <td>Leaves</td>
                        <td>Holidays</td>
                    </tr>
                    {data?.map((value, index) => (
                        <tr key={index}>
                            <td>{value.employee_id}</td>
                            <td>{value.employee_name}</td>
                            {numberofDays?.map((v, index) =>
                                value.leaves_dates.split(`,`).map(x => { return +x }).includes(v) ?
                                    <td key={index} className='leave'>L</td>
                                    :
                                    <td key={index} className='present'>P</td>
                            )}
                            <td>{numberofDays.length - value.leaves_dates.split(`,`).map(x => { return +x }).length}</td>
                            <td>{value.leaves_dates.split(`,`).map(x => { return +x }).length}</td>
                            <td>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {data.length > 0 ?
                ""
                :
                <h2 style={{ textAlign: "center" }}>No Records</h2>
            }
        </div>
    )
}
