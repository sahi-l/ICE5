document.getElementById("btnXhr").addEventListener('click', e => {
    
    getXhr();
});

function getXhr(resource_url) {
    let request = new XMLHttpRequest();
    request.onreadystatechange= function(event) {
        console.log(this);
    }

    // open a connection to the resource
    request.open('GET', resource_url)
    // send any headers required for this request
    request.setRequestHeader('Content-type', 'application/json');
    // send the request
    request.send();

    // Assuming the data is stored in a variable named `jsonData`
    const jsonData = [
        { "name": "Avenger", "price": "$29.99" },
        { "name": "Mission Impossible", "price": "$19.99" },
        { "name": "Friends", "price": "$7.99" }
    ];

    
    // Directly calling handleSuccess with simulated response
    handleSuccess({ response: JSON.stringify(jsonData) });
}
async function getFetch(resource_url){
    try{
        const headers=new Headers({
            "Content-Type":"application/json"
        });
        const request = new Request(resource_url,{
            method: "GET",
            headers:headers
        });
        const result=await fetch(request);
        console.log(result);
        if(result.ok){
            handleSuccess(await result.json());
        }
        else{
            handleError(await result.json());
        }
    }
    catch(ex){
        console.log(ex);
    }
}



function getAjax(resource_url)
{
    const settings = {
        url: resource_url,
        headers: {
            "Content-type": "application/json"
        }
    }
    $.ajax(settings)
      .done(handleSuccess)
      .fail(handleError)
}

function getFetch(resource_url)
{
    fetch(resource_url)
        .then(handleSuccess)
        .catch(handleError)

}



function handleSuccess(res) {
    console.log(res);
    const data = JSON.parse(res.response);
    console.log(data);
    const container = document.getElementById('xhr-table');
    container.innerHTML = ''; 

    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headerName = document.createElement('th');
    headerName.textContent = 'Name';
    const headerPrice = document.createElement('th');
    headerPrice.textContent = 'Price';
    headerRow.appendChild(headerName);
    headerRow.appendChild(headerPrice);
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    data.forEach(item => {
        const row = tbody.insertRow();
        const nameCell = row.insertCell();
        nameCell.textContent = item.name;
        const priceCell = row.insertCell();
        priceCell.textContent = item.price;
    });
    table.appendChild(tbody);

    container.appendChild(table);
}

function handleError(response) {
    console.log(response)
    console.log('Something horrible went wrong!!!');

    const container = document.getElementById('xhr-table');
     // Clear the container before appending new content
    container.innerHTML = ''; 
    const message = document.createElement('p');
    message.classList.add('text-danger');
    message.textContent = "Something horrible went wrong!!! Status: " + response.status;
    container.appendChild(message);
}
