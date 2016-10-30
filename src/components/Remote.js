
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
	  //console.log(responseJson);
    return responseJson;
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}



export async function addListItem(authToken, listItem){
	//console.log("adding an item")
	//console.log(listItem);
	try{
		let response = await fetch(apiURL+listURL, {
	  	method: 'POST',	
			headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json',
	  		'Authorization': authToken
			},
			body: JSON.stringify({
				type: listItem.type,
				text: listItem.text
			})
	  });
	  let responseJson = response.json();
	  //console.log(responseJson);
    return responseJson._id;
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}

export async function editListItem(authToken, listItem){
	console.log("editing an item")
	console.log(listItem);
	try{
		let response = await fetch(apiURL+listURL, {
	  	method: 'PATCH',	
			headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json',
	  		'Authorization': authToken
			},
			body: JSON.stringify({
				_id: listItem._id,				
				type: listItem.type,
				text: listItem.text
			})
	  });
	  //let responseJson = response.json();
	  //console.log("edit list item response");
    console.log(response);
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}

export async function deleteListItem(authToken, listItem){
	try{
		let response = await fetch(apiURL+listURL, {
	  	method: 'DELETE',	
			headers: {
	  		'Accept': 'application/json',
	  		'Content-Type': 'application/json',
	  		'Authorization': authToken
			},
			body: JSON.stringify({
				listItemId: listItem._id,				
			})
	  });
    console.log(response);
	}catch (error){
		console.log("error: ");
		console.log(error);
	}
}

