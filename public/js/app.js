const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = '';
weatherForm.addEventListener('click', (e) => {
    e.preventDefault();
    const location = search.value;
    messageTwo.textContent = '';
    fetch('/weather?address=' + location)
        .then(response => {
            response.json().then(d => {
                if (d.err) {
                    messageOne.textContent = d.err;
                } else {
                    messageOne.textContent = 'Enter Location';
                    if (d.location) {
                        messageOne.textContent = d.location;
                        messageTwo.textContent = d.temp + " " + d.rain;

                    }
                }
            })
        })
});
