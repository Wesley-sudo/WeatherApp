const Forecast = ({ date, icon, iconName, temp }) => {
  return (
    <div className="forecast-component">
        <div className="date">{ date }</div>
        <img src={ icon } alt={ iconName } />
        <p className="temp">{ temp }</p>
    </div>
  );
};

export default Forecast;