
const apiURL = 'http://flexteam-dev.herokuapp.com/api';
const loginURL = '/auth/login'
const listURL = '/list/MyList'


export async function login(username, password){
	console.log(username);
	console.log(password);
	try{
		let response = await fetch(apiURL+loginURL, {
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
    return responseJson;
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}

export async function createUser(username, password){
	try{
		let response = await fetch(apiURL+loginURL, {
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

export async function getList(authToken){
	try{
		let response = await fetch(apiURL+listURL, {
	  	method: 'GET',	
			headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json',
	  		'Authorization': authToken
			},
	  });
	  let responseJson = response.json();
	  console.log(responseJson);
    return responseJson;
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}

