import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch properties from the backend
    const fetchProperties = async () => {
      try {
        // Make sure the backend URL is correct and the backend is running
        const response = await axios.get('http://localhost:5000/api/properties');
        setProperties(response.data);
      } catch (err) {
        setError('Error fetching properties');
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>Properties</h2>
      <ul>
        {properties.length > 0 ? (
          properties.map((property) => (
            <li key={property.id}>{property.name}</li>
          ))
        ) : (
          <p>No properties available.</p>
        )}
      </ul>
    </div>
  );
};

export default PropertyList;


