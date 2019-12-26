console.log('Client side javascript is loaded')

// Fetch is a universal client-side method
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherSearch = (location = 'Saigon') => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.forecastData
                messageTwo.textContent = 'Latitude: ' + data.data.latitude + ', Longitude: ' + data.data.longitude
            }

        })
    })

}

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageOne.textContent = ''

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = ''
    messageTwo.textContent = ''
    const location = search.value
    weatherSearch(location)
})