
      // server.js
      // import express from 'express';
      // import bodyParser from 'body-parser';
      // import admin from 'firebase-admin';

      const express = require('express');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
      
      const app = express();
      app.use(bodyParser.json());

      const serviceAccount = require('./citizen-report-solution-app-firebase-adminsdk-ahk08-493b3d996a.json'); // Downloaded from Firebase

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
      
      // admin.initializeApp({
      //   credential: admin.credential.cert({
      //     type: "service_account",
      //     project_id: "citizen-report-solution-app",
      //     private_key_id: "<your-private-key-id>",
      //     private_key: "<your-private-key>".replace(/\\n/g, '\n'),
      //     client_email: "<your-client-email>",
      //     client_id: "<your-client-id>",
      //     auth_uri: "https://accounts.google.com/o/oauth2/auth",
      //     token_uri: "https://oauth2.googleapis.com/token",
      //     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      //     client_x509_cert_url: "<your-client-x509-cert-url>"
      //   })
      // });

      app.get('/', (req, res) => {
        res.send('Server is running and ready to accept requests.');
      });
      
      app.post('/notify', async (req, res) => {
        const { token, title, body } = req.body;
      
        const message = {
          notification: { title, body },
          token,
        };
      
        try {
          const response = await admin.messaging().send(message);
          res.status(200).send({ success: true, response });
        } catch (error) {
          res.status(500).send({ success: false, error: error.message });
        }
      });
      
      const PORT = process.env.PORT || 3000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });