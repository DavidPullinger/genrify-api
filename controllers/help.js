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

const getHelp = (req, res, db) => {
    db.select('helpid', 'question', 'answer')
        .from('help')
        .whereNot({ answer: null })
        .then(data => res.json(data))
}

module.exports = {
    addHelp: addHelp,
    getHelp: getHelp
}