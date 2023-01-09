import logo from './logo.svg';
import './App.css';
import { MultiStepProgressBar } from './components/MultiStepProgressBar';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { questions } from './Questions';


function App() {
  const [index, setIndex ] = useState(2);
  const totalPagesCount = questions.length;
  const [pagesAnswers, setPagesAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const onPagesAnswerUpdate = (step, answerObj) => {
    setPagesAnswers({...pagesAnswers, [step]: answerObj});
  }

  const prevButton = () => {
    if (index > 1 ) {
      setIndex(prevIndex => prevIndex - 1);
    }
  }
  
  const nextButton = () => {
    if (index < 3 ) {
      setIndex(prevIndex => prevIndex + 1);
    } else {
      setPagesAnswers({});
      setSubmitted(true);
    }
  }

  const handleStart = () => {
    setIndex(1);
    setSubmitted(false);
  }
  return (
    <div className="App">
       <Container className="h-100">
        <Row className="m-5">
          <Col className="align-self-center">
          <MultiStepProgressBar step={index}/>
          </Col>
        </Row>
        <Row>
          {
            submitted ?
            <Card>
              <Card.Body>
                <p>Your Answer have been submitted</p>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleStart}>Start Over</Button>
              </Card.Footer>
            </Card>
          :
          <Card>
            <Card.Body>
              <MultiStepForm step={index} list={questions} onPageUpdate={onPagesAnswerUpdate} pagesAnswers={pagesAnswers} />
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <Button onClick={prevButton} disabled={index===1}>Previous</Button>
              <Button onClick={nextButton}>{index === totalPagesCount? `Submit` : "Next"}</Button>
            </Card.Footer>
          </Card>
          }
        </Row>
       </Container> 
        
    </div>
  );
}

export default App;
