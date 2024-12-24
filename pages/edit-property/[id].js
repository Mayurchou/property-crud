import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { editProperty, fetchProperties } from "../../utils/api";

const EditProperty = () => {
  const [property, setProperty] = useState({
    name: "",
    location: "",
    price: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      // Fetch the property by ID if available
      fetchProperty();
    }
  }, [id]);

  const fetchProperty = async () => {
    try {
      const properties = await fetchProperties();
      const propertyToEdit = properties.find((p) => p.id === parseInt(id));
      if (propertyToEdit) {
        setProperty(propertyToEdit);
      }
    } catch (error) {
      console.error("Error fetching property", error);
    }
  };

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
      await editProperty(id, property);
      router.push("/"); // Redirect after editing
    } catch (error) {
      console.error("Error editing property", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Property</h1>
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
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
