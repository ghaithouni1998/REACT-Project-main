const AuctionsController = require("../controllers/auction.controller");

module.exports = (app) => {
    app.post("/api/auctions/admin/new", AuctionsController.createNewAuction);
    app.get("/api/auctions/admin", AuctionsController.findAllAuctions);
    app.get("/api/auctions/upcoming", AuctionsController.findAllUpcomingAuctions);
    app.get("/api/auctions/notsold", AuctionsController.findNotSoldAuctions);
    app.get("/api/auctions/:id", AuctionsController.findOneSingleAuction);
    app.put("/api/auctions/edit/:id", AuctionsController.updateExistingAuction);
    app.delete("/api/auctions/delete/:id", AuctionsController.deleteAnExistingAuction);
    app.put("/api/auctions/buy/:id/:price", AuctionsController.markAuctionAsSold);
};
