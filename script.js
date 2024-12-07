const sliderContainer = document.querySelector('.slider-container')
const slideRight = document.querySelector('.right-slide')
const slideLeft = document.querySelector('.left-slide')
const upButton = document.querySelector('.up-button')
const downButton = document.querySelector('.down-button')
const slidesLength = slideRight.querySelectorAll('div').length

let activeSlideIndex = 0
let isAnimating = false

// Ajuste inicial de la posición de las slides
slideLeft.style.top = `-${(slidesLength - 1) * 100}vh`

upButton.addEventListener('click', () => changeSlide('up'))
downButton.addEventListener('click', () => changeSlide('down'))

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') changeSlide('up')
    if (e.key === 'ArrowDown') changeSlide('down')
})

sliderContainer.addEventListener('touchstart', handleTouchStart, false)
sliderContainer.addEventListener('touchmove', handleTouchMove, false)

let startY = 0

function handleTouchStart(e) {
    startY = e.touches[0].clientY
}

function handleTouchMove(e) {
    const endY = e.touches[0].clientY
    const diff = startY - endY
    if (diff > 50) changeSlide('up')
    else if (diff < -50) changeSlide('down')
}

function changeSlide(direction) {
    if (isAnimating) return
    isAnimating = true

    const sliderHeight = sliderContainer.clientHeight

    if (direction === 'up') {
        activeSlideIndex++
        if (activeSlideIndex > slidesLength - 1) activeSlideIndex = 0
    } else if (direction === 'down') {
        activeSlideIndex--
        if (activeSlideIndex < 0) activeSlideIndex = slidesLength - 1
    }

    // Transición de las slides
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`

    updateIndicators()

    setTimeout(() => {
        isAnimating = false
    }, 500)
}

// Indicadores
const indicators = document.querySelector('.slide-indicators')

for (let i = 0; i < slidesLength; i++) {
    const dot = document.createElement('div')
    dot.classList.add('indicator')
    if (i === activeSlideIndex) dot.classList.add('active')
    indicators.appendChild(dot)
}

const updateIndicators = () => {
    document.querySelectorAll('.indicator').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === activeSlideIndex)
    })
}
