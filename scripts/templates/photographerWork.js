/* eslint-disable no-unused-expressions */
import { PhotographerPages } from '../pages/photographer.js'

class PhotographerWork {
  constructor (photographer, media, likeSubject) {
    this._photographer = photographer
    this._media = media
    this._likeSubject = likeSubject

    const mediasWrapper = document.querySelector('#main')

    const counterDiv = document.createElement('div')
    counterDiv.classList.add('counter')

    const counterDivHeartLikes = document.createElement('div')
    counterDivHeartLikes.classList.add('heartLikes')

    const counterDivHeart = document.createElement('div')
    counterDivHeart.classList.add('fas', 'fa-heart', 'black')

    const counterDivLikes = document.createElement('div')
    counterDivLikes.classList.add('likes')
    const result = media.map((a) => a.likes)
    this.sum = result.reduce((acc, current) => acc + current, 0)

    counterDivLikes.innerHTML = this.sum

    counterDivLikes
    this.sortMedia()
    const counterDivPrice = document.createElement('div')
    counterDivPrice.classList.add('price')
    counterDivPrice.innerHTML = `${photographer.price}€ / jour`

    counterDivHeartLikes.appendChild(counterDivLikes)
    counterDivHeartLikes.appendChild(counterDivHeart)

    counterDiv.appendChild(counterDivHeartLikes)
    counterDiv.appendChild(counterDivPrice)
    mediasWrapper.appendChild(counterDiv)
  }

  sortMedia () {
    const piecesOrdonnees = Array.from(this._media)
    const sortedPieces = piecesOrdonnees.sort(function (a, b) {
      return a.likes - b.likes
    })
    this.renderLightBox(sortedPieces)
  }

  // Render lightbox
  renderLightBox (media) {
    const photographerName = this._photographer
    media.forEach((media, index, photographer) => {
      const mediaTypeElement = document.createElement('p')

      const mediasWrapper = document.querySelector('#medias-wrapper')
      // Create a container for each media item
      const mediaContainer = document.createElement('div')
      mediaContainer.classList.add('media-info')

      // Create a container for media details
      const mediaImg = document.createElement('a')
      mediaImg.classList.add(`media-${media.id}`)

      const mediaDetails = document.createElement('div')
      mediaDetails.classList.add('media-details')

      // Create a <p> element for the media ID
      const mediaIdElement = document.createElement('p')
      mediaIdElement.innerHTML = `ID: ${media.id}`

      // Create a <p> element for the media title
      const mediaTitleElement = document.createElement('p')
      mediaTitleElement.innerHTML = media.title

      // Create a <p> element for the media title
      const mediaLikeContainer = document.createElement('div')
      mediaLikeContainer.classList.add('media-like')

      // Create a <p> element for the media title
      const mediaLikeElement = document.createElement('p')
      mediaLikeElement.innerHTML = media.likes

      // Create a <p> element for the media title
      const far = document.createElement('i')
      far.classList.add('far', 'fa-heart')
      far.setAttribute('data-index', index)
      far.onclick = () =>
        changeHeart(
          far,
          index,
          media.likes,
          mediaLikeElement,
          sum,
          counterDivLikes
        )

      if (media.image) {
        mediaTypeElement.innerHTML = 'Type: Image'
        // Construct the path to the image using the correct folder structure
        const imagePath = `assets/images/${photographerName.name}/${media.image}`

        // Create an <img> element for displaying the image
        const imageElement = document.createElement('img')
        imageElement.src = imagePath
        imageElement.alt = media.title
        imageElement.setAttribute('id', `media-${media.id}`)
        imageElement.onclick = () => this.openLightbox(media.id)

        // Append the image element to the mediaImg container
        mediaImg.appendChild(imageElement)
      } else if (media.video) {
        mediaTypeElement.innerHTML = 'Type: Video'
        // Construct the path to the video using the correct folder structure
        const videoPath = `assets/images/${photographerName.name}/${media.video}`

        // Create a <video> element for displaying the video
        const videoElement = document.createElement('video')
        videoElement.src = videoPath
        videoElement.alt = media.title
        videoElement.setAttribute('id', `media-${media.id}`)
        videoElement.controls = true
        videoElement.onclick = () => this.openLightbox(media.id)

        // Append the video element to the mediaImg container
        mediaImg.appendChild(videoElement)
      }

      // mediaDetails.appendChild(mediaIdElement);
      mediaDetails.appendChild(mediaTitleElement)
      mediaLikeContainer.appendChild(mediaLikeElement)
      mediaLikeContainer.appendChild(far)
      // mediaLikeContainer.appendChild(fas);

      // Add the media details container to the media container
      mediaContainer.appendChild(mediaImg)
      mediaContainer.appendChild(mediaImg)
      mediaContainer.appendChild(mediaDetails)
      mediaContainer.appendChild(mediaDetails)
      mediaDetails.appendChild(mediaLikeContainer)

      // Add the media container to the medias wrapper
      mediasWrapper.appendChild(mediaContainer)
    })
  }

