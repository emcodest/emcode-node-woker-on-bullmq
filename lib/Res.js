

this.Error = (message) => {
    const mres = { result: true, value: { message, status: false } }
    return mres
}
this.Success = (message, data=null) => {
    const mres = { result: true, value: { data, message, status: true } }
    return mres
}