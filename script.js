// ScrollReveal - cool text reveal on entering the website
const sr = ScrollReveal ({
    distance: "60px",
    duration: 3000,
    delay: 450,
    reset: true
})

sr.reveal(".home-text", {delay: 100, reset: false, origin: "top"});
sr.reveal(".navigation-menu", {delay: 300, duration: 3000, reset: false, origin: "right"});


// Function to fetch JSON data
function fetchJSON() {
    fetch("https://api.npoint.io/3cdd557c2d567bf9ee65") // Fetch JSON data from the API !!! LINK DO ZMIANY na (https://my.api.mockaroo.com/Web-Dev-Ranking.json?key=d08f0cf0)
        .then(response => response.json()) // Convert the response into JSON format
        .then(data => {
            const items = data.slice(0, 10); // Take only the first 10 items for demonstration
            
            // Sort items by most 5_star_reviews
            items.sort((a, b) => b["num_5_star_reviews"] - a["num_5_star_reviews"]);
            
            loadCharts(items) // Making Charts

            // Iterate over items
            items.forEach((item, i) => {

                var name_element = document.getElementsByClassName("dev-name")[i]
                var fullName = item.first_name + ' ' + item.last_name
                name_element.textContent = fullName

                var protfolio_element = document.getElementsByClassName("dev-portfolio")[i]
                protfolio_element.textContent = item.portfolio_link

                var reviews_element = document.getElementsByClassName("dev-reviews")[i]
                reviews_element.textContent += item.num_5_star_reviews

                var websites_created_element = document.getElementsByClassName("dev-websites-created")[i]
                websites_created_element.textContent += item.total_websites_created

                var experience_element = document.getElementsByClassName("dev-years-of-experience")[i]
                experience_element.textContent += item.years_of_experience

                var country_element = document.getElementsByClassName("dev-country")[i]
                country_element.textContent += item.country

                var rating_element = document.getElementsByClassName("dev-rating")[i]
                rating_element.textContent += item.rating
            });

            // Get the table body element by ID
            const tableBody = document.getElementById("dataTable").getElementsByTagName("tbody")[0];

            // Position variable
            var position = 1
            // Iterate over items
            items.forEach(item => {
                
                const tr = document.createElement("tr"); // Create a table row element for each item in the JSON

                const rank = document.createElement("td");    // Create a table cell for position variable
                rank.textContent = position;                  // Add position variable as content
                tr.appendChild(rank);                         // Add the created cell to the current row

                // Iterate over properties in the current item
                for (const key in item) 
                {
                    if (item.hasOwnProperty(key)) 
                    {   
                        const td = document.createElement("td");    // Create a table cell for each property and import the data
                        td.textContent = item[key];                 // Add content
                        tr.appendChild(td);                         // Add the created cell to the current row
                    }
                }
                position++; // 
                tableBody.appendChild(tr); // Add the created row to the table body
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error)); // Log an error if fetching fails
}

fetchJSON()


// Function to show table
function showTable() 
{
    var table = document.getElementById("dataTable");
    if (table.style.display === "none") 
    {
    table.style.display = "table";
    } 
    else 
    {
    table.style.display = "none";
    }
}


// Charts
function loadCharts(loadedData)
{
    let labelWebsites = []
    let createdWebsites = []
    let votedWebistes = []

    for(k in loadedData)
    {
        labelWebsites.push(loadedData[k].first_name+' '+loadedData[k].last_name)
        createdWebsites.push(loadedData[k]['num_5_star_reviews'])
        votedWebistes.push(loadedData[k].num_5_star_reviews)
    }

    
    //Bar Chart
    const chart1 = document.getElementById('myChart1');
    new Chart(chart1, {
    type: 'bar',
        data: {
            labels: labelWebsites,
            datasets: [{
                label: 'Number of 5-star reviews',
                data: votedWebistes,
                backgroundColor: ['rgba(255, 99, 132, 0.3)', 'rgba(54, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)'],
                borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                x: {
                    ticks: {
                        color: 'gray'
                    }
                },
                y: {
                    ticks: {
                        color: 'gray',
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'API based bar chart',
                    font: {
                        size: 18
                    },
                    color: 'lightgray'
                },
                legend: {
                    labels: {
                        color: 'gray'
                    }
                },
            },
        }
    });


    //Doughnut Chart
    const chart2 = document.getElementById('myChart2');
    new Chart(chart2, {
        type: 'doughnut',
        data: {
            labels: labelWebsites,
            datasets: [{
                label: 'Number of 5-star reviews',
                data: votedWebistes,
                backgroundColor: ['rgba(255, 99, 132, 0.3)', 'rgba(54, 162, 235, 0.3)', 'rgba(255, 206, 86, 0.3)'],
                borderColor: ['rgba(255,99,132,1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1,
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'API based doughnut chart',
                    font: {
                        size: 18
                    },
                    color: 'lightgray'
                },
                legend: {
                    labels: {
                        color: 'gray'
                    }
                },
            },
        }
    });
}

// sekcja about

const osoby = document.querySelectorAll('.strefa') // elementy o klasie stefa

osoby.forEach(element => {      // dla kazdego elementu wykonuje
    element.addEventListener('click', function(e) {    // po kliknieciu na dany element wykonuje sie funkcja


        let allOsoby = document.querySelectorAll('.strefa')
        let isAlreadyOpened = e.target.classList.contains('opened')


        Array.prototype.forEach.call(allOsoby, function(container) {
            // strefa
            container.style.width = '23%'
            container.classList.remove('opened')
            // opis header
            var opis_header = container.querySelector(".opis_header")
            opis_header.classList.remove('otwarty')
            // opis
            var opis = container.querySelector(".opis")
            opis.classList.remove('otwarty')
        }) 
        // jesli ma klase opened to resetuje do podstawowego ustawienia


        if (!isAlreadyOpened) {
            // strefa
            e.target.style.width = '300%'
            e.target.classList.add('opened')
            // opis header
            var clickedOpis_header = e.target.querySelector(".opis_header")
            clickedOpis_header.classList.add('otwarty')
            // opis
            var clickedOpis = e.target.querySelector(".opis")
            clickedOpis.classList.add('otwarty')
        }       
        // jeśli nie ma klasy opened to rozszerza
    })
})






// // Recycle??
// var tablinks = document.getElementsByClassName("tab-links");
// var tabcontents = document.getElementsByClassName("tab-contents");

// function opentab(event, tabname)
// {
//     for(tablink of tablinks)
//     {
//         tablink.classList.remove("active-link");
//     }
    
//     for(tabcontent of tabcontents)
//     {
//         tabcontent.classList.remove("active-tab");
//     }
//     event.currentTarget.classList.add("active-link");
//     document.getElementById(tabname).classList.add("active-tab");
// }