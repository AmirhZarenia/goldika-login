const col9 = document.getElementsByClassName('col-9')
const col3 = document.getElementsByClassName('col-3')

const apiPublic = 'https://brsapi.ir/FreeTsetmcBourseApi/Api_Free_Gold_Currency_v2.json'
const iconArz = document.getElementsByClassName('icon-arz')
const dolar = document.getElementById('price-dolar')
const gold = document.getElementById('price-gold')

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




window.onload = async function () {
    const response = await fetch(apiPublic);
    let data = await response.json();
    console.log(data)

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