let login = []

const setLogin = (data) => {
    login = data;
}

async function signin() {
    const userID =  document.getElementsByName('#username');
    const passwd = document.getElementsByName('#password');
    try {
        const response = await fetch("http://localhost:5000/signin/"+userID+passwd)
        const jsonData = await response.json();
        if (jsonData == 0) {
            reloadPage();
            alert("Invalid username or password");
        }
        else {
            response.redirected('client/profile.html');
        } 
    } catch (err) {
        console.log(err.message);
    }  
  
}

async function reloadPage() {
    location.reload();
    return false;
}