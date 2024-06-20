import React, { Component } from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
//var CanvasJSReact = require('@canvasjs/react-charts');

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class SDiagram4 extends Component {
    render() {
        const options = {
            animationEnabled: true,
            exportFileName: "New Year Resolutions",
            exportEnabled: true,
            title:{
                text: "The main goal"
            },
            data: [{
                type: "pie",
                showInLegend: true,
                legendText: "{label}",
                toolTipContent: "{label}: <strong>{y}%</strong>",
                indexLabel: "{y}%",
                indexLabelPlacement: "inside",
                dataPoints: [
                    { y: 32, label: "Health" },
                    { y: 22, label: "Finance" },
                    { y: 15, label: "Education" },
                    { y: 19, label: "Career" },
                    { y: 5, label: "Family" },
                    { y: 7, label: "Real Estate" }
                ]
            }]
        }
        return (
            <div>
                <CanvasJSChart options = {options}
                    /* onRef={ref => this.chart = ref} */
                />
                {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
            </div>
        );
    }
}
export default SDiagram4;