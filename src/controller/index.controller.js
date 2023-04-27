import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const createAuthor = async(req, res) => {
    try {
        const {name, bio} = req.body;
        const newUser = await prisma.author.create({ data: {name, bio }});
        if (!newUser) return res.status(400).json({statusCode: 400, message: "Something went wrong"});
        return res.status(200).json({statusCode: 200, message: "Author Created Successfully"});
    } catch(err) {
        return res.status(500).json({statusCode: 500, message: err.message});
    }
}


const allManga = async (_req, res) => {
    try {
        const manga = await prisma.manga.findMany({ where: { published: true }});
        if (!manga) return res.status(400).json({statusCode: 400, message: "Something went wrong"});
        return res.status(200).json({statusCode: 200, nbHits: manga.length, manga});
    } catch(err) {
        return res.status(500).json({statusCode: 500, message: err.message});
    }
}


const searchManga = async (req, res) => {
    // Return the searched query passed through the parameter
    return res.status(200).send("All search result here");
}

const createManga = async (req, res) => {
    try {
        const {title, description, content, pages, authorId} = req.body;
        const newManga = await prisma.manga.create({ data: { title, description, content, pages, authorId: authorId }});
        if (!newManga) return res.status(400).json({statusCode: 400, message: "Something went wrong"});
        return res.status(201).json({statusCode: 201, message: "Created Successfully", newManga}); 
    } catch(err) {
        return res.status(500).json({statusCode: 500, message: err.message});
    }
}

const updateManga = async (req, res) => {
    try {
        const {mangaId} = req.params;
        const {title, description, content, pages, published} = req.body;
        const doesExist = await prisma.manga.findUnique({ where: { id: mangaId }});
        if (!doesExist) return res.status(404).json({statusCode: 404, message: "The specified manga does not exist... Check Id and try again"});
        const updateManga = await prisma.manga.update({ 
            where: {id: mangaId },
            data: {
                title,
                description,
                content,
                pages,
                published
            }
        });
        if (!updateManga) return res.status(400).json({statusCode: 400, message: "Something went wrong somewhere"});
        return res.status(200).json({statusCode: 200, updateManga});
    } catch(err) {
        return res.status(500).json({statusCode: 500, message: err.message});
    }
}

const deleteManga = async (req, res) => {
    try {
        const {mangaId} = req.params;
        const doesExist = await prisma.manga.findUnique({ where: { id: mangaId }});
        if (!doesExist) return res.status(404).json({statusCode: 404, message: "The specified manga does not exist... Check Id and try again"});
        const removeManga = await prisma.manga.delete({where: {id: mangaId }});
        if (!removeManga) return res.status(400).json({statusCode: 400, message: "Something went wrong somewhere"});
        return res.status(200).json({statusCode: 200, message: `${doesExist.title} has been removed successfully`});
    } catch(err) {
        return res.status(500).json({statusCode: 500, message: err.message});
    }
}

export { allManga, searchManga, createManga, updateManga, deleteManga, createAuthor};