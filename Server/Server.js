const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Import the Footer model
const FooterModel = require('./Model/FooterSchema');

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://akankshadinde:OWyn5on0Vtt2M18B@cluster0.55p6u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('MongoDB connection error:', err.message);
});

// POST route to add a new footer
app.post("/footer", async (req, res) => {
    const { icons, phoneNumber, email, address, texts } = req.body;
    try {
        console.log("Received footer data:", req.body); 
        const newFooter = new FooterModel({ icons, phoneNumber, email, address, texts });
        await newFooter.save();
        res.status(201).json(newFooter);
    } catch (error) {
        console.error("Error saving footer:", error.message);
        res.status(500).json({ error: "Failed to save footer" });
    }
});

// GET route to fetch all footers
app.get("/footer", async (req, res) => {
    try {
        const footers = await FooterModel.find();
        res.status(200).json(footers);
    } catch (error) {
        console.error("Error fetching footers:", error.message); 
        res.status(500).json({ error: "Failed to fetch footers" });
    }
});

// PUT route to update an existing footer by ID
app.put('/footer/:footerId', async (req, res) => {
    const { footerId } = req.params;
    const { icons, phoneNumber, email, address, texts } = req.body;

    try {
        const updatedFooter = await FooterModel.findByIdAndUpdate(
            footerId,
            { icons, phoneNumber, email, address, texts },
            { new: true }  // Return the updated document
        );

        if (!updatedFooter) {
            return res.status(404).json({ error: 'Footer not found' });
        }

        res.status(200).json(updatedFooter);
    } catch (error) {
        console.error("Error updating footer:", error.message);
        res.status(500).json({ error: "Failed to update footer" });
    }
});


// DELETE route to remove a footer by ID
app.delete('/footer/:footerId', async (req, res) => {
    const { footerId } = req.params;
    try {
        const result = await FooterModel.findByIdAndDelete(footerId);
        if (!result) {
            return res.status(404).json({ error: 'Footer not found' });
        }
        res.status(200).json({ message: 'Footer deleted successfully' });
    } catch (error) {
        console.error("Error deleting footer:", error.message);
        res.status(500).json({ error: "Failed to delete footer" });
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
