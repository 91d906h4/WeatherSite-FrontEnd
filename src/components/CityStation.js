import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Onloading from "./Onloading";
import WeatherData from "./WeatherData";
import queryString from "query-string";
import ImageMap from "image-map"; // https://www.npmjs.com/package/image-map

function CityStation(){
    const [ data, setData ] = useState();
    const [ city_data, setCity_data ] = useState();
    const [ loading, setLoading ] = useState(true);
    const [ cookie, setCookie ] = useCookies();

    // Parse URL
    const parsed = queryString.parse(window.location.search);
    const id = parsed.id;
    const city = parsed.city;

    useEffect(() => {
        (async() => {
            const raw = await fetch("https://mamiyanonoka.pythonanywhere.com/api/104729/" + id).then(res => res.json());
            setData(raw);

            const station_city = await fetch("https://mamiyanonoka.pythonanywhere.com/api/get/123").then(res => res.json());
            setCity_data(station_city);
                
            setLoading(false);
        })();
    }, []);

    function loaded(){
        ImageMap('img[usemap]');
        setTimeout(() => ImageMap('img[usemap]'), 1000); // Call ImageMap function after rendering.
    }

    if(loading === true){
        return (
            <>
                <Onloading />
            </>
        );
    }
    else if(data["status"] === "error" && id !== undefined) return (
        <div>
            Error ! This station is now unavailable. (Station ID : {id})
        </div>
    )
    else if(id !== undefined){
        return <WeatherData data={data} />;
    }
    else if(city !== undefined) return (
        <>{
            Object.keys(city_data[city]).map((key) => {
                return (
                    <span key={Math.random()}>
                        <button className="btn m-2 btn-info" onClick={(() => {window.location.href = window.location.origin + "?id=" + city_data[city][key]})}>{key}</button>
                    </span>
                )
            })
        }</>
    )
    else if(city_data !== undefined) return (
        <div className="flex justify-center">
            {/* {
                Object.keys(city_data).map(key => {
                    return (
                        <span key={Math.random()}>
                            <button className="btn btn-wide m-2 btn-warning" onClick={(() => {window.location.href = window.location.origin + "?city=" + key})}>{key}</button>
                        </span>
                    )
                })
            } */}

            {/* clickable map : https://www.image-map.net/ */}
            <img src="taiwan.jpg" useMap="#map" onLoad={(() => loaded())} />
            <map name="map">
                <area target="" alt="" title="" href="?city=臺南市" coords="378,978,415,993,449,964,473,946,513,941,524,968,533,986,542,1020,583,1027,576,1044,562,1065,544,1086,517,1108,493,1145,470,1161,448,1161,415,1153,401,1153,390,1126,379,1115,369,1106,356,1099,346,1087,357,1065,357,1051,354,1035,368,1013,375,990" shape="poly" />
                <area target="" alt="" title="" href="?city=高雄市" coords="733,914,681,942,651,966,621,991,598,994,604,1017,589,1044,574,1065,559,1094,537,1116,506,1148,502,1164,488,1168,467,1174,449,1177,434,1176,427,1175,414,1171,402,1168,407,1177,411,1186,414,1203,419,1219,424,1234,430,1244,436,1257,437,1267,432,1275,430,1286,436,1293,445,1308,449,1315,455,1328,466,1336,479,1345,485,1352,490,1335,499,1333,504,1319,502,1310,500,1301,500,1291,501,1277,506,1260,509,1245,511,1216,515,1203,520,1191,536,1194,553,1198,568,1185,596,1171,611,1179,627,1173,641,1179,651,1188,666,1186,681,1185,673,1173,668,1164,665,1154,664,1138,665,1132,677,1126,682,1117,689,1102,692,1085,693,1074,691,1060,692,1049,697,1045,704,1036,701,1022,702,1016,710,1008,719,999,732,993,747,985,755,981,760,974,751,972,745,964,737,952,740,943,748,939,751,931,746,927,725,918,735,922,704,927" shape="poly" />
                <area target="" alt="" title="" href="?city=屏東縣" coords="528,1205,520,1222,519,1250,513,1273,508,1287,515,1304,508,1320,506,1340,508,1357,517,1367,530,1381,550,1392,570,1406,584,1423,595,1437,598,1457,604,1469,613,1481,616,1496,622,1510,626,1529,629,1541,627,1549,624,1558,620,1567,620,1581,627,1591,628,1599,629,1609,629,1617,637,1601,644,1595,655,1601,662,1606,670,1609,677,1617,674,1594,681,1581,690,1573,695,1565,694,1557,694,1549,694,1538,694,1532,694,1521,694,1510,693,1502,692,1496,692,1486,687,1480,680,1479,670,1475,661,1469,643,1442,646,1432,633,1424,633,1414,634,1405,638,1392,644,1384,637,1373,630,1364,633,1355,634,1344,627,1335,626,1325,629,1314,629,1303,636,1292,642,1283,644,1272,654,1255,665,1257,677,1250,686,1248,693,1238,694,1231,690,1223,687,1217,684,1210,678,1201,669,1196,666,1201,657,1203,647,1200,640,1195,629,1189,621,1187,616,1194,605,1198,597,1186,586,1189,575,1194,567,1203,553,1207,545,1207" shape="poly" />
                <area target="" alt="" title="" href="?city=臺東縣" coords="763,991,744,999,733,1005,725,1011,719,1016,716,1022,711,1032,711,1038,705,1050,702,1056,701,1064,700,1078,698,1094,698,1104,697,1118,687,1123,684,1134,686,1141,683,1156,683,1167,691,1174,697,1181,696,1192,698,1201,705,1212,707,1222,708,1231,705,1246,701,1255,687,1259,679,1269,668,1275,659,1280,652,1292,651,1302,643,1311,646,1323,638,1330,646,1340,649,1348,643,1362,647,1372,655,1377,657,1383,659,1390,651,1392,646,1409,652,1417,659,1425,662,1435,664,1442,666,1448,673,1454,683,1469,694,1464,690,1450,686,1427,694,1418,700,1410,704,1396,709,1381,716,1369,719,1347,726,1338,731,1324,736,1311,744,1301,747,1287,752,1272,767,1263,779,1255,794,1248,808,1237,814,1230,817,1221,822,1211,820,1202,818,1192,835,1178,847,1166,855,1153,868,1134,873,1123,877,1107,885,1095,891,1083,900,1072,910,1063,908,1053,908,1044,908,1029,914,1013,922,998,925,985,931,976,938,968,942,957,942,946,948,933,941,923,936,928,926,936,922,945,922,951,923,962,919,975,912,984,906,992,904,1001,896,1009,893,1020,890,1032,886,1040,885,1050,884,1058,879,1065,872,1072,861,1076,851,1078,846,1069,841,1063,835,1057,830,1052,826,1043,822,1037,805,1038,797,1030,785,1030,775,1020,769,1011,768,1004,763,999,755,998" shape="poly" />
                <area target="" alt="" title="" href="?city=花蓮縣" coords="768,927,761,936,761,944,753,952,752,960,767,972,773,982,773,992,780,1004,787,1014,803,1021,810,1031,820,1028,833,1036,839,1051,847,1061,860,1070,872,1070,873,1061,874,1051,881,1040,889,1025,895,1008,900,994,910,969,914,964,914,953,916,943,923,930,931,922,947,921,952,923,952,910,955,899,955,880,958,867,965,848,968,830,973,813,975,799,980,783,983,771,985,753,991,738,995,716,995,703,998,688,1001,676,1006,669,1011,659,1002,644,1004,633,1005,621,1012,612,1019,602,1020,593,1015,587,1018,577,1028,570,1038,557,1050,546,1062,528,1044,523,1032,515,1022,512,1008,513,1008,519,993,522,979,521,965,517,949,514,944,510,932,514,931,523,923,531,913,536,912,545,904,551,904,560,896,568,894,579,881,582,874,592,879,604,884,611,891,619,886,623,879,635,874,643,872,650,867,660,862,670,863,685,866,690,867,696,858,708,863,713,862,722,854,725,849,737,850,753,846,762,841,766,850,779,850,799,849,819,841,839,838,853,819,858,816,875,804,884,788,895,773,896,773,908,772,920" shape="poly" />
                <area target="" alt="" title="" href="?city=宜蘭縣" coords="1134,216,1121,224,1110,225,1105,231,1104,237,1098,246,1088,250,1079,260,1074,269,1067,275,1055,279,1040,287,1035,292,1021,298,1014,298,1007,303,999,318,1000,327,993,334,982,345,968,352,955,360,942,363,932,374,930,385,917,398,922,407,919,418,910,432,904,443,893,457,887,469,896,479,906,488,917,484,933,488,942,493,956,501,976,502,990,510,1000,502,1012,496,1030,497,1042,504,1057,511,1066,511,1069,495,1075,475,1084,457,1095,442,1104,437,1095,428,1101,419,1109,414,1109,401,1102,391,1099,375,1093,356,1092,341,1089,329,1085,314,1084,303,1083,278,1088,263,1095,254,1110,237" shape="poly" />
                <area target="" alt="" title="" href="?city=基隆市" coords="1039,126,1035,131,1026,137,1017,137,1026,146,1030,152,1030,160,1020,154,1038,161,1044,166,1056,171,1064,170,1064,146,1078,140,1080,134,1071,133,1065,136,1056,142,1050,135" shape="poly" />
                <area target="" alt="" title="" href="?city=桃園市" coords="858,154,841,156,822,165,804,174,785,175,778,182,767,194,756,206,754,216,765,225,780,237,784,247,797,248,811,258,817,267,818,274,828,282,838,288,852,291,864,304,874,315,879,326,881,336,894,351,899,371,905,378,910,385,917,375,925,369,929,361,937,353,939,347,934,340,923,334,921,323,923,304,923,294,912,287,904,284,889,284,879,274,884,264,876,247,877,236,876,226,876,215,881,207,895,207,903,198,907,191,908,182,895,177,880,167,872,161" shape="poly" />
                <area target="" alt="" title="" href="?city=新竹縣" coords="738,234,735,248,731,259,726,269,747,277,762,295,761,310,761,320,750,318,738,314,730,329,739,334,742,346,748,355,756,362,766,368,780,379,782,386,783,400,781,407,782,415,782,423,796,425,810,426,826,424,841,425,845,433,851,439,858,453,867,461,873,457,875,448,879,441,898,433,901,422,906,415,905,401,908,394,901,391,894,384,889,374,889,359,881,355,875,348,867,344,866,333,866,321,862,313,855,309,843,299,822,289,815,282,802,276,802,268,804,261,793,260,785,258,778,250,768,249,766,239,758,232" shape="poly" />
                <area target="" alt="" title="" href="?city=新竹市" coords="717,277,728,284,744,290,752,301,752,310,739,307,727,308,723,316,716,323,708,328,703,320,707,308,709,299,710,289,710,283" shape="poly" />
                <area target="" alt="" title="" href="?city=苗栗縣" coords="694,333,689,343,689,355,683,367,670,364,657,366,648,377,648,384,642,389,634,393,626,402,619,416,615,431,604,449,596,459,598,471,609,477,626,496,641,502,659,515,677,523,700,525,710,524,710,514,713,499,740,506,762,523,769,513,782,510,795,501,807,494,816,488,825,480,838,477,845,470,849,458,840,448,840,439,830,434,810,433,801,434,784,440,766,429,766,418,768,410,770,399,770,386,762,380,747,371,739,363,728,353,719,342,708,337" shape="poly" />
                <area target="" alt="" title="" href="?city=臺中市" coords="586,468,579,487,568,505,559,514,555,524,544,529,549,542,540,554,535,567,539,574,547,586,554,598,569,607,581,611,588,623,592,635,598,648,622,653,639,660,647,646,658,631,669,626,669,614,683,602,704,610,714,605,730,597,737,600,748,591,764,586,774,580,787,570,798,563,811,560,835,554,850,551,862,544,878,548,890,556,890,541,905,534,911,522,921,513,927,503,927,494,913,498,903,494,891,487,880,477,877,466,868,469,854,473,851,480,842,489,824,493,811,503,801,507,790,518,773,523,758,526,749,519,741,515,720,511,712,527,687,531,675,532,660,521,644,522,629,513,630,504,609,497,604,484,596,479" shape="poly" />
                <area target="" alt="" title="" href="?city=彰化縣" coords="532,578,524,586,516,594,509,603,507,612,505,623,499,630,492,639,485,645,477,656,472,665,467,680,459,698,453,709,443,723,436,733,451,737,464,739,478,735,502,736,521,740,527,748,544,750,567,750,588,752,598,756,586,746,585,737,583,729,584,719,588,707,587,697,587,685,587,672,589,665,590,658,601,654,577,648,579,638,578,626,565,619,554,615,541,605,537,596,537,589" shape="poly" />
                <area target="" alt="" title="" href="?city=雲林縣" coords="419,742,411,754,407,767,404,781,394,791,397,809,390,818,382,839,380,851,391,879,407,878,416,880,419,870,434,867,445,858,456,850,466,843,477,837,487,827,501,827,517,828,532,824,542,832,547,833,565,845,578,848,595,851,551,842,607,853,618,852,625,846,620,839,614,844,601,843,593,839,587,831,586,824,588,815,590,806,589,798,589,788,589,779,586,769,582,762,572,757,555,754,543,756,527,756,522,747,508,744,484,742,464,746,444,745,434,742" shape="poly" />
                <area target="" alt="" title="" href="?city=嘉義縣" coords="498,896,504,888,511,892,522,897,530,903,528,914,514,914,507,920,499,911,492,905,490,898" shape="poly" />
                <area target="" alt="" title="" href="?city=南投縣" coords="886,564,862,563,847,566,833,570,813,574,802,579,787,583,772,593,757,602,739,610,716,614,697,618,682,615,678,631,667,637,652,655,648,664,632,667,611,665,595,662,598,675,594,702,590,720,590,733,595,741,608,746,614,754,609,762,599,769,601,782,600,790,599,803,600,815,601,827,617,828,631,828,644,832,657,844,668,845,674,858,671,876,678,892,686,896,701,901,713,896,732,904,750,906,758,911,767,914,771,891,793,881,803,882,806,864,809,846,827,847,840,834,841,814,842,801,844,793,838,787,835,773,830,764,843,749,843,722,851,716,855,705,854,694,853,680,853,664,853,652,859,645,867,634,871,620,876,616,864,609,861,585,871,576" shape="poly" />
                <area target="" alt="" title="" href="?city=連江縣" coords="80,187,111,137,363,92,295,255,108,295,89,283,73,206" shape="poly" />
                <area target="" alt="" title="" href="?city=金門縣" coords="179,404,188,441,183,458,168,460,155,455,146,444,139,454,122,461,111,470,78,492,117,486,142,487,151,492,166,479,178,471,199,478,211,479,218,467,216,456,320,409,280,359,181,356" shape="poly" />
                <area target="" alt="" title="" href="?city=澎湖縣" coords="159,771,131,810,114,826,102,858,89,878,31,936,78,1027,118,999,181,1004,185,925,190,893,189,879,185,863,184,848,178,814" shape="poly" />
                <area target="" alt="" title="" href="?city=臺北市" coords="979,111,973,121,965,128,951,133,945,145,955,156,961,164,961,175,956,184,957,192,972,192,973,199,980,206,987,210,995,216,989,200,987,189,997,188,1007,188,999,179,999,168,1000,159,991,149,989,140,989,132,986,124" shape="poly" />
                <area target="" alt="" title="" href="?city=新北市" coords="965,78,975,107,955,124,945,134,936,148,946,156,952,162,953,175,948,191,952,202,963,202,977,218,995,220,1008,223,1011,214,1003,202,1009,195,1025,200,1031,192,1023,189,1016,179,1006,166,1013,159,1010,149,1003,147,1000,130,996,122,996,115,988,111,973,104,967,75,982,72,1000,72,1008,84,1017,97,1022,106,1031,112,1031,119,1016,125,1008,137,1025,158,1040,173,1066,180,1072,179,1077,170,1072,162,1081,153,1098,147,1110,146,1130,146,1126,163,1130,180,1146,189,1152,192,1156,200,1137,207,1116,215,1099,232,1083,241,1067,256,1056,262,1038,276,1010,286,986,312,983,327,971,339,957,342,947,342,930,331,930,319,934,313,935,302,932,294,927,285,920,279,909,272,903,272,896,269,896,259,893,250,890,237,890,231,887,224,903,217,920,210,920,199,921,188,918,180,915,175,910,168,897,164,890,157,880,155,872,149,892,146,918,132,920,124,925,112,929,101,936,94,947,86,954,78,965,78" shape="poly" />
                <area target="" alt="" title="" href="?city=嘉義市" coords="503,837,505,881,492,889,479,895,484,906,492,915,499,920,514,920,523,920,532,916,535,909,535,903,526,893,505,878,505,842,529,836,540,844,549,853,562,856,580,861,591,863,600,864,612,865,624,865,633,850,645,847,654,850,662,855,663,864,662,878,663,889,667,899,668,907,682,909,700,911,697,916,686,920,676,933,673,940,663,947,656,950,647,958,641,968,632,971,627,978,620,981,611,987,592,987,590,1002,589,1014,578,1013,561,1012,549,1015,549,1005,548,994,545,984,551,971,548,964,540,964,537,956,534,947,529,941,519,936,508,932,487,932,474,933,460,938,446,948,436,956,425,965,418,975,406,981,395,977,382,974,378,967,381,958,389,948,389,933,389,925,389,916,388,909,385,904,376,891,401,892,419,893,426,884,437,879,450,871,460,863,468,852,480,845,491,837" shape="poly" />
            </map>
        </div>
    )
}

export default CityStation;