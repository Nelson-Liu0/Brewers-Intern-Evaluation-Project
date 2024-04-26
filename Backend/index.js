const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors()); // Enable CORS before running functions

app.get('/api/teams', async (req, res) => {
    try {
        const response = await axios.get('http://brew-roster-svc.us-e2.cloudhub.io/api/teams', {
            headers: {
                'api-key': '0ca80ddc-63f6-476e-b548-e5fb0934fc4b'
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});