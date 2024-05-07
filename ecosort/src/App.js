import "./App.css";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react"; // import useRef
import axios from "axios";
function App() {
  // code
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [trashCount, setTrashCount] = useState(0);
  const [recycleCount, setRecycleCount] = useState(0);
  const [compostCount, setCompostCount] = useState(0);
  const [confidence, setConfidence] = useState(0);
  // image url
  // https://ecosort-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fb9a7b7c-a230-4bb9-92b5-a8b171aa4cf8/classify/iterations/Iteration1/url
  // Set Prediction-Key Header to : c7773dfc59d14a99b8abe2da34800ea1
  // Set Content-Type Header to : application/json
  // Set Body to : {"Url": "https://example.com/image.png"}

  // image file
  // https://ecosort-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fb9a7b7c-a230-4bb9-92b5-a8b171aa4cf8/classify/iterations/Iteration1/image
  // Set Prediction-Key Header to : c7773dfc59d14a99b8abe2da34800ea1
  // Set Content-Type Header to : application/octet-stream
  // Set Body to : <image file>
  // const b64toBlob = (base64, type = "application/octet-stream") =>
  //   fetch(`data:${type};base64,${base64}`).then((res) => res.blob());

  const getPrediction = async (content) => {
    // const imageUrl =  "https://www.shutterstock.com/image-photo/banana-cluster-isolated-600nw-575528746.jpg";
    const predictionKey = "c7773dfc59d14a99b8abe2da34800ea1";

    const endpoint = `https://ecosort-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/fb9a7b7c-a230-4bb9-92b5-a8b171aa4cf8/classify/iterations/Iteration1/image`;

    const headers = {
      "Content-Type": "application/octet-stream",
      // "Content-Length": JSON.stringify(content.length),
      "Prediction-Key": predictionKey,
      "Process-Data": false,
    };

    const base64Image = content.split(",")[1];
    const binaryImage = window.atob(base64Image);
    const byteArray = new Uint8Array(binaryImage.length);
    for (let i = 0; i < binaryImage.length; i++) {
      byteArray[i] = binaryImage.charCodeAt(i);
    }
    // const data = new Blob([byteArray], { type: "application/octet-stream" });
    const data = byteArray;
    axios
      .post(endpoint, data, { headers })
      .then((response) => {
        console.log("Response Status: ", response.status);
        console.log("Response Data: ", response.data);
        if (response.data.predictions.length) {
          const result = response.data.predictions[0].tagName;
          console.log(result);
          const confidence = response.data.predictions[0].probability;
          if (result == "garbage") {
            setTrashCount((trashCount) => trashCount + 1);
          } else if (result == "recycling") {
            setRecycleCount((recycleCount) => recycleCount + 1);
          } else if (result == "compost") {
            setCompostCount((compostCount) => compostCount + 1);
          }
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  // create a capture function
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    getPrediction(imageSrc);
    setImgSrc(imageSrc);
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>EcoSort</h1>
        <p>Take a picture below to get started.</p>
        <div className="container">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam
              height={500}
              width={500}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
          <div className="btn-container">
            {imgSrc ? (
              <button onClick={retake}>Take another photo</button>
            ) : (
              <button onClick={capture}>Capture photo</button>
            )}
          </div>
          <p>Trash Count: {trashCount}</p>
          <p>Recycle Count: {recycleCount}</p>
          <p>Compost Count: {compostCount}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
