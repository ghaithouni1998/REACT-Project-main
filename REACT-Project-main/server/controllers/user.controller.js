const User = require('../models/user.model');
const {Auction} = require("../models/auctions.model");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = {
    register: async (req, res) => {
        try {
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } });
            }
            const user = await User.create(req.body);
            const userToken = jwt.sign({ id: user._id }, process.env.jwt);
            res.status(201).cookie('userToken', userToken).json({ 'token': userToken });
        } catch (error) {
            res.status(400).json(error.errors);
        }
    },
    registerAdmin: async (req, res) => {
        try {
            const userFromDb = await User.findOne({ email: req.body.email });
            if (userFromDb) {
                return res.status(400).json({ email: { message: "Email Already Exist. Try to Login." } });
            }
            const userData = { ...req.body, role: 'admin' };
            const adminUser = await User.create(userData);
            const adminToken = jwt.sign({ id: adminUser._id }, process.env.jwt);
            res.status(201).cookie('userToken', adminToken).json({ 'token': adminToken });
        } catch (error) {
            res.status(400).json(error.errors);
        }
    },
    login: async (req, res) => {
        const userFromDb = await User.findOne({ email: req.body.email })
        if (!userFromDb) {
            return res.status(400).json({ email: { message: "Email doesn't exist." } })
        } else {
            try {
                const compareResult = await bcrypt.compare(req.body.password, userFromDb.password);
                if(!compareResult){
                    return res.status(400).json({ email: { message: "Wrong password ." } })
                } else{
                    const userToken  = jwt.sign({id:userFromDb._id}, process.env.jwt)
                    return res.status(200).cookie('userToken', userToken).json({'token':userToken})
                }
            } catch (error) {
                res.status(400).json(error)
            }
        }
    },
    logout : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            res.clearCookie('userToken');
            res.status(204).json({message:"User Logged out successfully."})
        } catch (error) {
            res.status(400).json(error)
        }
    },
    buyAuction: async (req, res) => {
        const { userToken } = req.cookies;
        console.log(req.cookies);
        if (!userToken) {
            return res.status(400).json({ message: "Token not found." });
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt);
            await User.findByIdAndUpdate(token.id, {$push:{auctions:req.body.auctionId}});
            console.log("Auction Id :", req.body.auctionId);
            const auction  = await Auction.findOne({_id: req.body.auctionId})
            await Auction.findByIdAndUpdate(req.body.auctionId, {isSold:true});
            console.log("Auction :",auction);
            return res.status(200).json({message:"Auction Closed"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    addFav: async (req, res) => {
        const { userToken } = req.cookies;
        console.log(req.cookies);
        if (!userToken) {
            return res.status(400).json({ message: "Token not found." });
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt);
            await User.findByIdAndUpdate(token.id, {$push:{favorites:req.body.auctionId}});
            console.log("Auction Id :", req.body.auctionId);
            // const auction  = await Auction.findOne({_id: req.body.auctionId})
            // await Auction.findByIdAndUpdate(req.body.auctionId, {isSold:true});
            // console.log("Auction :",auction);
            return res.status(200).json({message:"Auction Closed"});
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getLoggedUser : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt')
            return res.status(200).json(loggedUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    getLoggedUserWithNotes : async (req,res) => {
        const {userToken} = req.cookies
        if(!userToken){
            return res.status(400).json({message:'Token not found.'})
        }
        try {
            const token = jwt.verify(userToken, process.env.jwt)
            console.log('TOKEN : ', token);
            const loggedUser  =  await User.findById(token.id).select('-password -createdAt').populate('notes')
            return res.status(200).json(loggedUser)
        } catch (error) {
            res.status(400).json(error)
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
    
        try {
          // Check if the user exists
          const userFromDb = await User.findById(id);
          if (!userFromDb) {
            return res.status(404).json({ message: 'User not found.' });
          }
    
          // Update user details
          userFromDb.username = req.body.username;
          userFromDb.email = req.body.email;
          
          // Save the updated user
          const updatedUser = await userFromDb.save();
    
          res.status(200).json(updatedUser);
        } catch (error) {
          res.status(400).json(error.errors || error);
        }
      },
      getAllUserAuctions: async (req, res) => {
        try {
            // Assuming you have a user ID in the request parameters
            const userId = req.params.id;

            // Find the user by ID
            const user = await User.findById(userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User nottt found' });
            }

            // Get the user's auctions using the 'auctions' field
            const auctionIds = user.auctions;
            const userAuctions = await Auction.find({ _id: { $in: auctionIds } });
            console.log(auctionIds);

            const formattedAuctions = userAuctions.map(auction => ({
                _id: auction._id,
                title: auction.title,
                description: auction.description,
                image: auction.image,
                price:auction.price
                // Add more fields if needed
            }));

            res.json(formattedAuctions);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    getAllFavorites: async (req, res) => {
        try {
            // Assuming you have a user ID in the request parameters
            const userId = req.params.id;

            // Find the user by ID
            const user = await User.findById(userId);

            // Check if the user exists
            if (!user) {
                return res.status(404).json({ message: 'User nottt found' });
            }

            // Get the user's auctions using the 'auctions' field
            const auctionIds = user.favorites;
            const userAuctions = await Auction.find({ _id: { $in: auctionIds } });
            console.log(auctionIds);

            // Extract only the necessary details (title, description) from each auction
            const formattedAuctions = userAuctions.map(auction => ({
                _id: auction._id,
                title: auction.title,
                description: auction.description,
                image: auction.image,
                price: auction.price,
                // Add more fields if needed
            }));

            res.json(formattedAuctions);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
 
      getBoughtAuctions: async (req, res) => {
        const { userToken } = req.cookies;
    
        if (!userToken) {
          return res.status(400).json({ message: "Token not found." });
        }
    
        try {
          const token = jwt.verify(userToken, process.env.jwt);
          const loggedUser = await User.findById(token.id).select("auctions");
    
          if (!loggedUser) {
            return res.status(404).json({ message: "User not found." });
          }
    
          const boughtAuctions = await Auction.find({ _id: { $in: loggedUser.auctions } });
    
          return res.status(200).json(boughtAuctions);
        } catch (error) {
          res.status(400).json(error);
        }
      }
}





    // register : (req,res) => {
    //     User.create(req.body)
    //     .then(response => res.status(201).json({response}))
    //     .catch(error => res.status(400).json(error))
    // },

    // registerAdmin : (req,res) => {
    //     const userData = {...req.body, role:'admin'}
    //     User.create(userData)
    //     .then(response => res.status(201).json({response}))
    //     .catch(error => res.status(400).json(error))
    // },
    // ! Seeding data
    // login : (req,res) => {
    //     //  1 -  search user by email 
    //     //  -If user exist = > compare password with hashed password
    //     User.findOne({email:req.body.email}).then(response => res.status(200).json(response))
    //     .catch(error => res.status(400).json(error))
    //     // ! if user not found INVALID  EMAIL/ Password
    // }