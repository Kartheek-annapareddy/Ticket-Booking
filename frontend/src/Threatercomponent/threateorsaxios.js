import axios from "axios";
function threatercall(location){
    if(location==='Vijayawada'){
        return axios.get('https://mocki.io/v1/35655b55-477f-49fd-88ee-6b67cae1821b')    
    }
    else if (location==='hyderabadh'){
        return axios.get('https://mocki.io/v1/51b88977-65bf-4256-b552-670e111e7d3c')
    }
    else if(location==='Delhi'){
        return axios.get('https://mocki.io/v1/94c576c4-15ff-4206-8fbe-da3c5d970449')
    }
    else if(location==='Kochi'){
        return axios.get('https://mocki.io/v1/26ad120d-975e-480a-9998-f0416a4cb9fe')
    }
    else if(location==='Kolkata'){
        return axios.get('https://mocki.io/v1/38da9164-0bd5-46e5-ad6b-bf1ed998ca84')
    }
    else if(location==='Benguluru'){
        return axios.get('https://mocki.io/v1/26ad120d-975e-480a-9998-f0416a4cb9fe')
    }
}
export default threatercall;