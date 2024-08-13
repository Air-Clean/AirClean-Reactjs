import './ExPieGraphCss.css'
import Chart from 'react-apexcharts'

export default function ExPieGraph({ expense, com = 'Total' }) {

    let totalEx = 0;
    let elect = 0;
    let water = 0;
    let gas = 0;

    console.log('com', com)

    if (com === 'Total') {
        expense.forEach(e => {
            totalEx += e?.totalExpenseCost || 0;
            elect += e?.electricityBill || 0;
            water += e?.waterBill || 0;
            gas += e?.gasBill || 0;
        });
    } else {
        const branchRegion = expense.find(e => e.branch.branchCode === com)?.branch?.branchRegion;

        if (branchRegion) {
            const regionExpense = expense.filter(e => e.branch.branchRegion === branchRegion);

            regionExpense.forEach(e => {
                totalEx += e?.totalExpenseCost || 0;
                elect += e?.electricityBill || 0;
                water += e?.waterBill || 0;
                gas += e?.gasBill || 0;
            });

            console.log('branchRegion', branchRegion)
        }
    }

    console.log('전체', totalEx)
    console.log('전기', elect / totalEx)
    console.log('water', water)
    console.log('gas', gas)

    let series;
    if (com === 'Total') {
        series = [elect, water, gas];
    } else {
        const branchData = expense.find(e => e.branch.branchCode === com);
        series = [
            branchData?.electricityBill || 0,
            branchData?.waterBill || 0,
            branchData?.gasBill || 0
        ];
    }

    const options = {
        chart: {
            type: 'polarArea'
        },
        labels: ['전기세', '수도세', '가스비'],
        colors: ['rgb(255, 149, 8)', 'rgb(8, 85, 255)', 'rgb(255, 8, 8)'],
        stroke: {
            colors: ['#fff']
        },
        fill: {
            opacity: 0.8
        },
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'right'
                    }
                }
            }
        ]
    }

    return (
        <div className="pieGraphContainer">
            <div className='pieGraphTitle' style={{ fontWeight: 'bold' }}>수도광열비</div>
            <div className='pieGraphContent'>
                <Chart
                    series={series}
                    options={options}
                    height='100%'
                    type='polarArea'
                />
            </div>
        </div>
    )
}
