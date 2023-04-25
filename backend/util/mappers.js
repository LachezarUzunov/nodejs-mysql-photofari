function mapErrors(err) {
    if (Array.isArray(err)) {
        return err;
    } else if (typeof err.message == 'string') {
        return [{msg: err.message}]
    } else {
        return Object.values(err.errors).map((e) => ({msg: e.message}))
    }
}

module.exports = mapErrors;