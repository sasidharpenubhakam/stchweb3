import express from 'express';
const router = express.Router();

// GET /api/v2/projects/:id
router.get('/:id', (req, res) => {
    const projectId = req.params.id;

    // Dummy response (replace with DB logic later)
    res.json({
        success: true,
        message: `Fetched project with ID: ${projectId}`,
        data: {
            id: projectId,
            title: "Sample Project",
            description: "This is a placeholder project description."
        }
    });
});

export default router;