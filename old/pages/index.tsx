import { useState } from 'react';
import styled from 'styled-components';
import fetch from 'node-fetch';
import Emoji from 'a11y-react-emoji';

export default () => {
  const [result, setResult] = useState('');
  const [inputText, setInputText] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [running1, setRunning1] = useState(false);
  const [running2, setRunning2] = useState(false);
  const [showAnother, setShowAnother] = useState(false);

  const generateText = () => {
    setRunning1(true);
    const requestBody: Gpt2RequestBody = {
      max_length: 120,
      prefix: inputText,
    };

    fetch('https://gpt2-epjrw3kbeq-uc.a.run.app', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setShowMore(true);
        setResult(res.text.replace(inputText, ''));
        setRunning1(false);
        setShowAnother(true);
      })
      .catch((err) => console.log(err));
  };

  const generateMoreText = () => {
    setRunning2(true);
    const words = result.split(' ');
    const lastSentence = words.slice(Math.max(words.length - 20, 0)).join(' ');
    console.log(lastSentence);

    const requestBody: Gpt2RequestBody = {
      max_length: 120,
      prefix: lastSentence,
    };

    fetch('https://gpt2-epjrw3kbeq-uc.a.run.app', {
      method: 'POST',
      body: JSON.stringify(requestBody),
    })
      .then((res) => res.json())
      .then((res) => {
        setShowMore(true);
        setResult(`${result} ${res.text.replace(result, '')}`);
        setRunning2(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Styles>
      <div className='header'>
        <h1>transformers</h1>
        <h2>Watch a neural network complete your text</h2>
        <h3>
          Note: This website runs the small 117M model and does not support the
          full 1558M model because of memory limits.
        </h3>
      </div>
      <div className='main'>
        <div className='input'>
          <textarea
            onChange={(event) => setInputText(event.target.value)}
            placeholder='Type something here...'
          />
          <div className='generate'>
            <button
              className={`ld-ext-right ${running1 && 'running'}`}
              onClick={generateText}
            >
              Generate {showAnother && 'Another'}
              <div className='ld ld-ring ld-spin'></div>
            </button>
            {showMore && (
              <button
                className={`ld-ext-right ${running2 && 'running'}`}
                onClick={generateMoreText}
              >
                More
                <div className='ld ld-ring ld-spin'></div>
              </button>
            )}
          </div>
        </div>
        <div className='result'>
          <p>
            <b>{inputText}</b>
            {result}
          </p>
        </div>
      </div>
      <div className='footer'>
        <h1>
          Created with <Emoji symbol='??????' label='love' /> by{' '}
          <a href='https://twitter.com/raphtlw'>raphtlw</a>
        </h1>
      </div>
    </Styles>
  );
};

const Styles = styled.div`
  & {
    margin-bottom: 3rem;
  }
  .main {
    display: flex;
    flex-wrap: wrap;
    margin: 0.8rem 0rem 0rem 3rem;
  }
  .first {
    font-family: Inter, sans-serif;
  }
  .header {
    margin: 2rem 0rem 0rem 3rem;
  }
  .header h1 {
    font-size: 3rem;
    font-weight: 700;
  }
  .header h2 {
    margin: 0.4rem 0rem 0rem 0rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
  .header h3 {
    margin-top: 0.4rem;
    font-size: 1rem;
    font-weight: 400;
  }
  .input {
    margin: 2rem 0rem 0rem 0rem;
    width: 40vw;
    height: 60vh;
    display: flex;
    flex-direction: column;
  }
  .input textarea {
    resize: none;
    height: 100%;
    width: 100%;
    font-size: 1rem;
    padding: 1rem;
  }
  .generate {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin-top: 1.6rem;
  }
  .generate button {
    outline: none;
    border: none;
    cursor: pointer;
    padding: 1rem 0rem;
    background: rgb(12, 52, 255);
    background: linear-gradient(
      120deg,
      rgba(12, 52, 255, 1) 0%,
      rgba(66, 185, 255, 1) 100%
    );
    box-shadow: 0px 5px 20px rgb(0, 127, 255, 0.6);
    color: white;
    font-size: 1rem;
    border-radius: 4px;
    transition: all ease-out 0.1s;
    margin: 0rem 0.6rem;
    width: 100%;
  }
  .input button:hover {
    transform: translate(0px, -2px);
    box-shadow: 0px 10px 20px rgb(0, 127, 255, 0.6);
  }
  .input button:active {
    transition: all ease-out 0.05s;
    transform: translate(0px, 0px);
    box-shadow: 0px 5px 10px rgb(0, 127, 255, 0.6);
  }
  .result {
    margin: 2rem 0rem 0rem 4rem;
    width: 48vw;
  }
  .result p {
    font-size: 1rem;
    font-weight: 500;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
  .footer {
    font-family: Inter, sans-serif;
    margin: 3rem 0rem 0rem 3rem;
  }
  .footer h1 {
    font-size: 1rem;
    font-weight: 400;
  }
  .footer a {
    color: #2f92ff;
  }
  @media (max-width: 768px) {
    .main {
      margin: 0.8rem 0rem 0rem 1.6rem;
    }
    .header {
      margin: 1rem 1.6rem;
    }
    .header h1 {
      font-size: 2.4rem;
    }
    .header h2 {
      font-size: 1rem;
    }
    .input {
      margin: 1rem 1.6rem 0rem 0rem;
      width: 100%;
      height: 40vh;
    }
    .input textarea:focus {
      outline: none;
    }
    .result {
      margin: 2rem 0rem;
      width: 100%;
    }
    .footer {
      margin: 2rem 0rem 0rem 1.6rem;
    }
  }
`;

interface Gpt2RequestBody {
  max_length?: number;
  prefix?: string;
}
