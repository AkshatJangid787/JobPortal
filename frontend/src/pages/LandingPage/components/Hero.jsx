import { delay, motion } from 'framer-motion'
import { ArrowRight, Users, Building2, TrendingUp, SearchIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
    const isAuthenticated = true;
    const user = {
        fullName: "Alex",
        role: "employer"
    }

    const navigate = useNavigate();

    const state = [
        { icon: Users, label: 'Active Users', value: '2.4M+' },
        { icon: Users, label: 'Companies', value: '50K+' },
        { icon: Users, label: 'Jobs Posted', value: '150K+' }
    ];


    return (
        <section className='pt-24 pb-16 bg-white min-h-screen flex items-center'>
            <div className='container mx-auto px-4'>
                <div className='max-w-4xl mx-auto text-center'>
                    {/* main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-5xl  lg:text-6xl font-bold text-gray-900 mb-6 leading-tight pt-10"
                    >
                        Find Your Dream Job or
                        <span className='block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mt-2'>
                            Perfect Hire
                        </span>
                    </motion.h1>

                    {/* subheading */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className='text-xl md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed'
                    >
                        Connect talented professionnals with innovative companies.
                        Your next career move or perfect candidate is just one click away.
                    </motion.p>

                    {/*  CTA Button*/}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-16'
                    >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2'
                            onClick={() => {
                                navigate("/find-jobs")
                            }}
                        >
                            <SearchIcon className='w-5 h-5' />
                            <span>Find Jobs</span>
                            <ArrowRight className='w-5 h-5 group-hover:translate-x-1 transition-transform' />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2'
                            onClick={() => {
                                navigate(isAuthenticated && user?.role === "employer"
                                    ? "/employer-dashboard"
                                    : "/login"
                                )
                            }}
                        >
                            Post a Job
                        </motion.button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto"
                    >
                        {state.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + index * 0.2, duration: 0.8 }}
                                className="flex flex-col items-center p-6 rounded-xl hover:bg-gray-50 transition-colors duration-300 shadow-sm"
                            >
                                {/* Icon Box */}
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl flex items-center justify-center mb-3">
                                    <item.icon className="w-6 h-6 text-blue-600" />
                                </div>

                                {/* Label */}
                                <span className="text-lg font-semibold text-gray-900">{item.label}</span>

                                {/* Value */}
                                <span className="text-sm text-gray-600 font-medium">{item.value}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>

            {/* Subtle background Elements */}
            <div className='absolute inset-0 overflow-hidden pointer-events-none'>
                <div className='absolute top-20 left-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-30' />
                <div className='absolute bottom-20 right-10 w-10 h-40 bg-purple-100 rounded-full blur-3xl opacity-30' />
                <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full blur-3xl opacity-20' />
            </div>
        </section>
    )
}

export default Hero