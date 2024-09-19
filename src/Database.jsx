import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Database() {
  const [internetProviders, setInternetProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/internetProvider")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setInternetProviders(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="database-container">
      {internetProviders.map((internetProvider) => (
        <Link to={`/provider/${internetProvider.id}`} key={internetProvider.id} className="internet-provider-card">
          {internetProvider.image && <img src={internetProvider.image} alt={internetProvider.name} className="provider-image" />}
          <h2>{internetProvider.name}</h2>
        </Link>
      ))}
    </div>
  );
}
