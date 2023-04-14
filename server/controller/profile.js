const Profile = require('../models').UserProfile;

module.exports = 
{
    create(req, res)
    {
        return Profile
            .create({
                name: req.body.name,
                height: req.body.height,
                carbs: parseFloat(req.body.carbs),
                protein: parseFloat(req.body.protein),
                fat: parseFloat(req.body.fat),
                picture: req.body.picture,
                UserId: req.user.id,
            })
            .then(profile => res.status(201).send(profile))
            .catch(error => res.status(400).send(error));
    },
    retrieve(req, res)
    {
        return Profile
            .findOne(
                {
                    where:
                    {
                        UserId: req.user.id,
                    },
                }
            )
            .then(profile =>
                {
                    if(!profile)
                    {
                        return Profile
                            .create({
                                name: "enter name",
                                height: "enter height",
                                carbs: 0.0,
                                protein: 0.0,
                                fat: 0.0,
                                picture: "enter picture",
                                UserId: req.user.id,
                            })
                            .then(profile => res.status(201).send(profile))
                            .catch(error => res.status(400).send(error));
                    }
                    return res.status(200).send(profile);
                })
                .catch(error => res.status(400).send(error));
    },
    update(req, res)
    {
        return Profile
            .findOne(
                {
                    where:
                    {
                        UserId: req.user.id,
                    },
                }
            )
            .then(profile =>
                {
                    if(!profile)
                    {
                        return res.status(404).send(
                            {
                                message: "Profile not Found",
                            }
                        );
                    }
                    return profile
                        .update(
                            {
                                name: req.body.name || profile.name,
                                height: req.body.height || profile.height,
                                carbs: parseFloat(req.body.carbs) || profile.carbs,
                                protein: parseFloat(req.body.protein) || profile.protein,
                                fat: parseFloat(req.body.fat) || profile.fat,
                                picture: req.body.picture || profile.picture,
                            }
                        )
                        .then(updatedProfile => res.status(200).send(updatedProfile))
                        .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
    },
};