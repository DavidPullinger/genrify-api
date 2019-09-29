const addHelp = (req, res, db) => {
    let { email, question } = req.body;
    res.json("So " + email + "wants to know: " + question);
}

module.exports = {
    addHelp: addHelp
}