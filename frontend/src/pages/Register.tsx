import { useState } from "react";
import api from "../axios";
import { Link } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      console.log("Registered:", res.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <div className="w-full max-w-6xl grid grid-cols-2 rounded-3xl overflow-hidden">
        
        {/* Left: Register Form */}
        <div className="flex flex-col justify-center px-20">
          <h1 className="text-4xl font-bold mb-2">Create account</h1>
          <p className="text-gray-500 mb-10">
            Start organizing your work efficiently
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-12 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-5 rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-black"
            />

            <button
              type="submit"
              className="w-full h-12 rounded-full bg-black text-white font-medium hover:opacity-90 transition"
            >
              Register
            </button>
          </form>
              <p className=' ml-20 mt-3'>Do not have an account? <Link to="/login" className='text-blue-400 font-bold'>Sign In</Link></p>
        </div>

        {/* Right: Illustration Section */}
        <div className="flex items-center justify-center bg-green-50">
          <img
            src="/register-illustration.png"
            alt="Register Illustration"
            className="max-w-md"
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
