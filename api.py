from datetime import datetime
from meteostat import Stations, Daily
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import pandas as pd
import sys

if len(sys.argv) < 4:
    print("Usage: python script.py latitude longitude uniqueId")
    sys.exit(1)

latitude = float(sys.argv[1])
longitude = float(sys.argv[2])
uniqueId = sys.argv[3]

stations = Stations()
stations = stations.nearby(latitude, longitude)
station = stations.fetch(1)

print(station)

start = datetime(2020, 1, 1)
end = datetime(2024, 1, 13)

data = Daily(station.index[0], start, end)
data = data.fetch()
print(data)


data.to_csv(f'daily_weather_data_{uniqueId}.txt', sep='\t')

model = LinearRegression()
X, y = data[['tavg', 'wdir', 'wspd', 'pres']], data['prcp']
X_train, x_test, y_train, y_test = train_test_split(X, y, test_size = 0.2)

model.fit(X_train, y_train);

with open(f"coefficients_{uniqueId}.txt", "w") as file:
    for i in range(0, 4):
        file.write(str(model.coef_[i]) + '\n')
    file.write(str(model.intercept_))




