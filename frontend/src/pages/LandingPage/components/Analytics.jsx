import React from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Target, TrendingUp } from 'lucide-react';

const Analytics = () => {
  // Data for the analytics cards
  const stats = [
    {
      icon: Users,
      value: "2.4M+",
      label: "Active Users",
      percentage: "+15%",
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      icon: Briefcase,
      value: "150K+",
      label: "Jobs Posted",
      percentage: "+22%",
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      icon: Target,
      value: "89K+",
      label: "Successful Hires",
      percentage: "+18%",
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-100",
      badgeColor: "bg-green-100 text-green-800",
    },
    {
      icon: TrendingUp,
      value: "94%",
      label: "Match Rate",
      percentage: "+8%",
      iconColor: "text-red-600",
      bgColor: "bg-red-100",
      badgeColor: "bg-green-100 text-green-800",
    },
  ];

  // Animation variants
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <section className='py-20 bg-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className='text-center mb-16'
        >
          <h2 className='text-4xl md:text-5xl font-bold text-gray-900 mb-4'>
            Platform <span className='text-blue-600'>Analytics</span>
          </h2>
          <p className='text-lg text-gray-500 max-w-2xl mx-auto'>
            Real-time insights and data-driven results that showcase the power of our platform in connecting talent with opportunities.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className='bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden'
            >
              <div className='flex justify-between items-start mb-4'>
                {/* Icon */}
                <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                {/* Percentage Badge */}
                <div className={`px-2.5 py-1 text-sm font-semibold rounded-full ${stat.badgeColor}`}>
                  {stat.percentage}
                </div>
              </div>
              {/* Stat Value */}
              <h3 className='text-4xl font-bold text-gray-900 mb-1'>
                {stat.value}
              </h3>
              {/* Stat Label */}
              <p className='text-gray-500'>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Analytics;
