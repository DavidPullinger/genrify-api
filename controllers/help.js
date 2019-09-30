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
    db.select('question', 'answer')
        .from('help')
        .whereNot({ question: '' })
        .then(data => res.json(data))
}

module.exports = {
    addHelp: addHelp,
    getHelp: getHelp
}