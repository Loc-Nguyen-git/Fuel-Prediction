import React, { Fragment } from "react";
import "./stylesheets/style.css";

const FuelHistory = () => {
    return (
    <Fragment>
        <html>
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title> Fuel Quote Project- History</title>
                <link rel="stylesheet" href="stylesheets/style.css" />
            </head>
            <body>
            <h1></h1>
            <h2 class="center">Fuel Quote History of client1</h2>
            <table class="a">
            <tr>
                <th>Date of quotes</th>
                <th>Gallons Requested</th>
                <th>Delivery Address</th>
                <th>Delivery Date</th>
                <th>Total Amount Due (dollars)</th>
            </tr>

            <tr>
                <td>02/08/2021</td>
                <td>10</td>
                <td>4800 Calhoun Rd, Houston, TX 77004</td>
                <td>02/12/2021</td>
                <td>$1100</td>
            </tr>

            <tr>
                <td>&nbsp </td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
            </tr>

            <tr>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
            </tr>

            <tr>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
            </tr>

            <tr>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
            </tr>

            <tr>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
                <td>&nbsp</td>
            </tr>
            </table>


            </body>
        </html>
    </Fragment>);
}

export default FuelHistory;