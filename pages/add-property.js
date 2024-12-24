import { useState } from "react";
import { useRouter } from "next/router";
import { addProperty } from "../utils/api";

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addProperty(property);
      router.push("/"); // Redirect to homepage or property listing
    } catch (error) {
      console.error("Error adding property", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Add Property</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={property.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={property.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={property.price}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Property"}
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
