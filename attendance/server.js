var express = require("express") //server where mysql is being run
var mysql = require("mysql2") //db
var app = express()
var cors = require('cors') //security

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "mydb"
});

app.use(express.json())
app.use(cors())
app.post('/post', function (req, res) { //post-method
    var employeeid = req.body.values.employeeid
    var name = req.body.values.name
    var leave_dates = req.body.leave_dates
    var month = req.body.month
    var reason = req.body.Reason
    for (var i = 0; i < leave_dates.length; i++) {
        var sql = `INSERT INTO employee_details (employee_id, employee_name, leave_month, leave_date, reason) VALUES (${employeeid}, '${name}', '${month}', ${leave_dates[i]}, '${reason}')`
        con.query(sql, function (err, result) {
            if (err) throw err
            console.log(' leavedays row has been updated')
        })
    }
})

app.get("/", function (req, res) {
    var sql = "SELECT * FROM employee_details"
    con.query(sql, function (err, result) {
        if (err) { throw err }
        res.send(result)
    })
})

app.get("/get", async (req, res) => {
    var sql = `SELECT 
        employee_id, employee_name,
        COUNT(case when (leave_month='January') then leave_month else NULL end) as 'January',
        COUNT(case when (leave_month='February') then leave_month else NULL end) as 'February',
        COUNT(case when (leave_month='March') then leave_month else NULL end) as 'March',
        COUNT(case when (leave_month='April') then leave_month else NULL end) as 'April',
        COUNT(case when (leave_month='May') then leave_month else NULL end) as 'May',
        COUNT(case when (leave_month='June') then leave_month else NULL end) as 'June',
        COUNT(case when (leave_month='July') then leave_month else NULL end) as 'July',
        COUNT(case when (leave_month='August') then leave_month else NULL end) as 'August',
        COUNT(case when (leave_month='September') then leave_month else NULL end) as 'September',
        COUNT(case when (leave_month='October') then leave_month else NULL end) as 'October',
        COUNT(case when (leave_month='November') then leave_month else NULL end) as 'November',
        COUNT(case when (leave_month='December') then leave_month else NULL end) as 'December',
        COUNT(employee_id) as leaves
    FROM
        employee_details
    GROUP BY 
        employee_id,
        employee_name;`
    con.query(sql, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.post("/month", async (req, res) => {
    var sql = `SELECT employee_id, employee_name, leave_month, GROUP_CONCAT(leave_date) as leaves_dates FROM employee_details WHERE leave_month = "${req.body.month}" GROUP BY employee_id, employee_name, leave_month;`
    con.query(sql, function (err, result) {
        if (err) throw err
        res.send(result)
    })
})

app.listen(9000, function () {
    console.log('Connected to port 9000');
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});