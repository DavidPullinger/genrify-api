// called when a user signs up
const handleSignUp = (req, res, db, bcrypt) => {
    const { firstName, lastName, email, dateOfBirth, gender, dateJoined, password } = req.body;
    // hash the users password for storage
    const hash = bcrypt.hashSync(password);


    db.transaction(trx => {
        // insert into login table, the users email and hash
        trx.insert({
            email: email,
            hash: hash
        })
            .into('login')
            .returning('email')
            // if it is successfull, insert into the users table, their other details
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
                        res.json(user[0]); // return the user to front end so their details can be used from there
                    })

            })
            .then(trx.commit)
            // if there is an error, rollback all changes
            .catch(trx.rollback)
    })
        .catch(err => res.status(400).json('Failed to sign up'));
}

module.exports = {
    handleSignUp: handleSignUp
}