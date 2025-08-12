import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  CheckCircle,
  AlertCircle,
  Loader,
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  // State for form input data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: '',
    avatar: null,
  });

  // State for form status
  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  // --- Validation Functions ---
  const validateFullName = (name) => !name ? "Full name is required." : null;
  const validateEmail = (email) => {
    if (!email) return "Email address is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email address is invalid.";
    return null;
  };
  const validatePassword = (password) => {
    if (!password) return "Password is required.";
    if (password.length < 8) return "Password must be at least 8 characters long.";
    return null;
  };
  const validateRole = (role) => !role ? "Please select a role." : null;
  const validateAvatar = (file) => {
      if (file && file.size > 5 * 1024 * 1024) { // 5MB limit
          return "File size must be less than 5MB.";
      }
      return null;
  }


  // --- Event Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error on change
    setFormState(prev => ({ ...prev, errors: { ...prev.errors, [name]: null, submit: null } }));
  };

  const handleRoleChange = (role) => {
      setFormData(prev => ({ ...prev, role }));
      setFormState(prev => ({ ...prev, errors: { ...prev.errors, role: null, submit: null } }));
  }

  const handleAvatarChange = (e) => {
      const file = e.target.files[0];
      const error = validateAvatar(file);
      if (error) {
          setFormState(prev => ({ ...prev, errors: { ...prev.errors, avatar: error }}));
          return;
      }

      if (file) {
          setFormData(prev => ({ ...prev, avatar: file }));
          setFormState(prev => ({ ...prev, avatarPreview: URL.createObjectURL(file), errors: { ...prev.errors, avatar: null } }));
      }
  }

  // --- Form Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
        fullName: validateFullName(formData.fullName),
        email: validateEmail(formData.email),
        password: validatePassword(formData.password),
        role: validateRole(formData.role),
        avatar: validateAvatar(formData.avatar),
    };
    const validErrors = Object.fromEntries(Object.entries(newErrors).filter(([_, v]) => v != null));

    if (Object.keys(validErrors).length > 0) {
        setFormState(prev => ({ ...prev, errors: validErrors }));
        return;
    }

    setFormState(prev => ({ ...prev, loading: true, errors: {} }));

    // Simulate API call
    setTimeout(() => {
      setFormState(prev => ({ ...prev, loading: false, success: true }));
      console.log("Account Created:", formData);
    }, 2000);
  };

  // --- Redirection on Success ---
  useEffect(() => {
    if (formState.success) {
      const timer = setTimeout(() => navigate('/login'), 2500);
      return () => clearTimeout(timer);
    }
  }, [formState.success, navigate]);


  // --- Render Logic ---
  if (formState.success) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 text-center bg-white rounded-2xl shadow-lg"
        >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Created!</h2>
            <p className="text-gray-600 mb-6">You can now sign in with your new account.</p>
            <div className='flex flex-col items-center justify-center'>
                <div className="animate-spin w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full"></div>
                <p className="text-sm text-gray-500 mt-2">Redirecting to login page...</p>
            </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg p-8 space-y-6 bg-white rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join thousands of professionals finding their dream jobs</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Full Name *</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} placeholder="Enter your full name"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.fullName ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`} />
            </div>
            {formState.errors.fullName && <p className="flex items-center gap-1 text-xs text-red-600 pt-1"><AlertCircle className="w-4 h-4" />{formState.errors.fullName}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Email Address *</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email"
                className={`w-full pl-10 pr-4 py-3 rounded-lg border ${formState.errors.email ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`} />
            </div>
            {formState.errors.email && <p className="flex items-center gap-1 text-xs text-red-600 pt-1"><AlertCircle className="w-4 h-4" />{formState.errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input type={formState.showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} placeholder="Create a strong password"
                className={`w-full pl-10 pr-12 py-3 rounded-lg border ${formState.errors.password ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition`} />
              <button type="button" onClick={() => setFormState(prev => ({...prev, showPassword: !prev.showPassword}))} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {formState.showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formState.errors.password && <p className="flex items-center gap-1 text-xs text-red-600 pt-1"><AlertCircle className="w-4 h-4" />{formState.errors.password}</p>}
          </div>

          {/* Avatar Upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Profile Picture (Optional)</label>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                {formState.avatarPreview ? (
                  <img src={formState.avatarPreview} alt="Avatar preview" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-8 h-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <input type="file" id="avatar" accept=".jpg,.jpeg,.png" onChange={handleAvatarChange} className="hidden" />
                <label htmlFor="avatar" className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                  <Upload className="w-4 h-4" />
                  <span>Upload Photo</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 5MB.</p>
              </div>
            </div>
             {formState.errors.avatar && <p className="flex items-center gap-1 text-xs text-red-600 pt-1"><AlertCircle className="w-4 h-4" />{formState.errors.avatar}</p>}
          </div>

          {/* Role Selection */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">I am a *</label>
            <div className="grid grid-cols-2 gap-4">
              <button type="button" onClick={() => handleRoleChange('jobseeker')} className={`p-4 rounded-lg border-2 transition-all text-center ${formData.role === 'jobseeker' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                <UserCheck className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Job Seeker</div>
                <div className="text-xs text-gray-500">Looking for opportunities</div>
              </button>
              <button type="button" onClick={() => handleRoleChange('employer')} className={`p-4 rounded-lg border-2 transition-all text-center ${formData.role === 'employer' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}`}>
                <Building2 className="w-8 h-8 mx-auto mb-2" />
                <div className="font-medium">Employer</div>
                <div className="text-xs text-gray-500">Hiring talent</div>
              </button>
            </div>
            {formState.errors.role && <p className="flex items-center gap-1 text-xs text-red-600 pt-1"><AlertCircle className="w-4 h-4" />{formState.errors.role}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={formState.loading} className="w-full flex justify-center items-center gap-2 py-3 px-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-70 transition-all">
            {formState.loading ? (
              <><Loader className="w-6 h-6 animate-spin" /><span>Creating Account...</span></>
            ) : (
              <span>Create Account</span>
            )}
          </button>

          {/* Login Link */}
          <div className="text-center text-sm text-gray-600">
            <p>Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:underline">Sign In</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;
