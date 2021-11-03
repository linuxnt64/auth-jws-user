const multiForm = document.querySelector('#createChangeUser');    //Knyt konstanten /formular/ till /login-form/ i HTML'n
								  // Kanske kan skrivas som document.getElementById('createChangeUser');
const formlogin = document.querySelector('#loginName');
const formemail = document.querySelector('#loginEmail');
const formpassword = document.querySelector('#loginPassword');

multiForm.addEventListener('create', eventListnObj => {     // Starta en process som reagerar på knappen /create/ i HTML'n
    eventListnObj.preventDefault();
    const loginObject = {                                    // Skapa ett objekt att ta mot data från 'endpointen' i nästa steg
        login: formlogin.value,
        email: formemail.value,
        password: formpassword.value
    };
    console.log('loginObject: ', loginObject);
    console.log('JSON.stringify(loginObject): ', JSON.stringify(loginObject));
});
