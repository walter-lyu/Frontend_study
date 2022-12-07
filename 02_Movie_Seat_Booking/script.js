const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie_selected = document.getElementById('movie');
let ticket_price = Number(movie_selected.value);

populateUI()

function updateSelectedCount() {
    const selected_seats = document.querySelectorAll('.row .seat.selected')
    // console.log(selected_seats.length)
    const seatsIndex = [...selected_seats].map(function (seat) {
        return [...seats].indexOf(seat)
    })

    localStorage.setItem('selected_seats', JSON.stringify(seatsIndex))
    // console.log(seatsIndex)
    count.innerText = selected_seats.length
    // const movie_selected = document.getElementById('movie');
    // const ticket_price = Number(movie_selected.value);
    total.innerText = selected_seats.length * ticket_price

}

// get data from local storage and populate UI
function populateUI() {
    const selected_seats = JSON.parse(localStorage.getItem('selected_seats'))
    if (selected_seats != null && selected_seats.length > 0) {
        seats.forEach((seat, index) => {
            if (selected_seats.includes(index)) {
                seat.classList.add('selected')
            }
        })
    }
    const selected_movie_index = localStorage.getItem('selected_movie_index')
    if (selected_movie_index != null) {
        movie_selected.selectedIndex = selected_movie_index
        ticket_price = Number(movie_selected.value)
    }
    updateSelectedCount()

}
// seat click
container.addEventListener('click', function (e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        // console.log(e.target)
        e.target.classList.toggle('selected')
        updateSelectedCount()
    }
})
// movie select
movie_selected.addEventListener('change', (e) => {
    ticket_price = Number(movie_selected.value)
    localStorage.setItem('selected_movie_index', e.target.selectedIndex)
    updateSelectedCount()
})
// console.log(ticket_price)
