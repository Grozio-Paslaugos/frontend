import React, { useState, useEffect } from 'react';
import ProceduresList from "../ProcedureList/ProcedureList";

export default function Home() {
  const [procedures, setProcedures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProcedures = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/procedures', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch procedures');
        }
        const data = await response.json();
        setProcedures(data);
        localStorage.setItem('procedures', JSON.stringify(data));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProcedures();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return <ProceduresList procedures={procedures} />;
}
