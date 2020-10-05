import React, { useState } from 'react';
import './App.css';
import { number } from 'prop-types';

const Nexmo = require("nexmo");


function App() {
  const [apiKey, setApiKey] = useState();
  const [apiSecret, setApiSecret] = useState();
  const [senderName, setSenderName] = useState();
  const [message, setMessage] = useState();
  const [numberString, setNumberString] = useState();
  const [numbers, setNumbers] = useState();
  const [messageStatus, setMessageStatus] = useState("");

  function onChangeApiKey(e) {
    setApiKey(e.target.value);
  }

  function onChangeApiSecret(e) {
    setApiSecret(e.target.value);
  }

  function onChangeSenderName(e) {
    setSenderName(e.target.value);
  }

  function onChangeMessage(e) {
    setMessage(e.target.value);
  }

  function onChangeNumbers(e) {
    setNumberString(e.target.value);
    let num = e.target.value.split("\n");
    setNumbers(num);
  }

  function addStatus(number, result) {
    setMessageStatus(messageStatus => messageStatus + number + ": " + result + "\n");
  }

  function sendMessage(nexmo, from, to, text) {
    nexmo.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
          addStatus(to, err.toString())
      } else {
          if(responseData.messages[0]['status'] === "0") {
              addStatus(to, "Message sent successfully.");
          } else {
              addStatus(to, "Failed to send. Please try again.");
          }
      }
    });
  }

  function submitForm(e) {
    e.preventDefault();
    setMessageStatus("");
    const nexmo = new Nexmo({
      apiKey: apiKey,
      apiSecret: apiSecret,
    });
    const from = senderName;
    const text = message;
    
    for (let i = 0; i < numbers.length; i++) {
      const to = numbers[i];
      setTimeout(() => sendMessage(nexmo, from, to, text), 50);
    }

    alert('SMS submitted for sending')
  }

  return (
    <div className="root">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"></link>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
      <div className="NexmoAPI">
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label for="apiKey">API Key</label>
            <input type="text" className="form-control" id="apiKey" value={apiKey} onChange={onChangeApiKey} /><br /><br />
          </div>
          <div className="form-group">
            <label for="apiSecret">API Secret</label>
            <input type="text" className="form-control" id="apiSecret" value={apiSecret} onChange={onChangeApiSecret} /><br /><br />
          </div>
          <div className="form-group">
            <label for="senderName">Sender Name</label>
            <input type="text" className="form-control" id="senderName" value={senderName} onChange={onChangeSenderName} /><br /><br />
          </div>
          <div className="form-group">
            <label for="message">Message</label>
            <textarea className="form-control" id="message" rows="5" value={message} onChange={onChangeMessage} /><br /><br />
          </div>
          <div className="form-group">
            <label for="numbers">Numbers (Separate phone numbers with newline and include country code <b>without "+"</b>) Example: 6591234567</label>
            <textarea className="form-control" id="numbers " rows="5" value={numberString} onChange={onChangeNumbers} /><br /><br />
          </div>
          <div className="sendButton">
            <input className="btn btn-primary" type="submit" value="Send" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
