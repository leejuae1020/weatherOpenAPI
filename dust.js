/*통신-미세먼지*/

//년월일
function dustGetFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const dustFormattedDate = dustGetFormattedDate();
// console.log("미세먼지용 날짜", dustFormattedDate);

async function getDust() {
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=경기&pageNo=1&numOfRows=100&returnType=json&serviceKey=${API_KEY}&ver=1.0`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    updateDustInfo(data.response.body.items);
    updateDust25Info(data.response.body.items);

    console.log(
      "인계동 미세먼지",
      data.response.body.items.find((item) => item.stationName === "인계동")
    );
  } catch (error) {
    console.error("Fine dust communication failure", error);
  }
}

function gradeToQuality(grade) {
  switch (grade) {
    case "1":
      return "<span class='large-emoji'>😍</span>";
    case "2":
      return "<span class='large-emoji'>😗</span>";
    case "3":
      return "<span class='large-emoji'>☹️</span>";
    case "4":
      return "<span class='large-emoji'>😡</span>";
    default:
      return "Unknown";
  }
}

// 미세먼지 정보 업데이트
function updateDustInfo(dustItems) {
  let pm10Text = "";

  dustItems.forEach((item) => {
    if (item.stationName === "인계동") {
      const quality = gradeToQuality(item.pm10Grade);
      pm10Text = `${item.pm10Value}㎍/㎥ <br> ${quality}`;
    }
  });

  document.getElementById("pm10").innerHTML = pm10Text; // Corrected getItemById to getElementById
}

// 초미세먼지 정보 업데이트
function updateDust25Info(dustItems) {
  let pm25Text = "";

  dustItems.forEach((item) => {
    if (item.stationName === "인계동") {
      const quality = gradeToQuality(item.pm25Grade);
      pm25Text = `${item.pm25Value}㎍/㎥ <br>${quality}`;
    }
  });

  document.getElementById("pm25").innerHTML = pm25Text;
}

getDust();
