import "./App.css";
import Webcam from "react-webcam";
import { useRef, useState, useCallback } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";

function App() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [trashCount, setTrashCount] = useState(0);
  const [recycleCount, setRecycleCount] = useState(0);
  const [compostCount, setCompostCount] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertVariant, setAlertVariant] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const getPrediction = async (content) => {
    const endpoint = `https://ecosort-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/${process.env.REACT_APP_CUSTOM_VISION_ID}/classify/iterations/Iteration1/image`;

    const headers = {
      "Content-Type": "application/octet-stream",
      "Prediction-Key": process.env.REACT_APP_CUSTOM_VISION_PREDICTION_KEY,
      "Process-Data": false,
    };

    const base64Image = content.split(",")[1];
    const binaryImage = window.atob(base64Image);
    const byteArray = new Uint8Array(binaryImage.length);
    for (let i = 0; i < binaryImage.length; i++) {
      byteArray[i] = binaryImage.charCodeAt(i);
    }
    const data = byteArray;
    axios
      .post(endpoint, data, { headers })
      .then((response) => {
        // console.log("Response Status: ", response.status);
        // console.log("Response Data: ", response.data);
        if (response.data.predictions.length) {
          const result = response.data.predictions[0].tagName;
          // const confidence = response.data.predictions[0].probability;
          if (result === "garbage") {
            setTrashCount((trashCount) => trashCount + 1);
          } else if (result === "recycling") {
            setRecycleCount((recycleCount) => recycleCount + 1);
          } else if (result === "compost") {
            setCompostCount((compostCount) => compostCount + 1);
          }
          setAlertVariant("success");
          setAlertMessage(
            `This object is detected to go into the ${result} bin`
          );
        } else {
          setAlertVariant("warning");
          setAlertMessage("The API returned no prediction for some reason!");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
        setAlertVariant("danger");
        setAlertMessage("There was an api call error!");
      });

    setShowAlert(true);
    // setImgSrc(null);
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc);
    setImgSrc(imageSrc);
    try {
      setLoading(true);
      await getPrediction(imageSrc);
      setLoading(false);
    } catch (error) {
      console.error("Error processing image: ", error);
    }
  }, [webcamRef, getPrediction]);

  const retake = () => {
    setImgSrc(null);
  };
  return (
    <div className="App">
      <Container className="main">
        <Row>
          <h1>EcoSort</h1>
          <p>Take a picture of any item to find which bin it goes into!</p>
        </Row>
        <Row className="alert-container">
          <Alert
            show={showAlert}
            variant={alertVariant}
            onClose={() => setShowAlert(false)}
            dismissible
          >
            {alertMessage}
          </Alert>
        </Row>
        <Row className="img-container">
          <div className="img-container">
            {imgSrc ? (
              <Image src={imgSrc} alt="webcam" height={500} />
            ) : (
              <Webcam
                height={500}
                width={500}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
              />
            )}
          </div>
        </Row>
        <Row>
          <div className="btn-container">
            {imgSrc ? (
              <Button
                onClick={() => {
                  setShowAlert(false);
                  retake();
                }}
                variant="primary"
                size="lg"
              >
                {isLoading ? "Loading..." : "Take another photo"}
              </Button>
            ) : (
              <Button onClick={capture} variant="secondary" size="lg">
                {isLoading ? "Loading..." : "Capture photo"}
              </Button>
            )}
          </div>
        </Row>
        <Row>
          <Col>
            <p>
              Trash Count: <br></br> {trashCount}
            </p>
          </Col>
          <Col>
            <p>
              Recycle Count: <br></br>
              {recycleCount}
            </p>
          </Col>
          <Col>
            <p>
              Compost Count: <br></br>
              {compostCount}
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
