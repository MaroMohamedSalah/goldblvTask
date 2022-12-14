// selection
let username = document.getElementById("userName");
let usernameError = document.querySelector(".username .error");

let password = document.getElementById("password");
let passwordError = document.querySelector(".password .error");

let email = document.getElementById("email");
let emailError = document.querySelector(".email .error");

let confirmPassword = document.getElementById("confirmPassword");
let confirmPasswordError = document.querySelector(".password_confirmation .error");

let form = document.getElementById("form");
let submit = document.querySelector(".submit input");

let allErrors = Array.from(document.querySelectorAll(".typeForm .error"));

let userEmail = document.getElementById("userEmail");
console.log(userEmail);

username.onchange = () => {
    checkErrorsInUserName();
}

email.onchange = () =>{
    checkErrorsInEmail();
}

password.onchange = () =>{
    checkErrorsInPassword();
}

confirmPassword.onchange = () =>{
    checkErrorsInConfirmPassword();
}

form.onsubmit = (e) =>{
    e.preventDefault();
        const formData = {
            'username' : username.value,
            'email' : email.value,
            'password' : password.value,
            'password_confirmation' : confirmPassword.value
        }
        fetch('https://goldblv.com/api/hiring/tasks/register', {
            method : 'POST',
            headers : {
                'Content-Type': 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => {
            if(res.status === 201){
                window.open("./succeed.html",'_self');
            }
            return res.json()
        })
        .then(formData =>{
            for (var key in formData.errors) {
                if (formData.errors.hasOwnProperty(key)) {
                    document.querySelector(`.${key} .error`).textContent = formData.errors[key][0] ;
                    document.querySelector(`.${key} .error`).style.opacity = '1'
                }
            }
            
            localStorage.setItem("userEmail" , formData.email);
            console.log(formData);
        })
        .catch(error => {
            console.log(error);
        });
}


// functions
const checkErrorsInUserName = () =>{
    if(username.value.length < 5 || username.value.length > 15){
        usernameError.textContent = "Username should be between 5 and 15 char."
        usernameError.style.opacity = "1";
    }else if(username.value.match(/\W/g)){
        usernameError.textContent = "Only letters and numbers are allowed."
        usernameError.style.opacity = "1";
    }else if(username.value.match(/\d\b/g)){
        usernameError.textContent = "Numbers at the beginning or the end not allowed."
        usernameError.style.opacity = "1";
    }
    else{
        usernameError.textContent = "";
        usernameError.style.opacity = "0";
    }
}
const checkErrorsInEmail = () =>{
    if(!email.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
        emailError.textContent = "Invalid Email!";
        emailError.style.opacity = '1';
    }else {
        emailError.textContent = "";
        emailError.style.opacity = '0';
    }
}
const checkErrorsInPassword = () =>{
    if(password.value.length < 8){
        passwordError.textContent = "Password must be at least 8 characters"
        passwordError.style.opacity = "1";
    }else{
        passwordError.textContent = "";
        passwordError.style.opacity = "0";
    }
}
const checkErrorsInConfirmPassword = () =>{
    if(password.value.length != confirmPassword.value.length || confirmPassword.value != password.value || confirmPassword.value.length === 0){
        confirmPasswordError.textContent = "Must confirm your password";
        confirmPasswordError.style.opacity = "1";
    }else{
        confirmPasswordError.textContent = "";
        confirmPasswordError.style.opacity = "0";
    }
}