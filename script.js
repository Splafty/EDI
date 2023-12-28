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
    fetch("https://my.api.mockaroo.com/Web-Dev-Ranking.json?key=d08f0cf0") // Fetch JSON data from the API
        .then(response => response.json()) // Convert the response into JSON format
        .then(data => {
            const items = data.slice(0, 10); // Take only the first 10 items for demonstration

            // Sort items by most 5_star_reviews
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

fetchJSON();





// // tworzenie tabeli
// async function getJson() {
//     const response = await fetch("https://my.api.mockaroo.com/Web-Dev-Ranking.json?key=d08f0cf0");
//     const data = await response.json();
//     createTables(data)
// }

// let tables = ['first_name', 'last_name', 'num_5_star_reviews', 'total_websites_created', 'portfolio_link']
// // total websites spacja jest i sie pierdoli tabelka

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
