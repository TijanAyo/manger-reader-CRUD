import express from "express";
const router = express.Router();

import {allManga,
    searchManga,
    createManga,
    deleteManga,
    updateManga,
    createAuthor
} from "../controller/index.controller.js";


router.get("/home", allManga);
router.get("/search", searchManga);
router.post("/new", createManga);
router.delete("/remove/:mangaId", deleteManga);
router.patch("/update/:mangaId", updateManga);
router.post("/new-creator", createAuthor);

export default router;