import { useCookies } from "react-cookie";
import { Helmet } from "react-helmet";
import CityStation from "./components/CityStation";

function App() {
    const [ cookies, setCookies ] = useCookies();

    return (
        <CityStation />
    );
}

export default App;