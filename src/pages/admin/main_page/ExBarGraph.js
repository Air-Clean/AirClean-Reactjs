import {ProgressBar} from 'react-bootstrap'
import './ExBarGraphCss.css'
import ApexCharts from 'apexcharts';


export default function ExBarGraph() {

    const options = {
        series : [{
            data : [60]
        }],
        chart :{
            type : 'bar',
            height : '10%',
            stacked : true,
            stackType : '100%'
        },
        plotOptions : {
            bar : {
                horizontal : true,
            }
        },
        tooltip: {
            y: {
              formatter: function (val) {
                return val + "K"
              }
            }
          },
          fill : {
            opacity : 1
          }
    }

    const chart = new ApexCharts(document.querySelector('.electricBar'),options);

    // chart.render();

    const now = 60;
    return (
        <>
            <div className='electirc'>
                <div className="costTitle">
                    <div>전기세</div>
                    <div>142129409</div>
                </div>
                <div className='electricBar'></div>
            </div>
            <div className="water">
                <div className="costTitle">
                    <div>수도세</div>
                    <div>979879879879</div>
                </div>
                <div><ProgressBar now={now} label={`${now}%`}/></div>
            </div>
            <div className="gas">
                <div className="costTitle">
                    <div>가스비</div>
                    <div>9809809809809</div>
                </div>
                <div><ProgressBar now={now} label={`${now}%`}/></div>
            </div>
        </>
    )
}