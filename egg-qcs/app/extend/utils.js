module.exports = {
    formatDate(date) {
        if (typeof date !== 'object') {
            date = new Date(date);
        }
        let Y,M,D,h,m,s;
        Y = date.getFullYear() + '年';
        M = date.getMonth() + 1 + '月';
        D = date.getDate() + '日 ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y + M + D + h + m + s;
    }
}