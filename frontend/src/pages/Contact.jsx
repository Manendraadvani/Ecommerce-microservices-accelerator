import React, { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been submitted. Thank you!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const faqs = [
    {
      question: "What are your shipping options?",
      answer: "We offer standard (5-7 days), express (2-3 days), and overnight shipping options."
    },
    {
      question: "Do you accept returns?",
      answer: "Yes, we accept returns within 30 days of purchase for unused books in original condition."
    },
    {
      question: "How can I track my order?",
      answer: "You'll receive a tracking number via email once your order ships. You can also check your order status in your account."
    },
    {
      question: "Do you offer bulk discounts?",
      answer: "Yes! Contact us for bulk orders of 50+ books for special pricing."
    }
  ];

  return (
    <main className="max-w-6xl mx-auto px-4 py-16 space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-blue-600 to-indigo-700"
      >
        <div className="relative h-[300px] md:h-[400px] w-full flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-lg md:text-xl text-gray-100">
              We're here to help! Reach out with any questions or feedback.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Business Hours */}
      <motion.section
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
          🕒 Business Hours
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li><strong>Monday - Friday:</strong> 9:00 AM - 6:00 PM IST</li>
          <li><strong>Saturday:</strong> 10:00 AM - 4:00 PM IST</li>
          <li><strong>Sunday:</strong> Closed</li>
          <li><strong>Holidays:</strong> Closed on major holidays</li>
        </ul>
      </motion.section>

      {/* Store Location */}
      <motion.section
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
          📍 Our Store
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-5 rounded-xl shadow-md dark:bg-slate-800"
          >
            <p><strong>Location:</strong> 123 Book Street, Reading City, RC 12345</p>
            <p className="mt-1">
              <strong>Phone:</strong>{" "}
              <a href="tel:+15551234567" className="text-blue-600 underline">
                +1 (555) 123-4567
              </a>
            </p>
            <p className="mt-1">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@bookbazaar.com" className="text-blue-600 underline">
                support@bookbazaar.com
              </a>
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
          ❓ Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.details
              key={idx}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-4 rounded-lg shadow dark:bg-slate-800 open:bg-gray-100 dark:open:bg-slate-700"
            >
              <summary className="cursor-pointer text-lg font-medium">
                {faq.question}
              </summary>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {faq.answer}
              </p>
            </motion.details>
          ))}
        </div>
      </motion.section>

      {/* Contact Form */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-md"
      >
        <h2 className="text-3xl font-semibold mb-6 text-center text-blue-700 dark:text-blue-400">
          💬 Send Us a Message
        </h2>
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-400"
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="message"
            rows="4"
            placeholder="Your Message..."
            value={formData.message}
            onChange={handleChange}
            required
            className="p-3 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-slate-900 focus:ring-2 focus:ring-blue-400"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg transition-all duration-200 self-center"
          >
            Submit
          </motion.button>
        </form>
      </motion.section>
    </main>
  );
};

export default Contact;