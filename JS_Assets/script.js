const slipDate = document.getElementById('slip-date');
const slipItems = document.getElementById('slip-items');
const slipTotal = document.getElementById('slip-total');


function updateSlip(){
    slipDate.textcontent = "Date: " + new Date().toLocaleDateString();
    
    
    const selected = document.querySelectorAll("input[type = 'checkbox' ] : checked");
    let items = [];
    let total = 0;
    let discount = false;

    slipItems.innerHTML = "";

    selected.forEach(input => {
        const name = input.dataset.name;
        const price = input.dataset.price;

        if (price === "discount"){
            discount = true;    
        }else{
            const value = parseFloat(price);
            total += value;
            items.push({ name, value});
        }
    });

    if(discount){
        slipTotal*0.10;
        items.push({name: "10% discoun applied", value: -0.1});
    }

    items.forEach(item =>{
        const li = document.createElement("li");
        li.textContent = '${item.name} - R${item.value}';
        slipItems.appendChild(li);
    });

    slipTotal.textContent = "R" + total.toFixed(2);

} 

document.querySelector("input[type='checkboxes']").forEach(input => {
    input.addEventListner("change", updateSlip);
});

setInterval(updateSlip, 1000);

document.getElementById("QButton").addEventListener("click", ()=>{
    const body = "Here is your project quote: n\n" + slipItems.innerText + "\n\nTotal Cost: " + slipTotal.innerText;
    window.location.href = "mailtoyou@example.com?"
});

document.getElementById("MButton").addEventListener("click", () => {
    window.location.href ="#booking-calendar-link";
});

