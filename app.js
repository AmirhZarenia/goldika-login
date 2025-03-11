const col9 = document.getElementsByClassName('col-9')
const col3 = document.getElementsByClassName('col-3')

const apiPublic = 'https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency_v2.json'
const iconArz = document.getElementsByClassName('icon-arz')
const dolar = document.getElementById('price-dolar')
const gold = document.getElementById('price-gold')

const number = document.getElementById('phone-number')
const code = document.getElementById('code')
const numberSendError = document.getElementById('number-protect')
const btnLogin = document.getElementById('btn-login')
const textSendCode = document.getElementById('text-login')
const ghvanin = document.getElementById('ghvanin')
const btnRegister = document.getElementById('btn-register-code')
const changeNumber = document.getElementById('change-number')



if (window.outerWidth < 1100) {
    col9[0].classList.add('col-0')
    col9[0].style.display = 'none'
    col3[0].classList.add('col-12')
} else {
    col9[0].classList.remove('col-0')
    col9[0].style.display = 'block'
    col3[0].classList.remove('col-12')
}

window.addEventListener('resize', function () {
    if (window.outerWidth < 1100) {
        col9[0].classList.add('col-0')
        col9[0].style.display = 'none'
        col3[0].classList.add('col-12')
    } else {
        col9[0].classList.remove('col-0')
        col9[0].style.display = 'block'
        col3[0].classList.remove('col-12')
    }
});







number.addEventListener('input', () => {
    const value = number.value.replace(/[^0-9]/g, '');
    number.value = value;

    numberSendError.innerHTML = ''
    number.classList.remove("border-success")
    number.classList.remove("border-danger")
    numberSendError.classList.remove('text-success')
    numberSendError.classList.remove('text-danger')


    let formattedValue = value
        .replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3') // فرمت 4-3-4
        .trim();
    number.value = formattedValue;


    if (value.search('09') && number.value && number.value.length <= 13) {
        numberSendError.innerHTML = 'شماره موبایل معتبر نمیباشد لطفا یک شماره معتبر وارد کنید .'
        numberSendError.classList.add('text-danger')
        numberSendError.classList.remove('text-white')
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault()
        })
    } else if (!value.search('09') || !number.value) {
        numberSendError.innerHTML = 'مالکیت شماره باید به نام خودتان باشد'
        numberSendError.classList.add('text-white')
        numberSendError.classList.remove('text-danger')
        if (number.value.length === 13) {
            btnLogin.addEventListener('click', (e) => {
                textSendCode.innerHTML = 'کد یکبار مصرف ارسال شد'
                numberSendError.innerHTML = 'مالکیت شماره باید به نام خودتان باشد'
                numberSendError.classList.add('text-white')
                numberSendError.classList.remove('text-danger')
                numberSendError.style.display = 'none'
                ghvanin.style.display = 'none'
                number.style.display = 'none'
                code.style.display = 'block'
                btnLogin.style.display = 'none'
                btnRegister.style.display = 'block'
                changeNumber.style.display = 'block'
                changeNumber.addEventListener('click', () => {
                    textSendCode.innerHTML = 'ورود | ثبت نام'
                    numberSendError.style.display = 'block'
                    ghvanin.style.display = 'block'
                    number.style.display = 'block'
                    code.style.display = 'none'
                    btnLogin.style.display = 'block'
                    btnRegister.style.display = 'none'
                    changeNumber.style.display = 'none'
                })

                // Send Sms For Login
                const apiKey = '3445624B79745951442B4433595476516F47552F4B4A75356F6C785976636D53714D53394D463439776C383D';
                const verify = 'Login-Users'; // یک شماره تلفن معتبر
                const receptor = number.value;
                const token = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');

                const url = `https://api.kavenegar.com/v1/${apiKey}/verify/lookup.json?receptor=${receptor}&token=${token}&template=${verify}`;

                axios.post(url, null, {
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        console.log(response.data);
                    })
                    .catch((error) => {
                        console.error(error);
                    });

                btnRegister.addEventListener('click', (e) => {
                    e.preventDefault()
                    if (code.value === token) {
                        Swal.fire({
                            title: 'موفقیت آمیز',
                            text: 'کد وارد شده درست است خوش آمدید',
                            icon: 'success',
                            confirmButtonText: 'تایید',
                            timer: '3000',
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        })
                    } else {
                        Swal.fire({
                            title: 'خطا',
                            text: 'کد 6 رقمی وارد شده صحیح نمیباشد لطفا کد درست رو وارد کنید',
                            icon: 'error',
                            confirmButtonText: 'تایید',
                            timer: '3000',
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.onmouseleave = Swal.resumeTimer;
                            }
                        })
                    }
                })

                changeNumber.addEventListener('click', (e) => {
                    e.preventDefault()
                })


            })
        }
        if (number.value.length < 13) {
            btnLogin.addEventListener('click', (e) => {
                numberSendError.innerHTML = 'شماره موبایل معتبر نمیباشد لطفا یک شماره معتبر وارد کنید .'
                numberSendError.classList.add('text-danger')
                numberSendError.classList.remove('text-white')
            })

        }

    }
})




window.onload = async function () {
    const response = await fetch(apiPublic);
    let data = await response.json();

    // dolar
    if (data.currency[0].change_percent < 0) {
        dolar.style.color = '#F16B51'
        iconArz[0].classList.add('fa-angle-down')
        iconArz[0].style.color = '#F16B51'
        dolar.innerHTML = ` ${Math.round(data.currency[0].price).toLocaleString()} (${data.currency[0].change_percent}%)`
    } else {
        dolar.style.color = '#96E57B'
        iconArz[0].classList.add('fa-angle-up')
        iconArz[0].style.color = '#96E57B'
        dolar.innerHTML = ` ${Math.round(data.currency[0].price).toLocaleString()} (+${data.currency[0].change_percent}%)`
    }

    // gold
    if (data.gold[6].change_percent < 0) {
        gold.style.color = '#F16B51'
        iconArz[1].classList.add('fa-angle-down')
        iconArz[1].style.color = '#F16B51'
        gold.innerHTML = ` ${Math.round(data.gold[6].price).toLocaleString()} (${data.gold[6].change_percent}%)`
    } else {
        gold.style.color = '#96E57B'
        iconArz[1].classList.add('fa-angle-up')
        iconArz[1].style.color = '#96E57B'
        gold.innerHTML = ` ${Math.round(data.gold[6].price).toLocaleString()} (+${data.gold[6].change_percent}%)`
    }

}


