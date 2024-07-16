const {Auction} = require("../models/auctions.model");

module.exports = {
    // Read All Admin
    findAllAuctions: (req, res) => {
        Auction.find({})
            .then((auctions) => {
                res.json(auctions);
            })
            .catch(err => {
                res.json(err);
            });
    },
    // Read All User
    findAllUpcomingAuctions: (req, res) => {
        Auction.find({})
            .then((auctions) => {
                res.json(auctions);
            })
            .catch(err => {
                res.json(err);
            });
    },

    // Read One 
    findOneSingleAuction: (req, res) => {
        Auction.findOne({ _id: req.params.id })
            .then((oneSingleAuction) => {
                res.json(oneSingleAuction);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Create 
    createNewAuction: (req, res) => {
        Auction.create(req.body)
            .then((newlyCreatedAuction) => {
                res.json(newlyCreatedAuction);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Update 
    updateExistingAuction: (req, res) => {
        Auction.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true,
        })
            .then((updatedAuction) => {
                res.json(updatedAuction);
                console.log(req.params.id); // Corrected from req.param.id to req.params.id
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },

    // Delete 
    deleteAnExistingAuction: (req, res) => {
        Auction.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
    },
    markAuctionAsSold: (req, res) => {
        Auction.findOneAndUpdate(
            { _id: req.params.id },
            { price:req.params.price},
            { isSold: true },
            { new: true, runValidators: true }
        )
            .then((updatedAuction) => {
                if (!updatedAuction) {
                    return res.status(404).json({ message: "Auction not found" });
                }
                res.json(updatedAuction);
            })
            .catch((err) => {
                res.status(400).json(err);
            });
        },

        findNotSoldAuctions: (req, res) => {
            Auction.find({ isSold: false })
                .then((notSoldAuctions) => {
                    res.json(notSoldAuctions);
                })
                .catch((err) => {
                    res.status(400).json(err);
                });
        }
};
