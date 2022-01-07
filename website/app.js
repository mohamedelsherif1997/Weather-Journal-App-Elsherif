
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (1 + d.getMonth())+'-'+ d.getDate()+'-'+ d.getFullYear();

// The API key 
const api = "f1ea40ec32a22469761a7d0a94a3ca9c";

// Function to generate the URL .
async function generateLink (){
    //reading the zip and feeling from user
    const zip = document.getElementById("zip");
    const zipValue = zip.value;
    const feeling = document.getElementById("feelings");
    const feelingValue = feeling.value;

    //try and catch to find errors
    try{
        if(zipValue){
            const link = `https://api.openweathermap.org/data/2.5/weather?zip=${zipValue}&appid=${api}&units=metric`;

            getData(link).then(function(data){
                postData('/addData',
                    {
                        date: newDate,
                        temp: data.main.temp,
                        country : data.sys.country,
                        city : data.name,
                        feelings: feelingValue
                    })
            
                 
             }) .then(() => requiredData());
        }
        else{
            console.log("Enter A ZIP code PLEASE !");
        }
    }
    catch{(error)
        console.log(`Error : ${error}`);
    }
}
// Select the button which generate the required data
const button = document.getElementById('generate');
//Adding an event listener to the buttom to perfrom the function on click
button.addEventListener('click',generateLink);

//asynchronous function to get data from api 
async function getData (link){
    try{
        const res = await fetch(link);
        const data = await res.json();
        return data ;
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
}

// asynchronous function to post data from api to server 

async function postData(link = '',data = {}){
    const res = await fetch(link, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify(data)
    });
    try{
        const result = await res.json();
        return result;
    }
    catch(error){
        console.log(`Error: ${error}`);
    }
}

// Asynchronus function to put new data into webpage
async function requiredData (){
    const req =  await fetch('/all');
    try{
        const projectData = await req.json();

        const date = document.getElementById('date');
        const temprature = document.getElementById('temp');
        const content = document.getElementById('content');
        const country = document.getElementById('country');
        const city = document.getElementById('city');

        date.innerHTML = `Date : ${projectData.date}`;
        temprature.innerHTML = `The temprature : "${projectData.temp}" Celcius degree`;
        content.innerHTML = `Your felling : ${projectData.feelings}`;
        country.innerHTML = `The country : ${projectData.country}`;
        city.innerHTML = `The city : ${projectData.city}`;
        }
    catch(error){
        console.log(`Error: ${error}`);
    }
}
