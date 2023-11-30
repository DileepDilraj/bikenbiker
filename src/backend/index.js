const express = require('express');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

const cors = require('cors');
app.use(cors());

// Google Sheets setup
const sheets = google.sheets('v4');
const spreadsheetId = '1GVBAk5Lqq6ENYv9V4zaXDhgZFYRMsLJZfeb0X75cYbA'; // Replace with your Google Sheet ID

// Initialize Google Auth
const auth = new google.auth.GoogleAuth({
  keyFile: 'GCP [bikenbiker-6548069f053c].json', // Path to your JSON key file
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Endpoint to fetch products
app.get('/Inventory', async (req, res) => {
  try {
    const authClient = await auth.getClient();
    const response = await sheets.spreadsheets.values.get({
      auth: authClient,
      spreadsheetId,
      range: 'data!A2:E',
    });

    const rows = response.data.values;
    if (rows.length) {
      const products = rows.map((row) => ({
        id: row[0],
        title: row[1],
        description: row[2],
        imageUrl: row[3],
        price: row[4],
      }));

      res.json(products);
    } else {
      res.json([]);
    }
  } catch (error) {
    console.error('The API returned an error: ' + error);
    res.status(500).send('Error retrieving data: ' + error.message);
  }
});


 

 const translations = {
  en: {
    signIn: "Continue with Google",
    // ... other translations
  },
  hi: {
    signIn: "Google के साथ जारी रखें",
    // ... other translations
  },
  ru: {
    signIn: "Продолжить с Google",
    // ... other translations
  },
};
