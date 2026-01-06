const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1) ;

const toDateString = (year,month,day) => `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`

const stupne = (n) => {
    const absN = Math.abs(n);
    if (absN === 1) return "stupeň";
    if (absN >= 2 && absN <= 4 && !n < 0) return "stupně";
    return "stupňů";
};

export {capitalize,toDateString,stupne};