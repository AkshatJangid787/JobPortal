import React from 'react';
// Assuming your data file exports icons from a library like lucide-react
import { employerFeatures, jobSeekerFeatures } from "../../../utils/data";
import { motion } from 'framer-motion';

const Features = () => {
  // Animation variants for staggering children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className='py-20 bg-white'>
      <div className='container mx-auto px-4'>
        {/* Main Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight'>
            Everything You Need to
            <span className='block text-purple-600 mt-2'>
              Succeed
            </span>
          </h2>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
            Whether you're looking for your next opportunity or the perfect candidate, we have the tools and features to make it happen.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 max-w-6xl mx-auto'>

          {/* Job Seekers Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className='space-y-10'
          >
            <div className='text-center md:text-left'>
                <h3 className='text-2xl font-bold text-gray-800 inline-block'>For Job Seekers</h3>
                <div className='w-full h-1 bg-blue-600 rounded mt-2 max-w-[100px] mx-auto md:mx-0'></div>
            </div>
            {jobSeekerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='flex items-start gap-5'
              >
                <div className='flex-shrink-0 w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center'>
                  <feature.icon className='w-6 h-6 text-blue-600' />
                </div>
                <div>
                  <h4 className='text-lg font-bold text-gray-900 mb-1'>
                    {feature.title}
                  </h4>
                  <p className='text-gray-500 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Employers Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className='space-y-10'
          >
            <div className='text-center md:text-left'>
                <h3 className='text-2xl font-bold text-gray-800 inline-block'>For Employers</h3>
                <div className='w-full h-1 bg-purple-600 rounded mt-2 max-w-[100px] mx-auto md:mx-0'></div>
            </div>
            {employerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className='flex items-start gap-5'
              >
                <div className='flex-shrink-0 w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center'>
                  <feature.icon className='w-6 h-6 textA-purple-600' />
                </div>
                <div>
                  <h4 className='text-lg font-bold text-gray-900 mb-1'>
                    {feature.title}
                  </h4>
                  <p className='text-gray-500 leading-relaxed'>
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
