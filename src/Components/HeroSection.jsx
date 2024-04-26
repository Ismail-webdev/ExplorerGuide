import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';
import axios from 'axios';

const HeroSection = () => {
  return (
    <div className="min-h-screen flex">
      <section className="bg-cover bg-center py-16 sm:py-32 w-full bg object-cover">
        <div className="container mx-auto text-white">
          <div className="flex flex-col items-center justify-between sm:flex-row sm:items-start">
            <div className="w-full sm:w-1/2 sm:text-left">
              <h1 className="text-3xl sm:text-5xl font-medium mb-4 sm:mb-6 font-poppins">Welcome to Explorer Guide</h1>
              <p className="text-lg sm:text-xl mb-6 sm:mb-12">Explore ancient temples, majestic palaces, vibrant cultures, and breathtaking landscapes.</p>
              <div className="text-center">
                <HashLink to="#discover" smooth>
                  <button className="bg-indigo-800 text-white py-3 px-8 rounded-full hover:bg-indigo-700">Discover</button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HeroSection;
