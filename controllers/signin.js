// called when a user signs in
const handleSignIn = (req, res, db, bcrypt) => {
    // get email and hash from login table where inputted email is equal to record email
    db.select('email', 'hash').from('login')
        .where({ email: req.body.email })
        .then(data => {
            // compare the stored hash with the inputted password's hash
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
            // if they are the same, return the user oobject from the user table
            if (isValid) {
                return db.select('*').from('users')
                    .where({ email: req.body.email })
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('Unable to get user'));
            } 
            // else notify front end that the password is invalid
            else {
                res.status(400).json('Invalid password')
            }
        })
        // if there is no result, notify front end that the email is invalid
        .catch(err => res.status(400).json('Invalid email'))
}

module.exports = {
    handleSignIn: handleSignIn
}