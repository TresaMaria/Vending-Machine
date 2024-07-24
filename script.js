document.addEventListener('DOMContentLoaded', () => {
    const quantities = {
        'Pepsi': 20,
        'Pizza': 20,
        'Chocolate': 10,
        'Lays': 10,
        'Cola': 15,
        'Slice': 10,
        'Fries': 8,
        'Icecream': 10,
        'Popcorn': 10
    };
    updateDisplay();

    function buyItem() {
        const itemName = document.getElementById('item').value;
        const quantity = parseInt(document.getElementById('quantity').value);
        const amount = parseFloat(document.getElementById('amount').value);

        if (quantity <= 0) {
            alert('Quantity must be greater than 0');
            return;
        }

        const prices = {
            'Pepsi': 25,
            'Pizza': 120,
            'Chocolate': 40,
            'Lays': 20,
            'Cola': 45,
            'Slice': 40,
            'Fries': 80,
            'Popcorn': 60,
            'Icecream': 60
        };



        if (quantity > quantities[itemName]) {
            alert('Not enough stock');
            return;
        }
        const totalPrice = prices[itemName] * quantity;
        if (amount >= totalPrice) {
            const balance = amount - totalPrice;
            quantities[itemName] -= quantity;
            updateDisplay();
            showBill(itemName, quantity, amount, balance);
        }
        else {
            alert('OOPS! Not enough money!');
        }
    }
    window.buyItem = buyItem;
    function updateDisplay() {
        const values = Object.values(quantities);
        const items = document.getElementsByClassName('item');
        Array.from(items).forEach((x, index) => {
            const newQuantity = x.querySelector('.quantity span');
            newQuantity.textContent = values[index];
        })
    }

    function showBill(itemName, quantity, amount, balance) {
        const billPopup = document.createElement('div');
        billPopup.classList.add('popup');

        const billContent = `
    <h2>Reciept</h2>
    <p>Item : ${itemName}</p>
    <p>Quantity : ${quantity}</p>
    <p>Amount paid : ${amount.toFixed(2)}</p>
    <p>Balance : ${balance.toFixed(2)}</p>
    <button onclick="closeBill()" id="closebutton">Close</button>
    `;

        billPopup.innerHTML = billContent;
        document.body.appendChild(billPopup);

        const overlay = document.createElement('div');
        overlay.classList.add('overlay');
        document.body.appendChild(overlay);
    }
    window.closeBill = closeBill;
    function closeBill() {
        const billPopup = document.querySelector('.popup');
        const overlay = document.querySelector('.overlay');
        if (billPopup && overlay) {
            billPopup.remove();
            overlay.remove();
        }
    }
});