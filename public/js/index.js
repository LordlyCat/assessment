var headTop = document.querySelector('.headTop'),
    seven = document.querySelector('.seven'),
    temperature = document.querySelector('.temperature'),
    weatherIcon = document.querySelector('.weatherIcon'),
    description = document.querySelector('.description'),
    small = document.querySelectorAll('.small'),
    twentyHours = document.querySelector('.twentyHours'),
    sevenDays = document.querySelector('.sevenDays'),
    hours = document.querySelector('.hours'),
    today = document.querySelector('.today'),
    todayAir = today.querySelector('.airQuality'),
    todayMinAndMax = today.querySelector('.minAndMax'),
    todayHow = today.querySelector('.how'),
    todayIcon = today.querySelector('.howIcon'),
    tomorrow = document.querySelector('.tomorrow'),
    tomorrowAir = tomorrow.querySelector('.airQuality'),
    tomorrowMinAndMax = tomorrow.querySelector('.minAndMax'),
    tomorrowHow = tomorrow.querySelector('.how'),
    tomorrowIcon = tomorrow.querySelector('.howIcon');


// w = document.body.clientWidth,
// h = window.innerHeight;


var dataObj;
//获取数据
function getData() {
    ajax({
        method: 'GET',
        url: '/app.js',
        success: function(data) {
            //转换成josn对象
            dataObj = JSON.parse(data);
            renderingData(dataObj);
            drawChart();
            setDaysData();
        },
        error: function(res) {
            console.log(res);
        }
    });
}

getData();

function renderingData(dataObj) {

    temperature.innerHTML = parseInt(dataObj[1].max_temp) + '°';
    description.innerHTML = dataObj[1].weather;
    small[0].innerHTML = dataObj[1].wind;
    small[1].innerHTML = dataObj[1].humidity;
    small[2].innerHTML = dataObj[1].pressure;
    small[3].innerHTML = dataObj[1].air;

    todayAir.innerHTML = dataObj[1].air;
    todayMinAndMax.innerHTML = dataObj[1].min_temp + '°/' + dataObj[1].max_temp + '°';
    todayHow.innerHTML = dataObj[1].weather;

    tomorrowAir.innerHTML = dataObj[2].air;
    tomorrowMinAndMax.innerHTML = dataObj[2].min_temp + '°/' + dataObj[2].max_temp + '°';
    tomorrowHow.innerHTML = dataObj[2].weather;

}

//折线图数据
var days = document.querySelectorAll('.days'),
    maxTemp = [],
    minTemp = [],
    date = [],
    air = [],
    when = [],
    weather = [],
    myDate = new Date(),
    nowDate = myDate.getMonth() + 1 + '/' + myDate.getDate(),
    sunday = myDate.getDay();

function changeDays(days) {
    var day;
    switch (days) {
        case 0:
            day = '周日'
            break;
        case 1:
            day = '周一'
            break;
        case 2:
            day = '周二'
            break;
        case 3:
            day = '周三'
            break;
        case 4:
            day = '周四'
            break;
        case 5:
            day = '周五'
            break;
        case 6:
            day = '周六'
            break;

    }
    return day;
}

 var x = changeDays(sunday + 2);

for (var i = 0; i < days.length; i++) {
    maxTemp[i] = days[i].querySelector('.maxTemp');
    minTemp[i] = days[i].querySelector('.minTemp');
    air[i] = days[i].querySelector('.air');
    date[i] = days[i].querySelector('.date');
    weather[i] = days[i].querySelector('.weather');
    when[i] = days[i].querySelector('.when');
}

//设置七天预报数据
function setDaysData() {
    for (var i = 0; i < days.length; i++) {
        maxTemp[i].innerHTML = dataObj[i].max_temp + '°';
        minTemp[i].innerHTML = dataObj[i].min_temp + '°';
        weather[i].innerHTML = dataObj[i].weather;
        date[i].innerHTML = myDate.getMonth() + 1 + '/' + (myDate.getDate() - 1 + i);
        air[i].innerHTML = dataObj[i].air;
        if (dataObj[i].air === '良') {
            air[i].style.background = 'green';
        }else if (dataObj[i].air === '中') {
            air[i].style.background = 'yellow';
        }else if (dataObj[i].air === '差') {
            air[i].style.background = 'orange';
        }else if (dataObj[i].air === '特差') {
            air[i].style.background = 'red';
        }
    }

    for (var i = 3; i < when.length; i++) {
        when[i].innerHTML = changeDays(sunday + i -1);
    }
}


var canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d');

//画折线图
function drawChart(temperature) {

    var x = 25,
        y = 80 - dataObj[0].max_temp * 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (var i = 1; i < dataObj.length; i++) {
        x = 25 + 42 * (dataObj[i].id - 1);
        y = 80 - dataObj[i].max_temp * 1;
        ctx.lineTo(x, y);

    }
    ctx.strokeStyle = 'red';
    ctx.stroke();

    x = 25;
    y = 80 - dataObj[0].min_temp * 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    for (var i = 1; i < dataObj.length; i++) {
        x = 25 + 42 * (dataObj[i].id - 1);
        y = 80 - dataObj[i].min_temp * 1;
        ctx.lineTo(x, y);

    }
    ctx.strokeStyle = '#007cfd';
    ctx.stroke();

}


//The end