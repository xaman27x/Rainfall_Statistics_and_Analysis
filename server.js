const express = require('express');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 3000;

const sharedData = {
  currentUniqueId: null,
};


app.use(express.static('public'));

app.get('/run-python-script', (req, res) => {
        
  const { latitude, longitude } = req.query;
  const uniqueId = uuidv4();
  sharedData.currentUniqueId = uniqueId;
  
  exec(`python api.py ${latitude} ${longitude} ${uniqueId}`, (error, stdout, stderr) => {
    if (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (stderr) {
      console.error('stderr:', stderr);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    console.log('stdout:', stdout);
    res.json({ message: 'Script executed successfully' });
  });
});

app.get('/run-new-script', (req, res) => {
  const fs = require("fs");
  const filename = `daily_weather_data_${sharedData.currentUniqueId}.txt`; 
  const filename2 = `coefficients_${sharedData.currentUniqueId}.txt`;

  fs.readFile(filename2, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    
    const coefficients = data.split("\n").map(parseFloat);
 
    const { tavg, wdir, wspd, pres } = req.query;
    
    const predicted_rainfall = tavg * coefficients[0] + wdir * coefficients[1] + wspd * coefficients[2] + pres * coefficients[3] + coefficients[4];
    console.log(predicted_rainfall);

    res.json({ predicted_rainfall });

    exec(`python clean.py ${filename} ${filename2}`, (error, stdout, stderr) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error during cleanup' });
        return;
      }

      if (stderr) {
        console.error('stderr:', stderr);
        res.status(500).json({ error: 'Internal Server Error during cleanup' });
        return;
      }

      console.log('stdout:', stdout);
      console.log('Script executed successfully');
    });
  });
});


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
