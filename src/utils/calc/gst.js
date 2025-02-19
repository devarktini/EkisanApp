

const gst = (price) => {
    price = parseFloat(price)
    // return price * (5 / 100)
    return price;
}
const incGST = (item) => {
    var price = parseFloat(item.price)
    if(item.sellerType="farmer"){
        // return price + price * (5 / 100)
        return price
    }else{
        return price
    }

}
export default gst
export { incGST }