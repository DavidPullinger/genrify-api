const addHelp = (req, res, db) => {
    let { email, question } = req.body;

    // insert into 
    db.insert({
        email: email,
        question: question
    })
        .into('help')
        .returning('email')
        .then(res.json("Success"))
}

module.exports = {
    addHelp: addHelp
}