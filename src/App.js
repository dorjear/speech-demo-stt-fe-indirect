import React, {useEffect, useRef, useState} from 'react';
import { Container } from 'reactstrap';
import './custom.css'
import axios from "axios";

export default function App() { 
    const [responseMessage, setResponseMessage] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true); // Show loading state

        try {
            // Make the POST request to the backend API
            const res = await axios.post('http://localhost:5001/api/Voice/chat', {
                message: inputMessage,
            });

            // Set the response message
            setResponseMessage(res.data.response);
        } catch (error) {
            // Handle error if API request fails
            setResponseMessage('Error: Could not fetch the response.');
            console.error('API call error:', error);
        } finally {
            setIsLoading(false); // Reset loading state
        }
    };

    return (
      <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <h2>ChatGPT Assistant</h2>

          {/* Input TextArea for user message */}
          <textarea className="col-6 output-display rounded"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows={5}
            placeholder="Type your message here..."
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />

          {/* Submit Button */}
          <button onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? 'Loading...' : 'Submit'}
          </button>

          <hr />

          {/* Output TextArea for response */}
          <textarea className="col-6 output-display rounded"
            value={responseMessage}
            readOnly
            rows={5}
            placeholder="The response will appear here..."
            style={{ width: '100%', marginTop: '10px', padding: '10px' }}
          />
      </div>
    );
}
