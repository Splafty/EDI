// <------------------------------------------------ (START) ScrollReveal ------------------------------------------------> //
// ScrollReveal - cool reveal
const sr = ScrollReveal ({
    distance: "60px",
    duration: 3000,
    delay: 450,
    reset: true
})

sr.reveal(".home-text", {delay: 100, duration: 2500, reset: false, origin: "top"});
sr.reveal("#ranking-grid-row-1", {delay: 0, duration: 2500, origin: "left"});
sr.reveal("#ranking-grid-row-2", {delay: 0, duration: 2500, origin: "right"});
sr.reveal(".smallTable", {delay: 0, duration: 2000, origin: "bottom"});
sr.reveal("#buttonSection", {delay: 0, duration: 2000, origin: "bottom"});
sr.reveal("#charts", {delay: 0, duration: 2000, origin: "bottom"});
sr.reveal("#chart1", {delay: 0, duration: 2000, origin: "left"});
sr.reveal("#chart2", {delay: 0, duration: 2000, origin: "right"});
sr.reveal("#about", {delay: 0, duration: 2000, origin: "bottom"});
// <------------------------------------------------ (FINISH) ScrollReveal ------------------------------------------------> //


// <------------------------------------------------- (START) FetchJSON --------------------------------------------------> //
// Function to fetch JSON data
function fetchJSON()
{
    //!!! LINK DO ZMIANY
    fetch("https://api.npoint.io/09200a2ccc1c2c79fa16") // Fetch JSON data from the API 
        .then(response => response.json()) // Convert the response into JSON format
        .then(data => {
            // Sort items by most 5_star_reviews
            data.sort((a, b) => b["num_5_star_reviews"] - a["num_5_star_reviews"]);

            const items = data.slice(0, 10); // Take only the first 10 items for demonstration

            // Function to calculate the numbers of developers from each country
            var developer_countries = calculateDevelopersByCountry(data)
            
            loadCharts(items, developer_countries) // Making Charts

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

            const items2 = data;

            // Iterate over items
            items2.forEach(item => {
                
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
                
                // Add a class to rows after the first 10 to hide them
                if (position > 10)
                {
                    tr.classList.add("hidden-row");
                }
                
                position++; // Position variable increment

                tableBody.appendChild(tr); // Add the created row to the table body
            });
        })
        .catch(error => console.error("Error fetching JSON data:", error)); // Log an error if fetching fails
}

fetchJSON()
// <------------------------------------------------- (FINISH) FetchJSON -------------------------------------------------> //


// <------------------------------------------------- (START) Functions --------------------------------------------------> //
// Function to calculate the numbers of developers from each country
function calculateDevelopersByCountry(data)
{
    const developersByCountry = {};

    data.forEach((developer) => {
        const country = developer.country;
        developersByCountry[country] = (developersByCountry[country] || 0) + 1;
    });

    const sortedDevelopersByCountry = Object.entries(developersByCountry)
    .sort((a, b) => b[1] - a[1])
    .reduce((acc, [country, count]) => {
        acc[country] = count;
        return acc;
    }, {});

    return sortedDevelopersByCountry;
}

// Function to show hide displayed rows
function hideRows()
{
    const displayedRows = document.querySelectorAll(".displayed-row");
    displayedRows.forEach(row => {
        row.classList.remove("displayed-row");
        row.classList.add("hidden-row");
    });

    const table = document.getElementById("dataTable")
    table.classList.remove("bigTable");
    table.classList.add("smallTable");

    sr.reveal(".smallTable", {delay: 0, duration: 1000, origin: "bottom"});
}

// Function to show hidden rows
function showHiddenRows()
{
    const hiddenRows = document.querySelectorAll(".hidden-row");
    hiddenRows.forEach(row => {
        row.classList.remove("hidden-row");
        row.classList.add("displayed-row");
    });

    const table = document.getElementById("dataTable")
    table.classList.remove("smallTable");
    table.classList.add("bigTable");

    sr.reveal(".bigTable", {delay: 0, duration: 1000, origin: "bottom"});
}

// Function to show table
function expandAndContract() 
{
    var button = document.getElementById("showRanking");

      if (button.innerHTML === "Show Ranking")
      {
        button.innerHTML = "Hide Ranking";
        showHiddenRows()
      } 
      else 
      {
        button.innerHTML = "Show Ranking";
        hideRows();
      }
}
// <------------------------------------------------- (FINISH) Functions -------------------------------------------------> //


// <--------------------------------------------------- (START) Charts ---------------------------------------------------> //
// Charts
function loadCharts(loadedData, developer_countries)
{
    let creators = []
    let values = []

    for(k in loadedData)
    {
        creators.push(loadedData[k].first_name+' '+loadedData[k].last_name)
        values.push(loadedData[k].num_5_star_reviews)
    }

    
    //Bar Chart
    const chart1 = document.getElementById('myChart1');
    new Chart(chart1, {
    type: 'bar',
        data: {
            labels: creators,
            datasets: [{
                label: 'Number of 5-star reviews',
                data: values,
                backgroundColor: ['rgba(171, 31, 28, 0.3)', 'rgba(42, 189, 221, 0.3)', 'rgba(255, 123, 98, 0.3)', 'rgba(180, 55, 210, 0.3)', 'rgba(89, 176, 167, 0.3)', 'rgba(201, 34, 145, 0.3)', 'rgba(112, 223, 76, 0.3)', 'rgba(15, 92, 188, 0.3)', 'rgba(255, 186, 52, 0.3)', 'rgba(110, 64, 48, 0.3)'],
                borderColor: ["rgb(171, 31, 28)", "rgb(42, 189, 221)", "rgb(255, 123, 98)", "rgb(180, 55, 210)", "rgb(89, 176, 167)", "rgb(201, 34, 145)", "rgb(112, 223, 76)", "rgb(15, 92, 188)", "rgb(255, 186, 52)", "rgb(110, 64, 48)"],
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


    // Doughnut Chart
    const chart2 = document.getElementById('myChart2');
    new Chart(chart2, {
        type: 'doughnut',
        data: {
            labels: Object.keys(developer_countries),
            datasets: [{
                label: 'Number of Developers',
                data: Object.values(developer_countries),
                backgroundColor: ['rgba(171, 31, 28, 0.3)', 'rgba(42, 189, 221, 0.3)', 'rgba(255, 123, 98, 0.3)', 'rgba(180, 55, 210, 0.3)', 'rgba(89, 176, 167, 0.3)', 'rgba(201, 34, 145, 0.3)', 'rgba(112, 223, 76, 0.3)', 'rgba(15, 92, 188, 0.3)', 'rgba(255, 186, 52, 0.3)', 'rgba(110, 64, 48, 0.3)'],
                borderColor: ["rgb(171, 31, 28)", "rgb(42, 189, 221)", "rgb(255, 123, 98)", "rgb(180, 55, 210)", "rgb(89, 176, 167)", "rgb(201, 34, 145)", "rgb(112, 223, 76)", "rgb(15, 92, 188)", "rgb(255, 186, 52)", "rgb(110, 64, 48)"],
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
// <--------------------------------------------------- (FINISH) Charts --------------------------------------------------> //


// <--------------------------------------------------- (START) About ----------------------------------------------------> //
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
            e.target.style.width = '60%'
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
// <--------------------------------------------------- (FINISH) About ---------------------------------------------------> //






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