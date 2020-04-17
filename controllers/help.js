// called when a user wants to add a new question
const addHelp = (req, res, db) => {
    let { email, question } = req.body;

    // insert into help table and return the "email" field
    db.insert({
        email: email,
        question: question
    })
        .into('help')
        .returning('email')
        .then(res.json("Success"))
}
// called when the help screen is loaded
const getHelp = (req, res, db) => {
    // select from help table, where the answer is NOT NULL (i.e. it has an answer). Return the helpid, question and answer
    db.select('helpid', 'question', 'answer')
        .from('help')
        .whereNot({ answer: null })
        .then(data => res.json(data +"Oobey goobey"))
}

module.exports = {
    addHelp: addHelp,
    getHelp: getHelp
}