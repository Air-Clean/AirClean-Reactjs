import { useEffect, useRef } from "react";
import { Chart } from 'chart.js';
import { useSelector } from "react-redux";

export default function UtilityBar() {
    const result = useSelector(state => state.maintainReducer);
    const chartRef = useRef(null);  // Create a ref to store the chart instance

    console.log('바그래프', result);

    let laundryFilter = 0; 
    let dryerFilter =0;
    let cleanerFilter = 0;

    let fuel = 0;
    let mis = 0;
    let regular = 0;
    let repair = 0;
     

    let maintenance= result.result;
    if(result.name==='facility'){

        console.log('유지관리',result)
        maintenance.forEach(e => {
        laundryFilter += e.laundryFilterExpense;
        dryerFilter += e.dryerFilterExpense;
        cleanerFilter += e.dryCleanerFilterExpense;
        });

    }else{
        console.log('차량값',result)
        maintenance.forEach(m=>{
            fuel += m.vehicleFuelCost
            mis += m.vehicleMiscellaneous
            regular += m.vehicleRegularInspection
            repair +=m.vehicleVehicleRepairCost
        })
    }

    let averageLaundry = 0;
    let averageDryer = 0;
    let averageCleaner = 0;

    let averageFuel = 0;
    let averageMis = 0;
    let averageRegular = 0;
    let averageRepair =0;

    let totalAverage = result.total;

    if(result.name==='facility'){

        const monthlyExpenses = calculateMonthlyExpenses(totalAverage);
        const averages = calculateMonthlyAverages2(monthlyExpenses);

        averageLaundry = averages.laundryFilterExpenseAverage
        averageDryer = averages.dryerFilterExpenseAverage
        averageCleaner = averages.dryCleanerFilterExpenseAverage
    
    console.log('월별 드라이클리너 필터 비용 평균:', averages.dryCleanerFilterExpenseAverage);
    console.log('월별 드라이어 필터 비용 평균:', averages.dryerFilterExpenseAverage);
    console.log('월별 세탁기 필터 비용 평균:', averages.laundryFilterExpenseAverage);

    }else{
        const monthlyTotals = calculateMonthlyTotals(totalAverage);
        const averages = calculateMonthlyAverages(monthlyTotals);

        averageFuel = averages.fuelCostAverage;
        averageMis = averages.miscellaneousAverage
        averageRegular =averages.regularInspectionAverage
        averageRepair = averages.repairCostAverage
    
        console.log('주유비 월평균:', averages.fuelCostAverage);
        console.log('정기점검비 월평균:', averages.regularInspectionAverage);
        console.log('수리비 월평균:', averages.repairCostAverage);
        console.log('기타비용 월평균:', averages.miscellaneousAverage);
    }


    function calculateMonthlyTotals(data) {
        const currentDate = new Date(); // 오늘 날짜
        const currentYear = currentDate.getFullYear(); // 현재 연도
        const currentMonth = currentDate.getMonth() + 1; // 현재 월 (1월이 0이므로 +1)
    
        // 현재 연도에 해당하는 월만큼의 배열 생성
        const months = Array.from({ length: currentMonth }, () => ({
            fuelCost: 0,
            repairCost: 0,
            miscellaneous: 0,
            regularInspection: 0,
        }));
    
        data.forEach(item => {
            const date = new Date(item.vehicleSubmissionDate);
            const year = date.getFullYear();
            const monthIndex = date.getMonth(); // 0이 1월
    
            // 현재 연도의 데이터만 처리
            if (year === currentYear && monthIndex < currentMonth) {
                // 각 비용 유형별로 해당 월의 합산값을 계산
                months[monthIndex].fuelCost += item.vehicleFuelCost;
                months[monthIndex].repairCost += item.totalVehicleRepairCost;
                months[monthIndex].miscellaneous += item.vehicleMiscellaneous;
                months[monthIndex].regularInspection += item.vehicleRegularInspection;
            }
        });
    
        return months;
    }
    
    function calculateMonthlyAverages(monthlyTotals) {
        const numberOfMonths = monthlyTotals.length;
    
        return {
            fuelCostAverage: monthlyTotals.reduce((sum, month) => sum + month.fuelCost, 0) / numberOfMonths,
            repairCostAverage: monthlyTotals.reduce((sum, month) => sum + month.repairCost, 0) / numberOfMonths,
            miscellaneousAverage: monthlyTotals.reduce((sum, month) => sum + month.miscellaneous, 0) / numberOfMonths,
            regularInspectionAverage: monthlyTotals.reduce((sum, month) => sum + month.regularInspection, 0) / numberOfMonths
        };
    }


    
    function calculateMonthlyExpenses(data) {
        const monthlyExpenses = {};
    
        data.forEach(item => {
            const date = new Date(item.expenseDate);
            const yearMonth = `${date.getFullYear()}-${date.getMonth() + 1}`; // YYYY-MM 형식
    
            if (!monthlyExpenses[yearMonth]) {
                monthlyExpenses[yearMonth] = {
                    dryCleanerFilterExpense: 0,
                    dryerFilterExpense: 0,
                    laundryFilterExpense: 0
                };
            }
    
            monthlyExpenses[yearMonth].dryCleanerFilterExpense += item.dryCleanerFilterExpense;
            monthlyExpenses[yearMonth].dryerFilterExpense += item.dryerFilterExpense;
            monthlyExpenses[yearMonth].laundryFilterExpense += item.laundryFilterExpense;
        });
    
        return monthlyExpenses;
    }
    
    function calculateMonthlyAverages2(monthlyExpenses) {
        const months = Object.keys(monthlyExpenses);
        const numberOfMonths = months.length;
    
        const totalExpenses = {
            dryCleanerFilterExpense: 0,
            dryerFilterExpense: 0,
            laundryFilterExpense: 0
        };
    
        months.forEach(month => {
            totalExpenses.dryCleanerFilterExpense += monthlyExpenses[month].dryCleanerFilterExpense;
            totalExpenses.dryerFilterExpense += monthlyExpenses[month].dryerFilterExpense;
            totalExpenses.laundryFilterExpense += monthlyExpenses[month].laundryFilterExpense;
        });
    
        return {
            dryCleanerFilterExpenseAverage: totalExpenses.dryCleanerFilterExpense / numberOfMonths,
            dryerFilterExpenseAverage: totalExpenses.dryerFilterExpense / numberOfMonths,
            laundryFilterExpenseAverage: totalExpenses.laundryFilterExpense / numberOfMonths
        };
    }
    
    


    

    useEffect(() => {
        const utilBar = document.getElementById('barbar');

        // Destroy the existing chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const chartData = {
            type: 'scatter',
            data: {
                labels: result.name === "facility" ? 
                    ['세탁기 필터', '건조기 필터', '드라이클리너 필터'] :
                    ['주유비', '정기점검비', '수리비', '기타'],
                datasets: [{
                    type: 'bar',
                    label: 'Cost',
                    data: result.name === "facility" ? [
                        laundryFilter,
                        dryerFilter,
                        cleanerFilter,
                    ] : [
                        fuel,
                        regular,
                        repair,
                        mis
                    ],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)'
                },
                {
                    type: 'line',
                    label: 'Average',
                    data: result.name ==='facility' ?  [
                        averageLaundry,
                        averageDryer,
                        averageCleaner
                        
                    ] : [
                        averageFuel,
                        averageRegular,
                        averageRepair,
                        averageMis
                    ],
                    fill: false,
                    borderColor: 'rgb(54, 162, 235)'
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true
            }
        };

        // Create a new chart instance and store it in the ref
        chartRef.current = new Chart(utilBar, chartData);

        // Cleanup function to destroy the chart when the component unmounts
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [result]);

    return (
        <canvas id='barbar'></canvas>
    );
}
