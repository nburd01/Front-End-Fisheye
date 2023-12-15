// Global DOM var
const body = document.body
const mainWrapper = document.querySelector('.main-wrapper')
const modal = document.querySelector('.photo-modal')
const modalCloseBtn = document.querySelector('.modal-close-btn')

// eslint-disable-next-line no-undef
$(document).on('keydown', (e) => {
  const keyCode = e.keyCode ? e.keyCode : e.which

  if (modal.getAttribute('aria-hidden') === 'false' && keyCode === 27) {
    onClosePic()
  }
})

// Func
export const onOpenPic = async () => {
  mainWrapper.setAttribute('aria-hidden', 'true')
  modal.setAttribute('aria-hidden', 'false')
  body.classList.add('no-scroll')
  modal.style.display = 'flex'
  modalCloseBtn.focus()
}

export const onClosePic = async () => {
  mainWrapper.setAttribute('aria-hidden', 'false')
  modal.setAttribute('aria-hidden', 'true')
  body.classList.remove('no-scroll')
  modal.style.display = 'none'
}
