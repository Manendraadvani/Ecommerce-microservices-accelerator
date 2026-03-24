import React from "react";
import readingSvg from "../assets/reading-illustrations.svg";
import { motion } from "framer-motion";

const About = () => {
  const features = [
    {
      icon: "🏗️",
      title: "Composable Architecture",
      description: "Powered by Java, JavaScript, or Python microservices and a modern React/Redux front end."
    },
    {
      icon: "🤖",
      title: "AI-Driven Customer Experience",
      description: "Integrated Coveo search and product recommendations for personalized shopping."
    },
    {
      icon: "📝",
      title: "Marketing Agility",
      description: "Headless CMS options to empower teams to create content without developer bottlenecks."
    },
    {
      icon: "☁️",
      title: "Cloud-Native Scalability",
      description: "Deployed on AWS using containers and event-driven messaging."
    },
    {
      icon: "🚀",
      title: "Speed to Market",
      description: "Built-in CI/CD pipelines for automated testing, deployment, and iteration."
    },
    {
      icon: "💰",
      title: "Lower Total Cost",
      description: "Scale on demand and only pay for what you use with cloud-native infrastructure."
    }
  ];

  const businessValues = [
    {
      icon: "⚡",
      title: "Faster Time to Value",
      description: "Launch new commerce capabilities in weeks, not months."
    },
    {
      icon: "💵",
      title: "Lower Total Cost of Ownership",
      description: "Scale on demand and only pay for what you use."
    },
    {
      icon: "🎯",
      title: "Customer-Centric Experiences",
      description: "Deliver personalized, AI-powered journeys that increase engagement and conversion."
    },
    {
      icon: "🎨",
      title: "Marketing Independence",
      description: "Give your marketers control of content updates without writing code."
    },
    {
      icon: "🔮",
      title: "Future-Proof Flexibility",
      description: "Easily swap or upgrade components as your business grows."
    }
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-16 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <motion.section
        aria-labelledby="about-heading"
        className="grid lg:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.img
          src={readingSvg}
          alt="E-Commerce Accelerator Illustration"
          className="w-full rounded-xl shadow-xl object-contain max-h-[400px] mx-auto"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        />

        <div>
          <h1 id="about-heading" className="text-4xl font-bold mb-6 text-center lg:text-left">
            About BookBazaar
          </h1>
          <div className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-center lg:text-left">
            <p className="mb-4">
              Looking to launch faster, scale smarter, and deliver standout customer experiences? 
              Our e-commerce accelerator is designed to help you do just that.
            </p>
            <p>
              Built on proven <strong>MACH principles</strong> (Microservices, API-first, Cloud-native, Headless), 
              this accelerator gives you a future-ready foundation to rapidly build and evolve digital commerce 
              experiences—without getting stuck in legacy complexity.
            </p>
          </div>
          <blockquote className="italic text-blue-600 dark:text-blue-400 mt-4 border-l-4 pl-4 border-blue-500 dark:border-blue-400">
            "Accelerate Innovation with a Modern, Modular E-Commerce Accelerator"
          </blockquote>
        </div>
      </motion.section>

      {/* What's Inside Section */}
      <motion.section
        className="mt-20 bg-gradient-to-r from-cyan-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 py-12 px-6 rounded-xl shadow-xl"
        aria-labelledby="features-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2
          id="features-heading"
          className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white"
        >
          🔧 What's Inside
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-lg shadow hover:shadow-lg transition duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      
      {/* Business Value Section */}
      <motion.section
        className="mt-20 bg-gradient-to-r from-green-50 to-indigo-100 dark:from-slate-800 dark:to-slate-700 py-12 px-6 rounded-xl shadow-xl"
        aria-labelledby="features-heading"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2
          id="value-heading"
          className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white"
        >
          💼 The Business Value
        </h2>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {businessValues.map((value, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </main>
  );
};

export default About;