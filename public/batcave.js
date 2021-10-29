const multiForm = document.querySelector('#createChangeUser');    //Knyt konstanten /formular/ till /login-form/ i HTML'n
const login = document.querySelector('#loginName');
const email = document.querySelector('#loginEmail');
const password = document.querySelector('#loginPassword');

multiForm.addEventListener('create', eventListnObj => {     // Starta en process som reagerar på knappen /create/ i HTML'n
    eventListnObj.preventDefault();
    const userObject = {                                    // Skapa ett objekt att ta mot data från 'endpointen' i nästa steg
        login: login.value,
        email: email.value,
        password: password.value
    };
    console.log('loginObject: ', loginObject);
    console.log('JSON.stringify(loginObject): ', JSON.stringify(loginObject));
});
