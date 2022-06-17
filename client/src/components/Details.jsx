const Details = ({ windDir, windDeg, windKph, humidity, gustKph, cloud }) => {
    return (
      <div className="details-component">
          <div className="left-half">
            <div className="info">Wind Direction: { windDir }</div>
            <div className="info">Wind Degrees: { windDeg }°</div>
          </div>
          <div className="center">
            <div className="info">Cloud Height: { cloud } km</div>
            <div className="info">Humidity: { humidity }%</div>
          </div>
          <div className="right-half">
            <div className="info">Gust Speed: { gustKph } kph</div>
            <div className="info">Wind Speed: { windKph } kph</div>
          </div>
      </div>
    );
  };
  
  export default Details;