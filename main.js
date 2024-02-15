// DOM이 완전히 로드된 후에 스크립트를 실행하기 위해 대기합니다.
document.addEventListener("DOMContentLoaded", function () {
  // 각 div에 표시하고자 하는 내용을 포함한 배열을 정의합니다.
  const contentArray = ["미세먼지", "초미세먼지", "현재온도", "하늘상태", "강수형태"];

  // 동적으로 div를 삽입하고자 하는 HTML 내의 컨테이너를 가져옵니다.
  const contentContainer = document.getElementById("content");

  // 내용 배열의 각 항목을 순회합니다.(반복문)
  contentArray.forEach((item) => {
    // 새 div 요소를 생성합니다.
    const div = document.createElement("div");

    // 현재 항목의 텍스트로 div의 텍스트 내용을 설정합니다.
    div.textContent = item;

    // 새롭게 생성된 div를 컨테이너에 추가합니다.
    contentContainer.appendChild(div);
  });
});
