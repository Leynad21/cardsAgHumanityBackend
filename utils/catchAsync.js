

module.exports = fn => {
    return (req, res, next) => {
        // below next inside the catch is the same as err => next(err)
        fn(req, res, next).catch(next)
    }
}