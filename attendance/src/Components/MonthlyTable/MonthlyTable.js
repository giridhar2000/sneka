import React, { useEffect, useState } from 'react'
import axios from 'axios';
import "../MonthlyTable/MonthlyTable.css"
import * as XLSX from 'xlsx';
import Holiday from "../../Assets/holiday.xlsx"

export default function MonthlyTable() {
    const [data, setData] = useState([]);
    const [holidays, setHolidays] = useState([]);
    const [monthHolidays, setMonthHolidays] = useState([])
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
        async function fetchData() {
            try {
                const response = await fetch(Holiday);
                const arrayBuffer = await response.arrayBuffer();
                const binaryString = String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
                const workbook = XLSX.read(binaryString, { type: 'binary' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];

                // Parse all cells as text to preserve leading zeros
                const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, dateNF: 'dd-mm-yy' });

                // Extracting headers (first row) and data (remaining rows)
                const [headers, ...rows] = jsonData;

                // Creating array of objects with headers as keys and corresponding values from rows
                const parsedData = rows.map(row =>
                    headers.reduce((obj, key, index) => {
                        obj[key] = row[index];
                        return obj;
                    }, {})
                );
                setHolidays(parsedData)
                console.log(parsedData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        getData();

    }, [])

    const getHolidays = () => {
        const holiday = []
        const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "octobar", "november", "december"]
        holidays.filter(val => parseInt(val.Date.substring(3, 5)) === months.indexOf(monthName.toLowerCase()) + 1)
            .map(value => holiday.push(value))
        return holiday

    }
    const getHoliday = getHolidays()
    setTimeout(() => {
        console.log(getHoliday.length)
    }, 1000)


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
                        <tr key={index} className='data-tr'>
                            <td>{value.employee_id}</td>
                            <td>{value.employee_name}</td>
                            {numberofDays?.map((v, index) => (
                                value.leaves_dates.split(`,`).map(x => { return +x }).includes(v) ?
                                    <td key={index} className='leave'>L</td>
                                    :
                                    <td key={index} className='present'>P</td>
                            ))}
                            <td>{numberofDays.length - value.leaves_dates.split(`,`).map(x => { return +x }).length - getHoliday.length}</td>
                            <td>{value.leaves_dates.split(`,`).map(x => { return +x }).length}</td>
                            <td>{getHoliday.length}</td>
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
