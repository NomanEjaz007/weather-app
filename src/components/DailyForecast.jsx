import React from "react";
import { WiDaySunny, WiCloudy, WiDayThunderstorm } from "react-icons/wi";

const DailyForecast = ({ dailyData }) => {
  const getWeatherIcon = (weatherCode) => {
    const iconMapping = {
      200: WiDayThunderstorm,
      201: WiDayThunderstorm,
      801: WiCloudy,
      802: WiCloudy,
      803: WiCloudy,
      804: WiCloudy,
      800: WiDaySunny,
    };

    const defaultIcon = WiDaySunny;

    return iconMapping[weatherCode] || defaultIcon;
  };
  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "10px",
      }}
    >
      <h2 style={{ textAlign: "left", color: "#007BFF" }}>Next 5 days</h2>
      {dailyData?.map((day, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 0",
            borderTop: index ? "1px solid #eee" : "none",
          }}
        >
          {React.createElement(getWeatherIcon(day.weather[0].id), {
            size: 30,
            color: "#FFDD00",
          })}
          <div style={{ flex: 1, paddingLeft: "10px" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {formatDate(day.dt)}
            </div>
            <div style={{ fontSize: "14px" }}>{day.weather[0].description}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "16px", fontWeight: "bold" }}>
              {Math.round(day.temp.max)}°
            </div>
            <div style={{ fontSize: "14px" }}>{Math.round(day.temp.min)}°</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DailyForecast;
