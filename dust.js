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
  const url = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?sidoName=경기&pageNo=1&numOfRows=20&returnType=json&serviceKey=${API_KEY}&ver=1.0`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    updateDustInfo(data.response.body.items);
    updateDust25Info(data.response.body.items);
    // console.log("미세먼지경기", data.response.body.items);
    console.log(
      "인계동 미세먼지",
      data.response.body.items.find((item) => item.stationName === "인계동")
    );
  } catch (error) {
    console.error("Fine dust communication failure", error);
  }
}

// 미세먼지 정보 업데이트
function updateDustInfo(dustItems) {
  let pm10 = "";

  dustItems.forEach((item) => {
    switch (item.stationName) {
      case "인계동":
        pm10 = item.pm10Value + "㎍/㎥ <br>";
        break;
    }
  });

  document.getElementById("pm10").innerHTML = pm10;
}

// 초미세먼지 정보 업데이트
function updateDust25Info(dustItems) {
  let pm25 = "";

  dustItems.forEach((item) => {
    switch (item.stationName) {
      case "인계동":
        pm25 = item.pm25Value + "㎍/㎥ <br>";
        break;
    }
  });

  document.getElementById("pm25").innerHTML = pm25;
}

getDust();
