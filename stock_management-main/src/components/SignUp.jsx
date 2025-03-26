import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    userid: "",
    username: "",
    password: "",
    repeatPassword: "",
    role: "Approver"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatPassword) return setError("Passwords do not match!");
    try {
      await axios.post("http://localhost:5000/signup", formData);
      navigate("/");   // ✅ Navigates to Login after successful signup
    } catch (error) {
      setError(error.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <div className="wrapper">
      <h1>Signup</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="userid" placeholder="User ID" onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="password" name="repeatPassword" placeholder="Repeat Password" onChange={handleChange} required />
        <select name="role" onChange={handleChange} value={formData.role}>
          <option value="Approver">Approver</option>
          <option value="Purchase">Purchase</option>
          <option value="Inventory">Inventory</option>
          <option value="Manager">Manager</option>
          <option value="Superadmin">Superadmin</option>
        </select>
        <button type="submit">Signup</button>
      </form>

      {/* ✅ Link to Login Page */}
      <br />
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
};

export default SignUp;
