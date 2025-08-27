const radios = document.querySelectorAll('input[name= "item"]');
const selectedItem = document.getElementById('selected-Item');
const selectedPrice = document.getElementById('selected-price');
const QuoteButton = document.getElementById('Qbutton');


//update slip

radios.forEach(radios => {
    radios.addEventListener('change', () =>{
        selectedItem.textContent = 'Item: ${radio.value}';
        selectedPrice.textContent = 'Price: R${radio.dataset.price}';

    });
});