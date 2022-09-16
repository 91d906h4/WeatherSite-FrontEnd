import Onloading from "./Onloading";
import WeatherData from "./WeatherData";

function CityStation(props){
    console.log(props);
    if(props["loading"] === true){
        return <Onloading />;
    }
    else if(props["data"]["status"] === "error" && props["id"] !== undefined) return (
        <div>
            Error ! This station is now unavailable. (Station ID : {props["id"]})
        </div>
    )
    else if(props["id"] !== undefined){
        return <WeatherData data={props["data"]} table={props["table"]} />;
    }
    else if(props["city"] !== undefined) return (
        <>{
            Object.keys(props["city_data"][props["city"]]).map((key) => {
                return (
                    <span key={Math.random()}>
                        <button className="btn m-2 btn-info" onClick={(() => {window.location.href = window.location.origin + "?id=" + props["city_data"][props["city"]][key]})}>{key}</button>
                    </span>
                )
            })
        }</>
    )
    else if(props["city_data"] !== undefined) return (
        <>{
            Object.keys(props["city_data"]).map(key => {
                return (
                    <span key={Math.random()}>
                        <button className="btn btn-wide m-2 btn-warning" onClick={(() => {window.location.href = window.location.origin + "?city=" + key})}>{key}</button>
                    </span>
                )
            })
        }</>
    )
}

export default CityStation;