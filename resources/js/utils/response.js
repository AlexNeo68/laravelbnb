export const is404 = (err) => {
    return isErrorWithResponseAndStatus(err) && err.response.status == 404;
}
export const is422 = (err) => {
    return isErrorWithResponseAndStatus(err) && err.response.status == 422;
}
const isErrorWithResponseAndStatus = (err) => {
    return err.response && err.response.status;
}
