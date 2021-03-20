let profile = []

const setProfile = (data) => {
    profile = data;
}

async function setProfile() {
    const fullname =  document.getElementsByName('#full-name');
    const addres = document.getElementsByName('#address1');
    const address = document.getElementsByName('#address2');
    const city = document.getElementsByName('#city');
    const state = document.getElementsByName('#state');
    const zip = document.getElementsByName('#zip');

    try {
        const response = await fetch("http://localhost:5000/profile/"+fullname+addres+address+city+state+zip)
        const jsonData = await response.json();
        if (jsonData == 0) {
            reloadPage();
            alert("No input response");
        }
        else {
            response.redirected("views/profile.html")
        } 
        
    } catch (err) {
        console.log(err.message);
    }  
  
}

async function reloadPage() {
    location.reload();
    return false;
}