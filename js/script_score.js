let modal = null;


const openModal = function (e) {
    e.preventDefault()
    const target = document.querySelector(e.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden')
    modal = target
   

    
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-modal')
    modal.removeEventListener('click' , closeModal)
    modal = null
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal)
});