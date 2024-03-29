import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow,
  WiSleet,
  WiWindy,
  WiFog,
  WiNightClear,
  WiDayThunderstorm,
  WiNightThunderstorm,
  WiDayShowers,
  WiNightShowers,
  // ... import other relevant icons
} from "react-icons/wi";

const HourlyForecast = ({ hourlyData }) => {
  const getWeatherIcon = (condition, isDayTime) => {
    let icon = WiDaySunny; // default icon
    condition = condition.toLowerCase();

    const iconMapping = {
      clear: isDayTime ? WiDaySunny : WiNightClear,
      clouds: WiCloudy,
      rain: WiRain,
      drizzle: WiDayShowers,
      thunderstorm: isDayTime ? WiDayThunderstorm : WiNightThunderstorm,
      snow: WiSnow,
      sleet: WiSleet,
      wind: WiWindy,
      fog: WiFog,
      // ... other mappings as necessary
    };

    if (iconMapping[condition]) {
      icon = iconMapping[condition];
    }

    return React.createElement(icon, { size: 50, color: "#000" });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2
        style={{
          color: "#007BFF",
          padding: "10px",
          fontWeight: "bold",
        }}
      >
        Next hours
      </h2>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "10px",
        }}
      >
        {hourlyData.map((hour, index) => (
          <div key={index} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "18px", fontWeight: "bold" }}>
              {hour.temp}°
            </div>
            {getWeatherIcon(hour.condition)}
            <div style={{ fontSize: "14px", color: "gray" }}>
              {hour.precipitation}%
            </div>
            <div style={{ fontSize: "14px", color: "gray" }}>{hour.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HourlyForecast;
