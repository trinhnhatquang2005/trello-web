function capitalizeFirstLetter(val) {
    if (!val) return val;
    return val.charAt(0).toUpperCase() + val.slice(1);
}



export { capitalizeFirstLetter }