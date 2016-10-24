
const apiURL = 'http://flexteam-dev.herokuapp.com/api';
const authURL = '/auth';
const loginURL = '/login'

/*
export function login(username, password) {
  return fetch(apiURL + authURL + loginURL, {
  	method: 'POST',
		headers: {
  		'Accept': 'application/json',
  		'Content-Type': 'application/json',
		},
		body: JSON.stringify({
  		"username": username,
  		"password": password,
  	})
    
    .then((response) => response.json())
    .then((responseJson) => {
      return responseJson.accessToken;
    })
    .catch((error) => {
      console.error(error);
    })
    
	});
}
*/

export async function login(username, password){
	console.log("login function");	
	console.log(JSON.stringify({
	  		username: username,
	  		password: password,
	  	}));
	try{
		let response = await fetch("http://flexteam-dev.herokuapp.com/api/auth/login", {
	  	method: 'POST',	
			headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json',
			},
			
			body: JSON.stringify({
	  		username: username,
	  		password: password,
	  	})
	  });
  	let responseJson = await response.json();
  	//console.log("response");
  	//console.log(responseJson);
    return responseJson;
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}