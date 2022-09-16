import Map from "./Map";

function WeatherData(props){
    return (
        <>
            <table className="table table-zebra w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Data</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Object.keys(props["data"]).map((key, value) => {
                            return (
                                <tr key={Math.random()}>
                                    <th>{value + 1}</th>
                                    <td>{props["table"][key]}</td>
                                    <td>{props["data"][key] === "-99" ? "N/A" : props["data"][key]}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            <div className="flex items-center justify-center m-1">
                <Map latitude={props["data"]["latitude"]} longitude={props["data"]["longitude"]} station={props["data"]["station"]} station_id={props["data"]["station_id"]} />
            </div>
        </>
    )
}

export default WeatherData;