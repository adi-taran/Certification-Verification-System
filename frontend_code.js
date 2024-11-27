
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [uniqueId, setUniqueId] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/verify/${uniqueId}`);
      setStudent(res.data);
      setError('');
    } catch (err) {
      setError('Student not found!');
      setStudent(null);
    }
  };

  const downloadCertificate = () => {
    window.open(`http://localhost:5000/certificate/${uniqueId}`, '_blank');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Certificate Verification System</h1>
      <input
        type="text"
        value={uniqueId}
        onChange={(e) => setUniqueId(e.target.value)}
        placeholder="Enter Unique ID"
      />
      <button onClick={handleSearch}>Verify</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {student && (
        <div>
          <p>Name: {student.name}</p>
          <p>Domain: {student.domain}</p>
          <p>
            Internship Duration: {student.startDate} to {student.endDate}
          </p>
          <button onClick={downloadCertificate}>Download Certificate</button>
        </div>
      )}
    </div>
  );
}

export default App;
