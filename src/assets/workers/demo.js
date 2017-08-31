var i = 0;

function timedCount() {
    i = i + 1;
    postMessage(i);
    setTimeout("timedCount()",500);
}

function getSleepList() {
	return fetch('/api/sleep')  
	  .then(  
	    function(response) {  
	      if (response.status !== 200) {  
	        console.log('Looks like there was a problem. Status Code: ' +  
	          response.status);  
	        return;  
	      }

	      // Examine the text in the response  
	      return response.json();/*.then(function(data) {  
	        console.log('fetch resopnse', data);  

	        return data;
	      });  */
	    }  
	  )  
	  .catch(function(err) {  
	    console.log('Fetch Error :-S', err);  
	  });
}

self.addEventListener('message', (data) => {
	console.log('Recived message', data.data.wData);
	getSleepList().then(result => console.log('parsed Result', result));
	//timedCount();
});