const lengthSlider = document.querySelector('.password-length input')
const passwordInput = document.querySelector('.wrapper input')
const passwordIndicator = document.querySelector('.password-indicator')
const passwordLength = document.querySelector('.details span')
const copy = document.querySelector('.wrapper .copy')
const options = document.querySelectorAll('.options li input')
const generateBtn = document.querySelector('#btn')

const characters = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbol: "~`!@#$%^&*()_+-{}[]\|/?;:,.<>",
}

const generatePassword = () => {
    let staticPassword = "";
    randomPassword = "";
    excludeDuplicate = false;
    passLength = lengthSlider.value

    options.forEach(option => {
        if(option.checked) {
            if(option.id !== "exc-duplicate" && option.id !== "spaces") {
                staticPassword += characters[option.id]
            } else if(option.id === "spaces") {
                staticPassword += ` ${staticPassword} `
            } else {
                excludeDuplicate = true
            } 
        }
    })

    for(let i = 0; i < passLength; i++) {
        let randomChar = staticPassword[Math.floor(Math.random() * staticPassword.length)]
        if(excludeDuplicate) {
            !randomPassword.includes(randomChar) || randomChar == " " ? randomPassword += randomChar : i--;
        } else {
            randomPassword += randomChar
        }
    }
    passwordInput.value = randomPassword;
};

const updatePasswordIndicator = ()=>{
    passwordIndicator.id = lengthSlider.value <= 8 ? "weak" : lengthSlider.value <= 16 ? "medium" : "strong";
}

const updatePasswordSlider = ()=>{
    passwordLength.innerText = lengthSlider.value
    generatePassword();
    updatePasswordIndicator();
}
updatePasswordSlider()

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copy.style.color = "#000"
    setTimeout(()=>{
        copy.style.color = "#43a047"
    }, 2000)
    
}

/* generateBtn.addEventListener('click', generatePassword) */

generateBtn.addEventListener('click', ()=>{
    options.forEach(option => {
        if(!option.checked) {
            generateBtn.disabled
        } else {
            generatePassword();
        }
    })
})

lengthSlider.addEventListener('click', ()=>{
    options.forEach(option => {
        if(option.checked) {
            updatePasswordSlider()
        }
    })
})
copy.addEventListener('click', copyPassword)
/* lengthSlider.addEventListener('input', updatePasswordSlider) */
