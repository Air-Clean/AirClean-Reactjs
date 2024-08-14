import { useEffect, useRef } from "react";
import { Chart } from 'chart.js';
import { useSelector } from "react-redux";

export default function UtilityBar() {
    const result = useSelector(state => state.maintainReducer);
    const chartRef = useRef(null);  // Ref to store the chart instance

    let laundryFilter = 0, dryerFilter = 0, cleanerFilter = 0;
    let fuel = 0, mis = 0, regular = 0, repair = 0;

    let averageLaundry = 0, averageDryer = 0, averageCleaner = 0;
    let averageFuel = 0, averageMis = 0, averageRegular = 0, averageRepair = 0;

    const maintenance = result.result || [];
    const totalAverage = result.total || [];

    if (result.name === 'facility') {
        maintenance.forEach(e => {
            laundryFilter += e.laundryFilterExpense;
            dryerFilter += e.dryerFilterExpense;
            cleanerFilter += e.dryCleanerFilterExpense;
        });

        const monthlyExpenses = calculateMonthlyExpenses(totalAverage);
        const averages = calculateMonthlyAveragesFacility(monthlyExpenses);

        averageLaundry = averages?.laundryFilterExpenseAverage;
        averageDryer = averages?.dryerFilterExpenseAverage;
        averageCleaner = averages?.dryCleanerFilterExpenseAverage;
    } else {
        maintenance.forEach(m => {
            fuel += m.vehicleFuelCost;
            mis += m.vehicleMiscellaneous;
            regular += m.vehicleRegularInspection;
            repair += m.vehicleVehicleRepairCost;
        });

        const monthlyTotals = calculateMonthlyTotals(totalAverage);
        const averages = calculateMonthlyAveragesVehicle(monthlyTotals);

        averageFuel = averages?.fuelCostAverage;
        averageMis = averages?.miscellaneousAverage;
        averageRegular = averages?.regularInspectionAverage;
        averageRepair = averages?.repairCostAverage;
    }

    function calculateMonthlyTotals(data) {
        // Your monthly total calculation logic for vehicle-related expenses
        // (same as in your original code)
        // ...
    }

    function calculateMonthlyAveragesVehicle(monthlyTotals) {
        // Your monthly averages calculation logic for vehicle-related expenses
        // (same as in your original code)
        // ...
    }

    function calculateMonthlyExpenses(data) {
        // Your monthly expenses calculation logic for facility-related expenses
        // (same as in your original code)
        // ...
    }

    function calculateMonthlyAveragesFacility(monthlyExpenses) {
        // Your monthly averages calculation logic for facility-related expenses
        // (same as in your original code)
        // ...
    }

    useEffect(() => {
        const utilBar = document.getElementById('barbar');

        if (chartRef.current) {
            chartRef.current.destroy(); // Destroy the existing chart instance
        }

        const chartData = {
            type: 'bar',
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
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    yAxisID: 'y',
                },
                {
                    type: 'line',
                    label: 'Average',
                    data: result.name === 'facility' ? [
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
                    borderColor: 'rgb(54, 162, 235)',
                    yAxisID: 'y',
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        chartRef.current = new Chart(utilBar, chartData);

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy(); // Clean up the chart instance on unmount
            }
        };
    }, [result]);

    return (
        <canvas id='barbar'></canvas>
    );
}
