const User = require('../models').Users;
const {createTokens} = require('../../JWT');

module.exports =
{
    register(req, res)
    {
        return User
            .findOne(
                {
                    where:
                    {
                        email: req.body.email,
                    }
                }
            )
            .then(user =>
                {
                    if(!user)
                    {
                        return User
                                .create(
                                {
                                    email: req.body.email,
                                    password: req.body.password
                                }
                            )
                            .then(user => res.status(201).send(user))
                            .catch(error => res.status(400).send(error));
                    }
                    else
                    {
                        return res.status(401).send(
                            {
                                message: "Email already exists in system",
                            }
                        );
                    }
                }
            )
            .catch(error => res.status(400).send(error));
    },

    loginUser(req, res)
    {
        return User
            .findOne(
                {
                    where:
                    {
                        email: req.body.email,
                    },
                }
            )
            .then(user =>
                {
                    if (!user)
                    {
                        return res.status(404).send(
                            {
                                message: "User not found",
                            }
                        );
                    }
                    if(user.password != req.body.password)
                    {
                        return res.status(401).send(
                            {
                                message: "username and or password incorrect",
                            }
                        );
                    }
                    
                    const accessToken = createTokens(user);
                    
                    res.cookie("access-token", accessToken, 
                    {
                        maxAge: 86400 * 1000, // 24 hours
                        httpOnly: true,
                    });

                    return res.status(200).json(
                        {
                            userId: user.id,
                        }
                    );
                })
                .catch(error => res.status(400).send(error));
    },
    logout(req, res)
    {
        res.clearCookie("access-token")
        return res.status(200).send("User logged out successfully")
    },

    resetPassword(req, res)
    {
        return User
            .findOne(
                {
                    where:
                    {
                        id: req.user.id,
                    },
                }
            )
            .then(user => 
                {
                    if (!user)
                    {
                        return res.status(404).send(
                            {
                                message: "User not found",
                            }
                        );
                    }
                    return user
                        .update(
                            {
                                password: req.body.password || user.password
                            }
                        )
                        .then(updatedUser => res.status(200).send(updatedUser))
                        .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
    updateEmail(req, res)
    {
        return User
            .findOne(
                {
                    where:
                    {
                        email: req.body.email,
                    },
                }
            )
            .then(user =>
                {
                    if (!user)
                    {
                        return User
                            .findOne(
                                {
                                    where:
                                    {
                                        id: req.user.id,
                                    },
                                }
                            )
                            .then(founduser => 
                                {
                                    if (!founduser)
                                    {
                                        return res.status(404).send(
                                            {
                                                message: "User not found",
                                            }
                                        );
                                    }
                                    return founduser
                                        .update(
                                            {
                                                email: req.body.email || founderuser.email
                                            }
                                        )
                                        .then(updatedUser => res.status(200).send(updatedUser))
                                        .catch(error => res.status(400).send(error));
                                })
                                .catch(error => res.status(400).send(error));
                    }
                    return res.status(401).send(
                        {
                            message: "That email is already associated with another account",
                        }
                    );
                })
                .catch(error => res.status(400).send(error));
    },
    getUser(req, res)
    {
        return User
            .findOne(
                {
                    where:
                    {
                        id: req.user.id,
                    },
                }
            )
            .then(user => 
                {
                    if (!user)
                    {
                        return res.status(404).send(
                            {
                                message: "User not found",
                            }
                        );
                    }
                    return res.status(200).send(user);
                })
                .catch(error => res.status(400).send(error));
    },
};
