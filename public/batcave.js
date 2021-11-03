const multiForm = document.querySelector('#createChangeUser');    //Knyt konstanten /formular/ till /login-form/ i HTML'n
								  // Kanske kan skrivas som document.getElementById('createChangeUser');
const formLogin = document.querySelector('#newName');
const formEmail = document.querySelector('#newEmail');
const formPassword = document.querySelector('#newPassword');

multiForm.addEventListener('create', eventListnObj => {     // Starta en process som reagerar på knappen /create/ i HTML'n
    eventListnObj.preventDefault();
    const newUserObject = {                                    // Skapa ett objekt att ta mot data från 'endpointen' i nästa steg
        login: formLogin.value,
        email: formEmail.value,
        password: formPassword.value
    };
    console.log('New User Object: ', newUserObject);
    console.log('JSON.stringify(loginObject): ', JSON.stringify(newUserObject));

    fetch('/api/user/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUserObject)                   // Sätter citationstecken runt alla strängar i objektet
    })
        .then(res => res.json())                            // Responsen görs till json (vad var den innan?!)

        .then(response => {                                 // Den data som kom in via endpoint '/api/user/login' är kontrollerad och ett resultat finns att jobba med
            console.log("response: ", response);
            alert(`Användare ${login} är nu skapad, med ${email} som ID`);
        });

});
