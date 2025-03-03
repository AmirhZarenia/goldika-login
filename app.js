const col9 = document.getElementsByClassName('col-9')
const col3 = document.getElementsByClassName('col-3')


const number = document.getElementById('phone-number')
const numberSendError = document.getElementById('number-protect')


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



// متن‌های متغیر
const texts = ['آنلاین ، سریع و بدون محدودیت', 'بدون اجرت و مالیات', 'شفاف، تضمین شده و مطمئن', "راهکاری ایمن برای حفظ ارزش پول"];

// عنصر HTML که متن در آن قرار می‌گیرد
const textElement = document.querySelector('#variable-text');

// متغیر برای نگهداری اندیس متن فعلی
let currentIndex = 0;

// تابعی برای تغییر متن
function changeText() {
    // متن فعلی را عوض کن
    textElement.textContent = texts[currentIndex];

    // انیمیشن را فعال کن
    textElement.classList.remove('fade-in');
    textElement.classList.add('fade-out');

    // بعد از 0.5 ثانیه انیمیشن را غیرفعال کن
    setTimeout(() => {
        textElement.classList.remove('fade-out');
        textElement.classList.add('fade-in');
    }, 500);

    // اندیس متن فعلی را عوض کن
    currentIndex = (currentIndex + 1) % texts.length;
}

// تابع changeText را هر 3 ثانیه یک بار فراخوانی کن
setInterval(changeText, 3000);

// متن فعلی را تنظیم کن
changeText();




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

    if (value.search('09') && number.value) {
        numberSendError.innerHTML = 'شماره موبایل معتبر نمیباشد لطفا یک شماره معتبر وارد کنید .'
        numberSendError.classList.add('text-danger')
        numberSendError.classList.remove('text-white')
    } else if (!value.search('09') || !number.value) {
        numberSendError.innerHTML = 'مالکیت شماره باید به نام خودتان باشد'
        numberSendError.classList.add('text-white')
        numberSendError.classList.remove('text-danger')
    }
})