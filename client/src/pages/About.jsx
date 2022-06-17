import Interface from "../img/WeatherAppInterface.png";
import Section1 from "../img/Section1.png";
import Section2 from "../img/Section2.png";

const About = () => {

    return (
        <div className="about">
            <div className="section1">
                <h2>About Weather App</h2>
                <p>This <strong>Weather App</strong> allows the user to check on the current weather in their location. The app has a <b>Log In</b> and <b>Sign up</b> system together with cookies to make sure it's easier for the user to just search for this web app and no longer needs to type in the location everytime.</p>
                <h3>Interface</h3>
                <div className="img1"><img src={ Interface } alt="Weather App Interface" /></div>
                <p>The interface of the Weather App consists of the <b>navigation bar</b> on top with the <b>app logo</b> on the upper left that when <b>clicked</b> will redirect the user back to the home page. And the main <b>Weather Card</b> on the middle, the weather card has <b>three sections</b>.</p>
            </div>
            <div className="section2">
                <div className="first-part">
                    <div>
                        <div className="part-title"><b>Section 1:</b> User Location, Today's Date, and Weather</div>
                        <p>On the right is an <b>Image</b> to help visualize the parts of section 1.</p>
                    </div>
                    <div className="img2"><img src={ Section1 } alt="Section1" /></div>
                </div>
                <div className="second-part">
                    <div className="img3"><img src={ Section2 } alt="Section2" /></div>
                    <div>
                        <div className="part-title"><b>Section 2:</b> Today's Temperature with min and max below</div>
                        <p>On the left is an <b>Image</b> to help visualize the parts of section 2.</p>
                    </div>
                </div>
                <div>Section 3: Hourly, Daily and Details Information</div>
            </div>
        </div>
      );
}

export default About;