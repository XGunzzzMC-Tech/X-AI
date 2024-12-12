const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Endpoint pihak ketiga
app.get('/api/gptlogic', async (req, res) => {
    try {
        const { text, prompt } = req.query;

        // Validasi input
        if (!text || !prompt) {
            return res.status(400).json({ error: 'Both "text" and "prompt" parameters are required.' });
        }

        // Permintaan ke API pihak ketiga
        const apiResponse = await axios.get(
            `https://restapii.rioooxdzz.web.id/api/gptlogic`,
// Middleware untuk parsing JSON
            {
                params: {
                    message: text,
                    prompt: prompt,
                },
            }
        );

        // Kirim respons API pihak ketiga ke klien
        res.json({
            success: true,
            creator: "XGunzzzMC",
            response: apiResponse.data.data.response, // Respons dari API pihak ketiga
        });
    } catch (error) {
        console.error('Error Details:', error.response?.data || error.message);
        res.status(500).json({ 
          success: false,
          creator: "XGunzzzMC",
          error: 'Failed to fetch response from the third-party API.' 
        });
    }
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/api/gptlogic`);
});
