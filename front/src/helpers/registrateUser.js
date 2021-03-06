import axios from 'axios';

function registrateUser(body){
let apikey = {};

    let promise = new Promise((resolve)=>{
        resolve(Help(body));
    });


    promise.then(result=>{
        apikey = result;
    });
    
    return apikey;
}


function Help(body){
 axios({
        method: 'post',
        headers: {"Access-Control-Allow-Origin": "http://localhost:9000"},
        url: 'http://localhost:57785/Registration',
        data: body
    }).then(response=>{
        return response;
    });
}

export default registrateUser;