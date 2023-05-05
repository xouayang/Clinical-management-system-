function add_zero(your_number, length = 2) {
    var num = '' + your_number;
    if(num.length < length){
        num = '0' + num;
    }
    if(num.length > length){
        num = num.substring(num.length-2, num.length);
    }
    return num;
}
function randomStaffId() {
    let date = new Date();
    let year = add_zero(date.getFullYear());
    let month = add_zero(date.getMonth());
    let day = add_zero(date.getDate());
    let random = Math.floor(Math.random() * 100);
    return `MV${year}${month}${day}${random}`;
}
module.exports = { add_zero, randomStaffId }