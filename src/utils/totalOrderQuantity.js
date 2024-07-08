export const totalOrderQuantity = (array)=>{
    const total = array.reduce((acc, curItem)=> {
        console.log(curItem);
        return acc + curItem.option.quantity
    },0)
    return total
}