  createPhotographerWork (photographer, media, counterDivLikes) {
    let sum = this.sum
    function changeHeart (
      clickedElement,
      index,
      currentLikes,
      mediaLikeElement
    ) {
      const farElements = document.querySelectorAll('.fa-heart')
      const far = farElements[index]
      console.log(far)
      far.classList.toggle('far')
      far.classList.toggle('fas')

      const updatedLikes = far.classList.contains('far') ? currentLikes + 0 : currentLikes + 1

      sum = sum + (far.classList.contains('far') ? -1 : 1)
      console.log('newSum', sum)

      const counterDivLikes = document.querySelector('.likes')
      if (counterDivLikes) {
        counterDivLikes.innerHTML = sum
      }
      mediaLikeElement.innerHTML = updatedLikes
    }

    // Get the drop-down button and the dropdown content
    const dropBtn = document.querySelector('.dropbtn')
    const dropdownContent = document.getElementById('myDropdown')
    const borderDropDownElement = document.querySelector('.borderDropDown')


    // Function to toggle the dropdown menu
    function toggleDropdown () {
      dropdownContent.classList.toggle('show')
    }

    // Attach the toggleDropdown function to the dropBtn click event
    dropBtn.addEventListener('click', toggleDropdown)

    // Function to handle the click on the element with class "borderDropDown"
    function handleBorderDropDownClick (event) {
      toggleDropdown()
      const clickedElement = event.target
    }

    // Function to log the text content of the clicked <p> element
    function logClickedElement (event) {
      const clickedElement = event.target

      // Check if the clicked element is a <p> element
      if (clickedElement.tagName.toLowerCase() === 'p') {
        console.log('Clicked <p> value:', clickedElement.textContent)
        dropBtn.innerHTML = clickedElement.textContent
        chevronUp.classList.add('fa-solid', 'fa-chevron-up')
        dropDownBtn.appendChild(chevronUp)
      }
    }

    // Attach a click event listener to each element inside "myDropdown"
    const dropdownElements = dropdownContent.querySelectorAll('*')

    dropdownElements.forEach(element => {
      element.addEventListener('click', logClickedElement)
    })
    // Attach the handleBorderDropDownClick function to the "borderDropDown" element
    borderDropDownElement.addEventListener('click', handleBorderDropDownClick)

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
      if (!event.target.matches('.dropbtn, .dropbtn > *, .borderDropDown')) {
        dropdownContent.classList.remove('show')
      }
    }

    // likes
    const boutonTrierLikes = document.querySelector('.btn-popularite')
    boutonTrierLikes.addEventListener('click', () => {
      const piecesOrdonnees = Array.from(media)
      piecesOrdonnees.sort(function (a, b) {
        return a.likes - b.likes
      })
      console.log('boutonTrier', piecesOrdonnees)
      document.querySelector('#medias-wrapper').innerHTML = ''
      this.renderLightBox(piecesOrdonnees)
    })

    // dates
    const boutonFiltrerDates = document.querySelector('.btn-dates')
    boutonFiltrerDates.addEventListener('click', () => {
      const piecesOrdonnees = Array.from(media)
      piecesOrdonnees.sort(function (a, b) {
        const dateA = new Date(a.date)
        const dateB = new Date(b.date)
        return dateA - dateB
      })
      document.querySelector('#medias-wrapper').innerHTML = ''
      this.renderLightBox(piecesOrdonnees)
    })
    // titles
    const boutonFiltrerTitles = document.querySelector('.btn-titres')
    boutonFiltrerTitles.addEventListener('click', () => {
      const piecesOrdonnees = Array.from(media)
      piecesOrdonnees.sort(function (a, b) {
        return a.title.localeCompare(b.title)
      })
      document.querySelector('#medias-wrapper').innerHTML = ''
      this.renderLightBox(piecesOrdonnees)
    })
    const dropDownBtn = document.querySelector('.dropbtn')
    const chevronUp = document.createElement('div')
    chevronUp.classList.add('fa-solid', 'fa-chevron-up')
    dropDownBtn.appendChild(chevronUp)
    // renderLightBox(media)
  }

  openLightbox (mediaId) {
    const photographerPages = new PhotographerPages()
    photographerPages.lightbox(mediaId)
  }
}

export { PhotographerWork }
