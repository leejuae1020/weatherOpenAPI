const API_KEY =
  "4d%2FCaHaU%2FxcWl7YFHP1gCuadQb%2BsEZ1N8GxHC15vlhiBeBSeABac3Gy6ZXaPLW%2B4foo%2BlGCypZ83VqolaPjjPg%3D%3D";

function getFormattedDate() {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");

  const formattedDate = `${year}${month}${day}`;

  return formattedDate;
}

const formattedDate = getFormattedDate();

const hours = ("0" + new Date().getHours()).slice(-2) + "00";
console.log("시간", hours);

async function getWeather() {
  const url = `http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?ServiceKey=${API_KEY}&pageNo=1&numOfRows=15&dataType=json&base_date=${formattedDate}&base_time=${hours}&nx=61&ny=120`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    updateWeatherInfo(data.response.body.items.item);
    console.log("수원시날씨", data);
    console.log("formattedDate", formattedDate);
  } catch (error) {
    console.error("Failed to fetch weather data", error);
  }
}

function updateWeatherInfo(weatherItems) {
  let temp = "";
  let sky = "";
  let rainType = "";

  weatherItems.forEach((item) => {
    switch (item.category) {
      case "TMP":
        temp = item.fcstValue + "°C <br><span class='large-emoji'>🌡️</span>";

        break;
      case "SKY":
        sky = translateSkyCondition(item.fcstValue);
        break;
      case "PTY":
        rainType = translateRainType(item.fcstValue);
        break;
    }
  });

  document.getElementById("temp").innerHTML = temp;
  document.getElementById("sky").innerHTML = sky;
  document.getElementById("rainType").innerHTML = rainType;
}

function translateSkyCondition(value) {
  switch (value) {
    case "1":
      return "맑음<br> <span class='large-emoji'>☀️</span>";
    case "3":
      return "구름많음<br> <span class='large-emoji'> ☁️☁️</span>";
    case "4":
      return "흐림<br> <span class='large-emoji'>☁️</span>";
    default:
      return "정보 없음";
  }
}

function translateRainType(value) {
  switch (value) {
    case "0":
      return "없음 <br> <span class='large-emoji'>❌</span>";
    case "1":
      return "비<br> <span class='large-emoji'>☔️</span>";

    case "2":
      return "비/눈<br> <span class='large-emoji'>☔️ &nbsp ☃️</span>";

    case "3":
      return "눈<br> <span class='large-emoji'>❄️</span>";

    case "4":
      return "소나기<br> <span class='large-emoji'>🌧️</span>";

    default:
      return "정보 없음";
  }
}

getWeather();
