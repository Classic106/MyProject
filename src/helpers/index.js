const ValidString = val =>{
    if(!(/^[a-z0-9]*$/gi).test(val) && val !== '') return false;
    return true;
}
const ValidMail = val =>{
    if(!(/^\S+@\S+\.\S+$/gi).test(val)
        && val !== '') return false;
        return true;
}
const ValidPassword = val =>{
    if(!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gi).test(val) && val !== '') return false;
    return true;
}
const ValidHouse = val =>{
    if(!(/(\d+|\d+[a-zA-Z]|\d+\/[a-zA-Z])$/gi).test(val) && val !== '') return false;
    return true;
}
const ValidPhone = val =>{
    if(!(/^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm).test(val)
        && val !== '') return false;
    return true;
}

const MySortArray = (arr, value, sort) =>{
    
    const newArr = [...arr];
    
    if(!arr || !Array.isArray(arr) || arr.length === 0) return;
    if(!value) return;

    const SortAscent = (a, b) =>{
        if(a[value] < b[value]) return -1;
        if(a[value] > b[value]) return 1;
        return 0;
    }
    
    const SortDescent = (a, b) =>{
        if(a[value] > b[value]) return -1;
        if(a[value] < b[value]) return 1;
        return 0;
    }

    if(sort === 'ASK') return newArr.sort(SortAscent);
    if(sort === 'DESK') return newArr.sort(SortDescent);
    
    return newArr;
}

export {
    ValidMail, ValidPassword, ValidHouse,
    ValidString, ValidPhone, MySortArray
};
