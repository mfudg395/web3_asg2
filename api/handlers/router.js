

// Returns all plays (DO NOT INCLUDE PLAYTEXT)
const handleAllPlays = (app, Play) => {
    app.get('/api/list', helper.ensureAuthenticated, (req, resp) => {
        Play.find({}, '-playText', (err, data) => {
            if (err) {
                resp.json({ message: 'Unable to connect to plays' });
            } else {
                resp.json(data);
            }
        });
    });
};

// Returns single play (INCLUDE PLAYTEXT)
const handleSinglePlay = (app, Play) => {
    app.get('/api/list/:id', helper.ensureAuthenticated, (req, resp) => {
            Play.find({ id: req.params.id }, (err, data) => { // must be exact match
                if (err) {
                    resp.json({ message: 'Play not found' });
                } else {
                    resp.json(data);
                }
            });
        });
};

// Returns single user (id, details, picture, membership, email)
const handleSingleUser = (app, User) => {
    app.get('/api/user/:id', helper.ensureAuthenticated, (req, resp) => {
            User.find({ id: req.params.id }, 'id details picture membership email', (err, data) => {
                if (err) {
                    resp.json({ message: 'User not found'});
                } else {
                    resp.json(data);
                }
            })
        });
}

module.exports = {
    handleAllPlays,
    handleSinglePlay,
    handleSingleUser
};