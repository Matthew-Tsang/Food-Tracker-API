const {sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
    const accessToken = sign(
            {
                username: user.username, id: user.id
            }, "secret_key"
        );

    return accessToken;
};

const validateToken = (req, res, next) => {

    console.log(req.cookies);

    const accessToken = req.cookies["access-token"];

    if(!accessToken)
    {
        return res.status(400).json({error: "User not Authenticated"});
    }

    try
    {
        const validToken = verify(accessToken, "secret_key");
        req.user = validToken;

        if (validToken)
        {
            req.authenticated = true;
            req.userid = accessToken.id;
            return next();
        }
    } catch(err)
    {
        return res.status(400).json({error: err});
    }
};

module.exports = {createTokens, validateToken};