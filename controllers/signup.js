const handleSignUp = (req, res, db, bcrypt) => {
    const { firstName, lastName, email, dateOfBirth, gender, dateJoined, password } = req.body;
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return trx('users')
                    .returning('*')
                    .insert({
                        firstname: firstName,
                        lastname: lastName,
                        email: loginEmail[0],
                        dateofbirth: dateOfBirth,
                        gender: gender,
                        datejoined: dateJoined
                    }).then(user => {
                        res.json(user[0]);
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Failed to sign up'));
}

module.exports = {
    handleSignUp: handleSignUp
}