const API_URL = "https://localhost:8080/api";

async function Register(event, form) {
  event.preventDefault();
  let formData = await new FormData(form);
  let data = {
    Username: formData.get("Username"),
    FirstName: formData.get("FirstName"),
    LastName: formData.get("LastName"),
    Email: formData.get("Email"),
    Password: formData.get("Password"),
  };
  try {
    const response = await fetch(`${API_URL}/Register`, {
      method: "POST",
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json;",
      },
      body: JSON.stringify(data),
    });

    if (await response.text() === "registration successful") {
      showPage("successfulRegistrationCard");
    }
    else {
      document.getElementById("registration-response-message").innerText = "Username unavailable";
    }

  } catch (err) {
    console.log(err);
  }
}



async function Login(event, form) {
  event.preventDefault();
  let formData = new FormData(form);

  let data = {
    username: formData.get("LoginUsername"),
    password: formData.get("LoginPassword"),
  };
  let token = createAuthToken(data.username, data.password);
  try {
    const response = await fetch(`${API_URL}/Login`, {
      mode: "cors",
      method: "GET",
      headers: {
        "Authorization": token,
        "accept": "text/plain",

      },
    });
    if (response.ok) {
      user = { token: token, username: data.username };
      store.setUser(user);
      onLogin();
    } else {
      document.getElementById("auth-response-message").innerText = "No user matching details provided";
    }
  } catch (err) {
    console.error(err);
  }
}

function createAuthToken(username, password) {
  return "Basic " + btoa(username + ":" + password);
}

// Asynchronous function to fetch data from a given URL with authentication
async function fetchWithAuth(url, options = {}) {
  // Retrieve token from store
  const token = store.user.token;
  if (!token) {
    throw new Error("Not logged in");
  }
  // Set authorization header
  const headers = {
    Authorization: token,
    ...options.headers || null
  };
  if(options.headers){
    delete options.headers
  }
  options.mode = 'cors'
  // Fetch data from API_URL + url
  const response = await fetch(`${API_URL}/${url}`, {
    ...options,
    headers: headers,
  });
  // Return response
  return response;

}


