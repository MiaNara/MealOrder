export const modifyPrice = (values) => {
    if (values === '' || values === null || values === undefined)
        return '';
    else if (Number.isSafeInteger((+(values)))) {
        let temp1 = parseInt(values) / 1000
        let temp2;
        if (parseInt(values) % 1000 > 0) {
            temp2 = parseInt(temp1) * 1000 + 1000
        }
        else {
            temp2 = parseInt(temp1) * 1000

        }
        return temp2;
    }
    else
        return '';
}
export function formatCurrency(price) {
    return new Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0 }).format(price);
}
export function removeCurrencyDots(currencyString) {
    return currencyString.replace(/\./g, '');
}
