function WeatherTab({ city, selectedCity, setSelectedCity }) {
  return (
    <button
      style={{
        borderBottom: selectedCity === city ? "2px solid red" : "",
        outline: "none",
        borderRadius: 0,
      }}
      onClick={() => setSelectedCity(city)}
    >
      {city.name}
    </button>
  );
}

export default WeatherTab;
