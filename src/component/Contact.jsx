import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col justify-center items-center py-10 px-4 bg-base-200">
      {/* Heading Section */}
      <h2 className="font-semibold text-4xl mb-4 text-center">Get in Touch</h2>
      <p className="text-lg text-center mb-8 max-w-xl">
        Ready to explore how EarthSaathi can benefit your business? Contact us
        today for more information, partnerships, or consulting.
      </p>

      {/* Form Section */}
      <form className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 space-y-6">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            className="input input-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          />
        </div>

        {/* Message Field */}
        <div className="flex flex-col">
          <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Your message"
            rows={5}
            className="textarea textarea-bordered w-full focus:outline-none focus:ring focus:ring-primary"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-full">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
