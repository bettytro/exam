import React, { useState } from "react";

const RegisterForm = ({ onRegister, vm }) => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    avatar: { url: "", alt: "" },
    venueManager: vm,
  });

  const handleChange = (e) => {
    if (
      ["avatar.url", "avatar.alt", "banner.url", "banner.alt"].includes(
        e.target.name
      )
    ) {
      setFormData({
        ...formData,
        [e.target.name.split(".")[0]]: {
          ...formData[e.target.name.split(".")[0]],
          [e.target.name.split(".")[1]]: e.target.value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(formData);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="md:w-1/2 flex flex-col gap-4 pt-6 pb-8 mb-4"
    >
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Name <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Email <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          pattern=".+@stud\.noroff\.no"
          title="Please use your @stud.noroff.no email"
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />{" "}
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Password <span className="text-red-500 ml-1">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Bio
        </label>
        <textarea
          name="bio"
          rows={5}
          value={formData.bio}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Avatar URL
        </label>
        <input
          type="url"
          name="avatar.url"
          value={formData.avatar.url}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">
          Avatar Alternative Text (Required for Accessibility)
        </label>
        <input
          type="text"
          name="avatar.alt"
          value={formData.avatar.alt}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-title hover:bg-sec mt-6 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
