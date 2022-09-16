import WeatherData from "./WeatherData";

function CityStation(props){
    console.log(props);
    if(props["data"]["status"] === "error" && props["id"] !== undefined) return (
        <>error</>
    )
    else if(props["id"] !== undefined) return <WeatherData data={props["data"]} table={props["table"]} />
    else if(props["city"] !== undefined) return (
        <>{
            Object.keys(props["city_data"][props["city"]]).map((key) => {
                return (
                    <>
                        <button className="btn" onClick={(() => {window.location.href = window.location.origin + "?id=" + props["city_data"][props["city"]][key]})}>{key}</button>
                    </>
                )
            })
        }</>
    )
    else if(props["city_data"] !== undefined) return (
        <>{
            Object.keys(props["city_data"]).map(key => {
                return (
                    <>
                        <button className="btn" onClick={(() => {window.location.href = window.location.origin + "?city=" + key})}>{key}</button>
                    </>
                )
            })
        }</>
    )
}

export default CityStation;