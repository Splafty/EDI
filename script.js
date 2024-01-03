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
    fetch("https://api.npoint.io/cb7ff4e4cb1e3bdeb7ea") // Fetch JSON data from the API !!! LINK DO ZMIANY
        .then(response => response.json()) // Convert the response into JSON format
        .then(data => {
            const items = data.slice(0, 10); // Take only the first 10 items for demonstration
            // Sort items by most 5_star_reviews

            loadCharts(items) // dane do wykresow

            items.sort((a, b) => b["num_5_star_reviews"] - a["num_5_star_reviews"]);

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

//fetchJSON() !!!

// wykresy

function loadCharts(loadedData){
    let labelWebsites = []
    let createdWebsites = []
    let votedWebistes = []
    console.log(loadedData) // puste array do danych importowanych ze strony

    for(k in loadedData){
        labelWebsites.push(loadedData[k].first_name+' '+loadedData[k].last_name)
        createdWebsites.push(loadedData[k]['total_websites_created ']) // do poprawy bo jest spacja !!!
        votedWebistes.push(loadedData[k].num_5_star_reviews)
    } // do kazdego array dodawane sa dane z poszegolnych "nagłowkow"

    const chart1 = document.getElementById('myChart1'); // wyszukiwanie wykresu w html

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

    const chart2 = document.getElementById('myChart2'); // wyszukiwanie wykresu w html

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
















// // tworzenie tabeli
// async function getJson() {
//     const response = await fetch("https://my.api.mockaroo.com/Web-Dev-Ranking.json?key=d08f0cf0");
//     const data = await response.json();
//     createTables(data)
// }

// let tables = ['first_name', 'last_name', 'num_5_star_reviews', 'total_websites_created', 'portfolio_link']
// 

// function createTables(dane){
//     var daneArray = dane
//     const table = document.querySelector('#table') // szukanie tabelki w html
    
//     let newTr = document.createElement('tr') 
//     table.append(newTr)
//     for(q in tables){
//         let newTh = document.createElement('th')
//         newTh.innerHTML = tables[q]
//         newTr.append(newTh)
//     } // tworzenie nagłówków tabeli i przypisanie danych z api

//     for(k in daneArray){
//         let newTd = document.createElement('tr')
//         table.append(newTd)
//         for(v in tables){
//             let wiersz = k
//             let td = document.createElement('td')
//             td.innerHTML = daneArray[wiersz][tables[v]]
//             newTd.append(td)
//         }
//     }
// } // tworzenie wierszy i kolumn tabeli i przypisanie danych z api

// getJson()






















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
