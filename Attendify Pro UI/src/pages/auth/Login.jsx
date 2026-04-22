import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../../api/apiService";

function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    console.log("Sending login data:", data);

    try {
      const res = await userAPI.loginUser(data);

      console.log(" Full response:", res);
      console.log(" Response data:", res.data);

      // Ensure token exists
      const token = res.data?.token;

      if (!token) {
        console.log("Token missing. Actual response:", res.data);
        setError("Backend not returning token");
        return;
      }

      // Save token
      localStorage.setItem("token", token);

      // Decode JWT safely
      let payload = {};
      try {
        payload = JSON.parse(atob(token.split(".")[1]));
        console.log("JWT payload:", payload);
      } catch (err) {
        console.error("JWT decode error:", err);
        setError("Invalid token format");
        return;
      }

      // Store user info
      localStorage.setItem("username", payload.sub);
      localStorage.setItem("role", payload.role);

      // Redirect based on role
      if (payload.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/faculty-dashboard");
      }

    } catch (err) {
      console.error("Login error:", err);

      if (err.response) {
        console.log("Backend error:", err.response.data);
        setError(err.response.data?.message || "Invalid username or password");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login
        </h2>

        <input
          name="username"
          placeholder="Username"
          value={data.username}
          onChange={handle}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handle}
          required
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;