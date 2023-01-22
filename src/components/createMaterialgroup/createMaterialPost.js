import axios from "axios";

//텍스트 퀴즈 생성 post
export const onhandlePostTextQuiz = async(data) => {
    const config = {
        method: "post",
        url: "/api/material/multipleChoice",
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
        },
        data: data,
    };
    await axios(config)
        .then((response) => {
        alert("텍스트 퀴즈가 생성되었습니다.");
        //선택시 화면 새로고침
        window.location.reload();
        console.log(response);
        })
        .catch((error) => {
        console.error(error);
        });
}

export const onhandlePostImgQuiz = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/multipleChoice",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("이미지 퀴즈가 생성되었습니다.");
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 서브밋
export const onhandlePostPuzzle = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/puzzle",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("퍼즐이 생성되었습니다.");
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

export const onhandlePostImages = async (data) => {
    const config = {
      method: "post",
      url: "/api/material/image",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${localStorage.getItem("token")}`,
      },
      data: data,
    };
    console.log("🚀🚀🚀🚀", data);
    await axios(config)
      .then((response) => {
        alert("이미지가 생성되었습니다.");
        window.location.reload();
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };