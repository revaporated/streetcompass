const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = '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';

app.post('/api/generate-itinerary', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.anthropic.com/v1/messages',
      {
        model: 'claude-3-sonnet-20240229',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: req.body.prompt
        }]
      },
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate itinerary' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});