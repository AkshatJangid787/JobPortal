import React from 'react';
import { Briefcase, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='bg-gray-100 border-t border-gray-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex flex-col items-center text-center'>
          {/* Logo */}
          <div className='flex items-center gap-2 mb-4'>
            <div className='w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center'>
              <Briefcase className='w-6 h-6 text-white' />
            </div>
            <span className='text-2xl font-bold text-gray-900'>JobPortal</span>
          </div>

          {/* Taglines */}
          <p className='text-gray-600 max-w-md'>
            Connecting talented professionals with innovative companies worldwide.
          </p>
          <p className='text-gray-600 mt-1'>
            Your career success is our mission.
          </p>

          {/* Copyright and Credits */}
          <div className='mt-6 text-sm text-gray-500'>
            <p>© {new Date().getFullYear()} Time To Program. All rights reserved.</p>
            <p className='flex items-center justify-center gap-1 mt-1'>
              Made with <Heart className='w-4 h-4 text-red-500' /> Happy Coding
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
