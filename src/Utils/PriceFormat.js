
export default priceFormat = (value, format) => {
    switch (format) {
        // 四舍五入
        case 'round':
            return Math.round(value / 100);
        case 'RMB':
            return '¥' + Math.round(value / 100);
        case 'price':
            return parseFloat((value / 100).toFixed(2));
        // 汽车价格
        // 保险金额
        case 'carPrice':
        case 'insPrice':
            value = Math.round(value / 100);
            return value > 9999 ? parseFloat((value / 10000).toFixed(2)) + '万' : value + '元';
        default:
            return value;
    }
};
