import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you use react-router-dom for navigation

const Login = () => {
  const navigate = useNavigate();

  // State for form input data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  // State for form status (loading, errors, etc.)
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    success: false,
  });

  // --- Validation Functions ---
  const validateEmail = (email) => {
    if (!email) return "Email address is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email address is invalid.";
    return null;
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 6) return "Password must be at least 6 characters long.";
    return null;
  };

  // --- Event Handlers ---

  // Handle input changes and live validation
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newFormData = {
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    };
    setFormData(newFormData);

    // Clear previous errors on input change
    setFormState(prev => ({ ...prev, errors: { ...prev.errors, [name]: null, submit: null } }));
  };

  // Handle validation on blur for better UX
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
        setFormState(prev => ({ ...prev, errors: { ...prev.errors, email: validateEmail(value) } }));
    }
    if (name === 'password') {
        setFormState(prev => ({ ...prev, errors: { ...prev.errors, password: validatePassword(value) } }));
    }
  }

  // Validate the entire form before submission
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    // Filter out null values
    const validErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));
    setFormState(prev => ({ ...prev, errors: validErrors }));
    return Object.keys(validErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    // Simulate API call
    setTimeout(() => {
      // Example of a successful login
      setFormState(prev => ({ ...prev, loading: false, success: true }));
    }, 2000);
  };

  // --- Redirection on Success ---
  useEffect(() => {
    if (formState.success) {
      const timer = setTimeout(() => {
        navigate('/dashboard'); // Redirect to dashboard or home page
      }, 2500); // Wait 2.5 seconds before redirecting

      return () => clearTimeout(timer); // Cleanup timer on component unmount
    }
  }, [formState.success, navigate]);


  // --- Render Logic ---
  if (formState.success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md p-8 text-center bg-white rounded-2xl shadow-lg"
        >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">You have been successfully logged in.</p>
            <div className='flex flex-col items-center justify-center'>
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <p className="text-sm text-gray-500 mt-2">Redirecting to your dashboard...</p>
            </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your JobPortal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                placeholder="Enter your email"
              />
            </div>
            {formState.errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-600 pt-1">
                <AlertCircle className="w-4 h-4" />
                {formState.errors.email}
              </p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type={formState.showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${formState.errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setFormState(prev => ({ ...prev, showPassword: !prev.showPassword }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {formState.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formState.errors.password && (
              <p className="flex items-center gap-1 text-xs text-red-600 pt-1">
                <AlertCircle className="w-4 h-4" />
                {formState.errors.password}
              </p>
            )}
          </div>
          
          {/* Submit Error */}
          {formState.errors.submit && (
             <div className="flex items-center gap-2 p-3 text-sm text-red-800 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p>{formState.errors.submit}</p>
             </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full flex justify-center items-center gap-2 py-3 px-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300"
          >
            {formState.loading ? (
              <>
                <Loader className="w-6 h-6 animate-spin" />
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:underline">
                Create one here
              </Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
