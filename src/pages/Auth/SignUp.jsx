import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImges';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';

function SignUp() {
  const [profilePic, setProfilePic] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteToken, setadminInviteToken] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false)


  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

   function togglePassword(){
    setShowPassword(!showPassword)
  }

  async function handleSignUp(e) {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullname) return setError("Enter Name Please");
    if (!validateEmail(email)) return setError("Enter Valid Email Address");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullname,
        email,
        password,
        profileImageUrl,
        adminInviteToken,
      }, { withCredentials: true });

      const result = res.data.message.data;
      const { token, user } = result;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data.message.data);
        navigate(user.role === "admin" ? "/admin/dashboard" : "/user/dashboard");
      }
    } catch (e) {
      if (e.response?.data?.message?.message) {
        setError(e.response.data.message.message);
      } else {
        setError("Something went wrong. Please try again later");
      }
    }
  }

  return (
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* Image Upload */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>
          <p className="text-center text-sm text-gray-500">Upload Profile Photo</p>

          {/* Full Name */}
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Email */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="Email Address"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {/* Password with show/hide toggle */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 8 characters)"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <span
              onClick={togglePassword}
              className="absolute top-2 right-3 cursor-pointer text-gray-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
              role="button"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </span>
          </div>

          {/* Admin Token */}
          <input
            value={adminInviteToken}
            onChange={(e) => setadminInviteToken(e.target.value)}
            type="text"
            placeholder="Admin Invite Token (optional)"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
