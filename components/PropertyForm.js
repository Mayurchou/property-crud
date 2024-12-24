import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const PropertyForm = ({ initialData = {}, onSubmit, loading }) => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    price: "",
    ...initialData, 
  });

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(property); 
  };

  return (
    <div>
      <h1>{initialData.id ? "Edit Property" : "Add Property"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Property Name"
            value={property.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={property.location}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={property.price}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : initialData.id ? "Save Changes" : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default PropertyForm;
