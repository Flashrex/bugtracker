<script setup lang="ts">
import type { IssueData } from '@/types';
import { Chart, DoughnutController, BarController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const doughnutChart = ref(null as HTMLCanvasElement | null);
const rankingChart = ref(null as HTMLCanvasElement | null);

const issueData = ref(null as IssueData | null);

onMounted(async () => {
    await fetchIssueData();

    Chart.register(DoughnutController, BarController, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend);

    addDoughnutChart();
    addHorizontalBarChart();
})

async function fetchIssueData() {
    try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_ENDPOINT}/issues/data`);
        issueData.value = response.data;
    } catch (error) {
        console.error(error);
    }
}

function calcIssuesInProgress() {
    return (issueData.value?.total ?? 0) - (issueData.value?.open ?? 0);
}

function calcDifferenceLastMonthToThisMonthInPercent() {
    const issuesThisMonth = issueData.value?.issues_this_month ?? 0;
    const issuesLastMonth = issueData.value?.issues_last_month ?? 1;

    if (issuesLastMonth === 0) return issuesThisMonth === 0 ? 0 : 100;
    else return ((issuesThisMonth - issuesLastMonth) / issuesLastMonth) * 100;
}

function addDoughnutChart() {
    new Chart(doughnutChart.value!, {
        type: 'doughnut',
        data: {
            labels: ['Open', 'In Progress', 'Resolved'],
            datasets: [
                {
                    label: 'Issues',
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    data: [issueData.value?.open, calcIssuesInProgress(), issueData.value?.closed]
                }
            ]
        },
        options: {
            responsive: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    });
}

function addHorizontalBarChart() {

    new Chart(rankingChart.value!, {
        type: 'bar',
        data: {
            labels: issueData.value?.top_authors?.map((author) => author.username) ?? [],
            datasets: [{
                label: 'Number of Tickets',
                data: issueData.value?.top_authors?.map((author) => author.count) ?? [],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: false,
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

</script>

<template>
    <div class="home">
        <h1>Welcome to BugTracker</h1>
        <div class="content">
            <div class="gridCards">
                <div class="ticketContainer">
                    <img alt="ticket" src="../../assets/ticket.svg">
                    <p class="ticketText">Total Tickets</p>
                    <p>{{ issueData?.total }}</p>
                </div>

                <div class="ticketContainer">
                    <img alt="warning" src="../../assets/warning.svg">
                    <p class="ticketText">Open Tickets</p>
                    <p>{{ issueData?.open }}</p>
                </div>

                <div class="ticketContainer">
                    <img alt="finished" src="../../assets/finished.svg">
                    <p class="ticketText">Closed Tickets</p>
                    <p>{{ issueData?.closed }}</p>
                </div>
            </div>


            <div class="chartContainer zero-to-one">
                <p class="gridHeadline">Issues by Status</p>
                <canvas ref="doughnutChart" width="250px" height="250px"></canvas>
            </div>

            <div class="card one-to-two">
                <div class="cardTopContainer">
                    <p class="cardSymbol positive">▲</p>
                    <p class="cardTopText positive">{{ calcDifferenceLastMonthToThisMonthInPercent() }} %</p>
                </div>
                <p class="cardMidText">Issues Created</p>
                <div class="cardBottomContainer">
                    <div>
                        <p class="cardBottomText cardBoldText align-right">{{ issueData?.issues_this_month }}</p>
                        <p class="cardBottomText align-right">Current month</p>
                    </div>
                    <span class="vertical-divider"></span>
                    <div>
                        <p class="cardBottomText cardBoldText align-left">{{ issueData?.issues_last_month }}</p>
                        <p class="cardBottomText align-left">Previous month</p>
                    </div>
                </div>
            </div>

            <div class="rankingContainer">
                <p class="gridHeadline">Tickets by Owner</p>
                <canvas ref="rankingChart" width="500px" height="500px"></canvas>
            </div>
        </div>
    </div>
</template>

<style scoped>
.home {
    width: 80vw;
    padding: 1rem 2rem;
}

h1 {
    margin-bottom: 1rem;
}

.content {
    background-color: rgba(240, 248, 255, 0.037);
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    padding: 1rem;
}

.ticketContainer {
    position: relative;
    background-color: rgba(255, 255, 255, 0.049);
    border-radius: 5px;
    padding: 0.2rem;
    width: calc(100% / 3 - 1rem);
    height: 12vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.gridCards {
    grid-column: 1 / 3;
    grid-row: 1 / 2;

    display: flex;
    justify-content: space-between;
}

img {
    width: 5vw;
    height: 5vw;
    margin-bottom: 0.5rem;
    filter: invert(40%);
}

.ticketText {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.chartContainer {
    position: relative;
    background-color: rgba(255, 255, 255, 0.049);
    border-radius: 5px;
    padding: 0.2rem;
    padding-top: 2rem;

    display: flex;
    justify-content: center;
    align-items: center;
}

.card {
    background-color: rgba(255, 255, 255, 0.049);
    border-radius: 5px;
    padding: 0.2rem;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.cardTopContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: -2rem;
    margin-bottom: 1rem;
}

.cardTopText {
    font-weight: bold;
    font-size: 1.2rem;
}

.cardSymbol {
    font-size: 1.8rem;
    margin-right: 0.5rem;
}

.cardMidText {
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.cardBottomContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

.cardBottomText {
    font-size: 1rem;
}

.cardBoldText {
    font-weight: bold;
}

.align-right {
    text-align: right;
    margin-right: 1rem;
}

.align-left {
    text-align: left;
    margin-left: 1rem;
}

.positive {
    color: #149e52;
}

.vertical-divider {
    margin: 0;
    font-size: 2.5rem;
    width: 2px;
    height: 3rem;
    background-color: rgba(255, 255, 255, 0.281);
}

.zero-to-one {
    grid-column: 1 / 2;
    grid-row: 2 / 3;
}

.one-to-two {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
}

.rankingContainer {
    position: relative;
    background-color: rgba(255, 255, 255, 0.049);
    border-radius: 5px;
    padding: 0.2rem;
    padding-top: 2rem;

    grid-column: 3 / 5;
    grid-row: 1 / 3;
}

.gridHeadline {
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
    margin-bottom: 1rem;
    line-height: 1.6rem;
    font-weight: bold;
}

canvas {
    margin: 1rem;
}
</style>