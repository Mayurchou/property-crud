import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/properties', {
          timeout: 5000, // Add timeout to handle long requests
        });
        if (Array.isArray(response.data)) {
          setProperties(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
          setProperties([]);
        }
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with a status code
          setError(`Error: ${err.response.status} ${err.response.statusText}`);
        } else if (err.request) {
          // The request was made but no response was received
          setError('Network error: Unable to reach the server');
        } else {
          // Something happened while setting up the request
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Property List</h1>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>{property.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
