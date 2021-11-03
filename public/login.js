const loginForm = document.querySelector('#login-form');    //Knyt konstanten /formular/ till /login-form/ i HTML'n
const login = document.querySelector('#loginEmail');
const password = document.querySelector('#loginPassword');

loginForm.addEventListener('submit', eventListnObj => {     // Starta en process som reagerar på knappen /submit/ i HTML'n
    eventListnObj.preventDefault();
    const loginObject = {                                   // Skapa ett objekt att ta mot data från 'endpointen' i nästa steg
        email: login.value,
        password: password.value
    };

    console.log('JSON.stringify(loginObject): ', JSON.stringify(loginObject));

    fetch('/api/user/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginObject)                   // Sätter citationstecken runt alla strängar i objektet
    })
        .then(res => res.json())                            // Responsen görs till json (vad var den innan?!)

        .then(response => {                                 // Den data som kom in via endpoint '/api/user/login' är kontrollerad och ett resultat finns att jobba med
            console.log("response: ", response);
            localStorage.setItem('token', response.token);  // Skapar typ en cookie i lokala webläsarens storage
            location.href = response.redirect;
        });
});
