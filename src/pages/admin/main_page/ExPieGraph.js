import './ExPieGraphCss.css'
import Chart from 'react-apexcharts'


export default function ExPieGraph() {

    const series = [399539,494999,339994]
    const options = {
        chart : {
            type : 'poloarArea'
        },
        labels : ['전기세','수도세','가스비'],
        colors : ['rgb(255, 149, 8)','rgb(8, 85, 255)','rgb(255, 8, 8)'],
        stroke : {
            colors: ['#fff']
        },
        fill : {
            opacity : 0.8
        },
        responsive : [
            {
                breakpoint : 480,
                options : {
                    chart : {
                        width : 200
                    },
                    legend : {
                        position : 'right'
                    }
                }
            }
        ]
    }

    return (
        <div className="pieGraphContainer">
            <div className='pieGraphTitle' style={{fontWeight: 'bold'}}>수도광열비</div>
            <div className='pieGraphContent'>
                <Chart
                    series={series}
                    options ={options}
                    height ='100%'
                    type = 'polarArea'
                />
            </div>
        </div>
    )
}