exports.isEmpty = (obj) =>{
    console.log("obj===>",obj)
    // if (obj) {
        if (Object?.keys(obj).length === 0 ) {
            return true
        } else {
            return false
        }
    // }
}