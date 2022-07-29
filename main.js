
const heightArr = [];
const chartItems = document.querySelectorAll('.chart');
const tooltipValue = document.querySelectorAll('.chart-tooltip span');
const tooltips = document.querySelectorAll('.chart-tooltip');
const charts = document.querySelectorAll('.chart');

const chartsonly = document.querySelectorAll('.chart > :not(.chart-tooltip)');

 

fetch('./data.json')
    .then(function(resp) {
        return resp.json();
    })
    .then(function(data) {
        data.forEach(item => {
            heightArr.push(item.amount);
        });
        updateCharts(heightArr);
        revealValues(heightArr);
    })


function updateCharts(heightArr) {
    const doubledValues = heightArr.slice();

    //loops through all items and updates their height by amount * 2.6
    for (let i=0; i<charts.length; i++) {
        doubledValues[i] = doubledValues[i] * 2.6;
        charts[i].style.height = `${doubledValues[i]}px`;
    }
    //set the biggest value graph color to cyan
    var maxValue = Math.max(...heightArr);
    charts[heightArr.indexOf(maxValue)].style.background = 'var(--cyan)';
}

for (let i=0; i<charts.length; i++) {
    chartItems[i].addEventListener('mouseover', e => {
        chartItems[i].style.cursor = 'pointer';
        tooltips[i].classList.add('reveal');
        e.target.style.opacity = '60%';
    })  

    chartItems[i].addEventListener('mouseout', function() {
        chartItems[i].style.opacity = '100%';
        tooltips[i].classList.remove('reveal');
    })
}

function revealValues(height) {
    for (let i=0; i<tooltipValue.length; i++) {
        tooltipValue[i].innerHTML = '$' + height[i];
    }
}

