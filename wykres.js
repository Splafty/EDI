function loadCharts(){
    let labelWebsites = []
    let createdWebsites = []
    let votedWebistes = []
    let loadedData = {
        1: {
            firstname:'bbbbbbbb',
            total_webistes_created:1,
            num_5_star_reviews:44,
        },
        2: {

            firstname:'aaaaaaaa',
            total_webistes_created:2,
            num_5_star_reviews:11,
        },
        3: {

            firstname:'dsssssss',
            total_webistes_created:3,
            num_5_star_reviews:33,
        },
        4: {

            firstname:'xdddddd',
            total_webistes_created:4,
            num_5_star_reviews:22,
        },
    }

    for(k in loadedData){
        labelWebsites.push(loadedData[k].firstname)
        createdWebsites.push(loadedData[k].total_webistes_created)
        votedWebistes.push(loadedData[k].num_5_star_reviews)
    }
        const chart1 = document.getElementById('myChart1');

    new Chart(chart1, {
    type: 'bar',
    data: {
        labels: labelWebsites,
        datasets: [{
        label: '# of Votes',
        data: votedWebistes,
        borderWidth: 2
        }]
    },
    options: {
        scales: {
        y: {
            beginAtZero: true
        }
        }
    }
    });

    const chart2 = document.getElementById('myChart2');
    console.log(labelWebsites)
    new Chart(chart2, {
        type: 'doughnut',
        data: {
        labels: labelWebsites,
        datasets: [{
            label: '# created websites',
            data: createdWebsites,
            borderWidth: 2
        }]
        },
    });


}

loadCharts()