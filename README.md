# Weather Analysis and Prediction Platform

This project involves building an algorithmic processing and prediction platform for real-time weather data. The system leverages the "MeteoStat Open Source API" to fetch precise location data and weather parameters, conduct thorough analysis, and deliver accurate predictions regarding the likelihood of rainfall at any given coordinate across the globe.

**Disclaimer**: This Project is still under development phase and will require future updates.

## Project Structure

The project consists of an HTML/CSS/JS script (`index.html`) that utilizes the `meteostat` library for fetching historic weather data from the nearest WEATHER STATION and implements a model from `sklearn` to predict the amount of precipitation at a coordinate/location across the world. It also utilises a backend server created using nodeJs, ExpressJs to serve frontend queries and a `clean.py` file to remove the unneccessary files created during execution of the program.

## Installation

1. Clone the repository: https://github.com/xaman27x/Rainfall_Statistics_and_Analysis 
2. Run the Server Side Script: node server.js                                                            
3. Open the index.html in your local machine.                                                           

## Dependencies

Make sure to have the required dependencies installed in your Root Directory:

```bash
npm install express
npm install uuid
pip install -U scikit-learn
pip install meteostat
pip install pandas 
```

## Conclusion

The project concludes with a comprehensive analysis, including a determination of whether it will rain or not based on various parameters such as average temperature, wind direction, wind speed, and pressure above sea-level.

Happy coding, and may your predictions be close to the actual values!

NOTE: Feel free to modify the content based on your specific needs and add any additional details or instructions as necessary.
