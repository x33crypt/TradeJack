import React, { useState } from "react";
import InAppNav from "@/components/InAppNav";
import Footer from "@/components/Footer";
import axios from "axios";
import { FaUserCheck } from "react-icons/fa6";

const KycVerification = () => {
  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: { day: "", month: "", year: "" },
    gender: "",
    address: { street: "", city: "", state: "", country: "" },
    documentType: "",
  });

  // State for file inputs
  const [frontIdImage, setFrontIdImage] = useState(null);
  const [backIdImage, setBackIdImage] = useState(null);

  // State for error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files[0]) {
      // Validate file size (5MB limit)
      if (files[0].size > 5 * 1024 * 1024) {
        setError(${name} must be less than 5MB);
        return;
      }
      // Validate file type
      if (!files[0].type.startsWith("image/")) {
        setError(${name} must be an image (JPEG, PNG, etc.));
        return;
      }


      
      // if (name === "frontIdImage") {
      //   setFrontIdImage(files[0]);
      // } else if (name === "backIdImage") {
      //   setBackIdImage(files[0]);
      // }
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic client-side validation
    if (!frontIdImage || !backIdImage) {
      setError("Please select both front and back ID images");
      setLoading(false);
      return;
    }
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.dateOfBirth.day ||
      !formData.dateOfBirth.month ||
      !formData.dateOfBirth.year ||
      !formData.gender ||
      !formData.address.street ||
      !formData.address.city ||
      !formData.address.state ||
      !formData.address.country ||
      !formData.documentType
    ) {
      setError("Please fill in all required fields");
      setLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Validate date of birth (basic check)
    const currentYear = new Date().getFullYear();
    if (
      parseInt(formData.dateOfBirth.year) > currentYear - 18 ||
      parseInt(formData.dateOfBirth.year) < 1900 ||
      parseInt(formData.dateOfBirth.month) < 1 ||
      parseInt(formData.dateOfBirth.month) > 12 ||
      parseInt(formData.dateOfBirth.day) < 1 ||
      parseInt(formData.dateOfBirth.day) > 31
    ) {
      setError("Please enter a valid date of birth (must be at least 18 years old)");
      setLoading(false);
      return;
    }

    // Construct FormData
    const data = new FormData();
    data.append("frontIdImage", frontIdImage);
    data.append("backIdImage", backIdImage);
    data.append("firstName", formData.firstName);
    data.append("lastName", formData.lastName);
    data.append("email", formData.email);
    data.append("dateOfBirth.day", formData.dateOfBirth.day);
    data.append("dateOfBirth.month", formData.dateOfBirth.month);
    data.append("dateOfBirth.year", formData.dateOfBirth.year);
    data.append("gender", formData.gender);
    data.append("address.street", formData.address.street);
    data.append("address.city", formData.address.city);
    data.append("address.state", formData.address.state);
    data.append("address.country", formData.address.country);
    data.append("documentType", formData.documentType);

    // Log FormData for debugging
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
     const baseUrl = import.meta.env.VITE_API_URL || "https://tradejack.onrender.com/api/v1"
      const response = await axios.post(${baseUrl}/profile/kyc/submit, data, {
       withCredentials:true
      });
      setSuccess("KYC submitted successfully. Awaiting admin review.");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: { day: "", month: "", year: "" },
        gender: "",
        address: { street: "", city: "", state: "", country: "" },
        documentType: "",
      });
      setFrontIdImage(null);
      setBackIdImage(null);
    } catch (error) {
      console.error("KYC submission error:", error.response?.data);
      setError(
        error.response?.data?.message ||
          "Failed to submit KYC. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InAppNav />
      <div className="flex flex-col min-h-svh bg-black lg:px-[2%] md:px-[5%] md:pt-[80px] pt-[60px] relative">
        <div className="flex flex-col w-full h-full md:border-x md:border-t md:border-b border-neutral-800">
          {/* Header */}
          <div className="flex items-center justify-between p-[15px] border-b border-tradeAshLight">
            <p className="text-[17px] text-white font-[700]">
              KYC Verification
            </p>
            <div className="text-white text-[25px]">
              <FaUserCheck />
            </div>
          </div>

          {/* Form */}
          <div className="px-[15px] py-[20px] flex flex-col gap-[20px]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              {/* Personal Information */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">
                  Personal Information
                </h3>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
              </div>

              {/* Date of Birth */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">
                  Date of Birth
                </h3>
                <div className="flex gap-[10px]">
                  <input
                    type="number"
                    name="dateOfBirth.day"
                    value={formData.dateOfBirth.day}
                    onChange={handleInputChange}
                    placeholder="Day"
                    min="1"
                    max="31"
                    className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen w-[33%]"
                  />
                  <input
                    type="number"
                    name="dateOfBirth.month"
                    value={formData.dateOfBirth.month}
                    onChange={handleInputChange}
                    placeholder="Month"
                    min="1"
                    max="12"
                    className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen w-[33%]"
                  />
                  <input
                    type="number"
                    name="dateOfBirth.year"
                    value={formData.dateOfBirth.year}
                    onChange={handleInputChange}
                    placeholder="Year"
                    min="1900"
                    max={new Date().getFullYear() - 18}
                    className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen w-[33%]"
                  />
                </div>
              </div>

              {/* Gender */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">Gender</h3>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">Address</h3>
                <input
                  type="text"
                  name="address.street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  placeholder="Street"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
                <input
                  type="text"
                  name="address.country"
                  value={formData.address.country}
                  onChange={handleInputChange}
                  placeholder="Country"
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                />
              </div>

              {/* Document Type */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">
                  Document Type
                </h3>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px] focus:outline-none focus:border-tradeGreen"
                >
                  <option value="">Select Document Type</option>
                  <option value="passport">Passport</option>
                  <option value="driver_license">Driver's License</option>
                  <option value="national_id">National ID</option>
                </select>
              </div>

              {/* File Uploads */}
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-white text-[15px] font-[600]">
                  ID Documents
                </h3>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-tradeFadeWhite text-[13px]">
                    Front ID Image
                  </label>
                  <input
                    type="file"
                    name="frontIdImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px]"
                  />
                </div>
                <div className="flex flex-col gap-[5px]">
                  <label className="text-tradeFadeWhite text-[13px]">
                    Back ID Image
                  </label>
                  <input
                    type="file"
                    name="backIdImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="px-[12px] py-[8px] bg-tradeAsh border border-neutral-800 text-white rounded-[6.5px]"
                  />
                </div>
              </div>

              {/* Error/Success Messages */}
              {error && (
                <p className="text-red-500 text-[13px] font-[500]">{error}</p>
              )}
              {success && (
                <p className="text-tradeGreen text-[13px] font-[500]">
                  {success}
                </p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`px-[12px] py-[8px] bg-tradeGreen text-white rounded-[6.5px] font-[600] transition-all duration-300 hover:shadow-md hover:scale-[1.03] ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Submitting..." : "Submit KYC"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default KycVerification;