import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import { MapContainer } from 'react-leaflet/MapContainer';
import { TileLayer } from 'react-leaflet/TileLayer';

import queryString from "query-string";
import { Marker, Popup } from "react-leaflet";

function App() {

    const [ data, setData ] = useState();
    const [ city_data, setCity_data ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ station, setStation ] = useState("");
    const [ cookies, setCookies ] = useCookies();

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

    const parsed = queryString.parse(window.location.search);
    const id = parsed.id;
    const city = parsed.city;

    useEffect(() => {
        (async() => {
            const raw = await fetch("https://mamiyanonoka.pythonanywhere.com/api/104729/" + id).then(res => res.json());
            setData(raw);
            setLoading(false);

            const station_city = await fetch("https://mamiyanonoka.pythonanywhere.com/api/get/123").then(res => res.json());
            setCity_data(station_city);
        })();
    }, []);

    if(city_data === undefined){
        return(
            <>Loading...</>
        )
    }

    return (
        <>
            <Helmet>
                <html data-theme={cookies.color === "0" ? "dark" : "light"}></html>
            </Helmet>
            <div id="map" height="180px"></div>
            <div className="flex flex-col h-screen">
                <div className="navbar bg-base-100 sticky top-0 z-50">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-circle">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                            </label>
                            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                <li><a>Homepage</a></li>
                                <li><a>Portfolio</a></li>
                                <li><a>About</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="navbar-center">
                        <a className="btn btn-ghost normal-case text-xl" href="/">Weather Site</a>
                    </div>
                    <div className="navbar-end">
                        <button className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        </button>
                        <label className="swap swap-rotate">
                            <input type="checkbox" onClick={(() => {if(cookies.color === "0"){setCookies("color", "1")} else{setCookies("color", "0")}})} />
                            <svg className="swap-off fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
                            <svg className="swap-on fill-current w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
                        </label>
                    </div>
                </div>

                <div className="container mx-auto flex-grow">
                    <div className="overflow-x-auto text-center">
                        {
                            id === undefined ?
                                <div>
                                    <h1 className="p-5">Enter station ID to query weather information.</h1>
                                    {
                                        city !== undefined ?
                                            city_data !== undefined ?
                                                <>
                                                    {
                                                        Object.keys(city_data[city]).map((key) => {
                                                            return (
                                                                <>
                                                                    <button className="btn" onClick={(() => {window.location.href = window.location.origin + "?id=" + city_data[city][key]})}>{key}</button>
                                                                </>
                                                            )
                                                        })
                                                    }
                                                </> :
                                                <>
                                                    {/* city data undefined */}
                                                </> :
                                            <>
                                                {
                                                    Object.keys(city_data).map(key => {
                                                        return (
                                                            <>
                                                                <button className="btn" onClick={(() => {window.location.href = window.location.origin + "?city=" + key})}>{key}</button>
                                                            </>
                                                        )
                                                    })
                                                }
                                            </>
                                    }
                                    {/* <input type="text" placeholder="Station ID" className="input input-bordered w-1/2" onChange={((e) => {setStation(e.target.value)})} onKeyDown={(e) => {if(e.key === "Enter"){window.location.href = window.location.origin + "?id=" + station}}} /> <button className="btn" onClick={(() => {window.location.href += "?id=" + station})}>Query</button> */}
                                </div> :
                                loading === false ?
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
                                                    Object.keys(data).map((key, value) => {
                                                        return (
                                                            <tr key={Math.random()}>
                                                                <th>{value + 1}</th>
                                                                <td>{table[key]}</td>
                                                                <td>{data[key] === "-99" ? "N/A" : data[key]}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        <div className="flex items-center justify-center m-1">
                                            <MapContainer center={[data["latitude"], data["longitude"]]} zoom={11} scrollWheelZoom={false} style={{width: "95%", height: "300px"}}>
                                                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                                                <Marker position={[data["latitude"], data["longitude"]]}>
                                                    <Popup>
                                                        測站：{data["station"]}<br />
                                                        ID：{data["station_id"]}
                                                    </Popup>
                                                </Marker>
                                            </MapContainer>
                                        </div>
                                    </> :
                                    <p>Loading...</p>
                        }
                    </div>
                </div>
                <br />

                <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                    <div className="grid grid-flow-col gap-4">
                        <a className="link link-hover">About us</a> 
                        <a className="link link-hover">Contact</a> 
                        <a className="link link-hover">Jobs</a> 
                        <a className="link link-hover">Press kit</a>
                    </div> 
                    <div>
                        <div className="grid grid-flow-col gap-4">
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a> 
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a> 
                        <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        </div>
                    </div> 
                    <div>
                        <p>Copyright © 2022 - All right reserved by ACME Industries Ltd</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default App;