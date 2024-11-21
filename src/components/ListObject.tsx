
const ListObject = (itemName: string, portionSize?: number) => {
    
    const regex = /(\d+)\s*(\w+)?\s*(.*)/;
    const matchAmountUnit = itemName.match(regex);
    
    
    const amount: number = matchAmountUnit && matchAmountUnit[1]
    ? parseInt(matchAmountUnit[1])
    : -1;
    const amountHolder: number = amount
    

    const adjustedAmount = amount > 0
    ? (portionSize ? amountHolder * portionSize : amountHolder)
    : -1;
    
    
    const unitType = 
    matchAmountUnit && matchAmountUnit[2]
    ? matchAmountUnit[2]
    : '';
    

    // Remove numbers and unit type and trim the string
    const ingredientName = itemName.replace(/\d+/, '').trim().replace(unitType, '');
    
    

    const displayString = adjustedAmount > 0
    ?`${ingredientName} ${adjustedAmount} ${unitType}`
    : `${ingredientName}`

    return displayString
}

export default ListObject;
