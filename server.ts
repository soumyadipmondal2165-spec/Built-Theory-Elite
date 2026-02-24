import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer for file uploads (memory storage for simplicity in this demo)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit to allow testing the 35MB logic
});

// --- Backend Logic (Simulating Cloudflare Worker) ---

const MAX_FREE_SIZE = 35 * 1024 * 1024; // 35MB

app.post('/api/worker', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    const action = req.body.action;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Constraint 1: Tiered Access
    if (file.size > MAX_FREE_SIZE) {
      return res.status(402).json({ 
        error: 'Pro Upgrade Required', 
        message: 'File size exceeds the 35MB limit for free users.',
        upgradeUrl: '/pricing' 
      });
    }

    // Constraint 2: Universal API Engine (Simulation)
    // In a real Cloudflare Worker, this would call CloudConvert.
    // Here we simulate the processing delay and return a dummy file.
    
    console.log(`Processing ${action} for file: ${file.originalname} (${file.size} bytes)`);

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Return a dummy PDF or the original file content for demo
    // For "merge", we might just return the file back.
    // For converters, we'd ideally convert, but we can't easily do that in Node without libraries.
    // We'll return a text file saying it was processed, or just the original file with a new name.

    const processedFileName = `processed_${file.originalname}`;
    
    res.setHeader('Content-Type', file.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename="${processedFileName}"`);
    res.send(file.buffer);

  } catch (error) {
    console.error('Worker Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// --- End Backend Logic ---

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving (if needed)
    app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
