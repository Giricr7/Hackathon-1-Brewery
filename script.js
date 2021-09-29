//create a div to contain your elements

outerdiv = document.createElement('div');
document.body.appendChild(outerdiv);

data_count=1

    
    //fetching the api data
var url='https://api.openbrewerydb.org/breweries'
fetchData = async () => {
    
    jsdata = await fetch(url);
    convertedData = await jsdata.json();
   
    
    return convertedData
}

// removing the empty values from the data
Validate = (table) => {
    
    cells=table.querySelectorAll('td')

    for (let i = 0; i < cells.length;i++){
        
        if (cells[i].innerHTML === '' || cells[i].innerHTML === 'null')

            cells[i].innerHTML = 'No Data';
            

    }

   
}


//creating and inserting tables and data
setData = (brewdata) => {
   
    //creating header for the page
    h1 = document.createElement('h1');
    h1.innerHTML = 'Breweries List'
    outerdiv.appendChild(h1)

    brewdata.map((breweries) => {
        
     //creating a table element   
        table = document.createElement('table');
        
    //inserting name from the data
        name_row = table.insertRow();
        cell_1 = name_row.insertCell();
        cell_1.innerHTML = 'Name';
        cell_1.setAttribute('class','lables')
        cell_2 = name_row.insertCell();
        cell_2.innerHTML = breweries.name;

    //inserting type from the data
        type_row = table.insertRow();
        cell_1 = type_row.insertCell();
        cell_1.innerHTML = 'Type';
        cell_1.setAttribute('class','lables')
        cell_2 = type_row.insertCell();
        cell_2.innerHTML = breweries.brewery_type;

    //inserting address from the data
        address_row = table.insertRow();
        cell_1 = address_row.insertCell();
        cell_1.innerHTML = 'Address';
        cell_1.setAttribute('class','lables')
        cell_2 = address_row.insertCell();
        if (breweries.street===null) {
            cell_2.innerHTML = `${breweries.city},${breweries.state}-(${breweries.postal_code})`;
        } else {
            cell_2.innerHTML = `${breweries.street},${breweries.city},${breweries.state}-${breweries.postal_code}`;
        }
        
    //inserting website url from the data
        website_row = table.insertRow();
        cell_1 = website_row.insertCell();
        cell_1.innerHTML = 'Website';
        cell_1.setAttribute('class','lables')
        cell_2 = website_row.insertCell();
        if (breweries.website_url===null) {
            cell_2.innerHTML = `No Data`;
        } else {
            cell_2.innerHTML = `<a href='${breweries.website_url}' target="_blank">${breweries.website_url}</a>`;
        }
        
    //inserting phone number from the data
        phone_row = table.insertRow();
        cell_1 = phone_row.insertCell();
        cell_1.innerHTML = 'Phone Number';
        cell_1.setAttribute('class','lables')
        cell_2 = phone_row.insertCell();
        cell_2.innerHTML = breweries.phone;

    //creating the sub-header for each table
        heading = document.createElement('h3');
        heading.innerHTML = `Data-${data_count}`
        
    //calling the validating function
        Validate(table);

    //inserting the sub-header and table into HTML page
        outerdiv.appendChild(heading);
        outerdiv.appendChild(table);
        data_count++

    //creating spacing between each table
        br = document.createElement('br')
        outerdiv.appendChild(br)
        outerdiv.appendChild(br)
     })   
    


}

    // main function
    async function start () {
        let brewdata = await fetchData();
        setData(brewdata);
    
    }

    //program execution starts here
start();

