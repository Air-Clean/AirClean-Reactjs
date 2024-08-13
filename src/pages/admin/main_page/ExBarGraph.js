import ProgressBar from "@ramonak/react-progress-bar";
import './ExBarGraphCss.css'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


export default function ExBarGraph({expense, com='Total'}) {

    let totalEx = 0;
    let elect = 0;
    let water = 0 ; 
    let gas = 0;

    console.log('com',com)

    if(com==='Total' ){
        expense?.forEach(e=>{
            totalEx += e?.totalExpenseCost
            elect += e?.electricityBill
            water += e?.waterBill
            gas += e?.gasBill
        })
    }else{
        const branchRegion = expense?.filter(e=>e.branch.branchCode === com)[0]?.branch?.branchRegion

        const regionExpense = expense?.filter(e=>e.branch.branchRegion===branchRegion);

        regionExpense.forEach(e=>{
            totalEx += e?.totalExpenseCost
            elect += e?.electricityBill
            water += e?.waterBill
            gas += e?.gasBill
        })

        console.log('branchRegion',branchRegion)
    }
    

    console.log('전체',totalEx)
    console.log('전기',elect/totalEx)
    console.log('water',water)
    console.log('gas',gas)

    // const formattedAmount = new Intl.NumberFormat('ko-KR',{
    //     style : 'currency',
    //     currency : 'KRW'
    // }).format(amount)



    

    return (
        <div className="barContainer">
            {com==='Total'? (
                <>
                <div className='electirc'>
                <div className="costTitle">
                    <div style={{display : 'flex'}}><FlashOnIcon/>전기세</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(elect)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(elect/totalEx*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="waterCost">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><WaterDropIcon/>수도세</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(water)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(water/totalEx*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="gas">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><LocalGasStationIcon/>가스비</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(gas)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(gas/totalEx*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>

                </>
            ) : (
                <>
                <div className='electirc'>
                <div className="costTitle">
                    <div style={{display : 'flex'}}><FlashOnIcon/>전기세</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(expense.filter(e=>e.branch.branchCode===com)[0]?.electricityBill)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(expense.filter(e=>e.branch.branchCode===com)[0]?.electricityBill/elect*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="waterCost">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><WaterDropIcon/>수도세</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(expense.filter(e=>e.branch.branchCode===com)[0]?.waterBill)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(expense.filter(e=>e.branch.branchCode===com)[0]?.waterBill/water*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="gas">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><LocalGasStationIcon/>가스비</div>
                    <div>{
                        new Intl.NumberFormat('ko-KR',{
                            style : 'currency',
                            currency : 'KRW'
                        }).format(expense.filter(e=>e.branch.branchCode===com)[0]?.gasBill)
                        }</div>
                </div>
                <div>
                    <ProgressBar
                    completed={parseInt(expense.filter(e=>e.branch.branchCode===com)[0]?.gasBill/gas*100)}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>

                </>
            )}
        </div>
    )
}
