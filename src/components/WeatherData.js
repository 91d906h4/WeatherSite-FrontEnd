import Map from "./Map";

function WeatherData(props){
    const table = {
        "station": "測站",
        "station_id": "測站ID",
        "latitude": "緯度",
        "longitude": "經度",
        "latest_update_time": "最後更新時間",
        "status": "status",

        "ELEV": "高度(m)",
        "WDIR": "風向(度)", 
        "WDSD": "風速(m/s)",
        "TEMP": "溫度(°C)",
        "HUMD": "相對濕度(%)",
        "PRES": "測站氣壓(百帕)",
        "24R": "日累積雨量(mm)",
        "H_24R": "日累積雨量(mm)",
        "H_FX": "小時最大陣風風速(m/s)",
        "H_XD": "小時最大陣風風向(度)",
        "H_FXT": "小時最大陣風時間(小時分鐘)",
        "H_F10": "本時最大10分鐘平均風速(m/s)",
        "H_10D": "本時最大10分鐘平均風向(度)",
        "H_F10T": "本時最大10分鐘平均風速發生時間(小時分鐘)",
        "H_UVI": "小時紫外線指數",
        "D_TX": "本日最高溫(°C)",
        "D_TXT": "本日最高溫發生時間(小時分鐘)",
        "D_TN": "本日最低溫(°C)",
        "D_TNT": "本日最低溫發生時間(小時分鐘)",
        "D_TS": "本日總日照時數(hr)",
        "VIS": "十分鐘盛行能見度(km)",
        "Weather": "十分鐘天氣現象描述"
    }

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
                                    <td>{table[key]}</td>
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