const express = require("express");
const router = express.Router();
const videoController = require("../controllers/videoController");

// GET /api/videos/youtube?tag=AI&maxResults=12
router.get("/youtube", videoController.getYouTubeVideos);

// GET /api/videos/instagram?tag=python&count=9
router.get("/instagram", videoController.getInstagramReels);

// GET /api/videos/all?tag=AI&maxResults=12
router.get("/all", videoController.getAllVideos);

// GET /api/videos/tags  — returns popular tag list
router.get("/tags", videoController.getPopularTags);

module.exports = router;
