function isEmail(email) {
    return email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/);
}

function calcOrderAmount(order_lines) {
    let newOrderAmount = 0;
    for (let i = 0; i < order_lines.length; i++) {
        newOrderAmount += order_lines[i].total_amount;
    }
    return newOrderAmount;
}

module.exports = {
    isEmail,
    calcOrderAmount,
}