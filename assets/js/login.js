
document.addEventListener("DOMContentLoaded", function () {
  // What kind of interface we want at the start 
  const APIKEY = "67a46b220b037f5952192cbb";
  getLogin();
  document.getElementById("update-login-container").style.display = "none";

  //[STEP 1]: Create our submit form listener
  document.getElementById("login-submit").addEventListener("click", function (e) {
    // Prevent default action of the button 
    e.preventDefault();

    //[STEP 2]: Let's retrieve form data
    // For now, we assume all information is valid
    // You are to do your own data validation
    let loginEmail = document.getElementById("login-id").value;
    let loginPassword = document.getElementById("login-password").value;

    //[STEP 3]: Get form values when the user clicks on send
    // Adapted from restdb API
    let jsondata = {
      "Email": loginEmail,
      "Password": loginPassword
    };
    //[STEP 4]: Create our AJAX settings. Take note of API key
    let settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
      body: JSON.stringify(jsondata),
      beforeSend: function () {
        //@TODO use loading bar instead
        // Disable our button or show loading bar
        document.getElementById("login-submit").disabled = true;
        // Clear our form using the form ID and triggering its reset feature
        document.getElementById("login").reset();
      }
    }
    //[STEP 5]: Send our AJAX request over to the DB and print response of the RESTDB storage to console.
    fetch("https://harmonix-e6ec.restdb.io/rest/login", settings)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.getElementById("login-submit").disabled = false;
      });
  });//end click 

//[STEP] 6
  // Let's create a function to allow you to retrieve all the information in your contacts
  // By default, we only retrieve 10 results
  function getLogin(limit = 10, all = true) {

    //[STEP 7]: Create our AJAX settings
    let settings = {
      method: "GET", //[cher] we will use GET to retrieve info
      headers: {
        "Content-Type": "application/json",
        "x-apikey": APIKEY,
        "Cache-Control": "no-cache"
      },
    }

    //[STEP 8]: Make our AJAX calls
    // Once we get the response, we modify our table content by creating the content internally. We run a loop to continuously add on data
    // RESTDb/NoSql always adds in a unique id for each data; we tap on it to have our data and place it into our links 
    fetch("https://harmonix-e6ec.restdb.io/rest/login", settings)
      .then(response => response.json())
      .then(response => {
        let content = "";

        for (var i = 0; i < response.length && i < limit; i++) {
          //console.log(response[i]);
          //[METHOD 2]
          // Using our template literal method using backticks
          // Take note that we can't use += for template literal strings
          // We use ${content} because -> content += content 
          // We want to add on previous content at the same time
          content = `${content}<tr id='${response[i]._id}'><td>${response[i].name}</td>
          <td>${response[i].email}</td>
          <td>${response[i].password}</td>
          `
        }
      });
  }})
