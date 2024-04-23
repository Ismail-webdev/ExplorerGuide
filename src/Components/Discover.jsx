import React from "react";
import img from "../assets/discover.jpg";
import { HashLink } from "react-router-hash-link";

const Discover = () => {
  return (
    <section className="py-24" id="discover">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-6 space-y-8 lg:space-y-0 lg:space-x-32">
        <img src={img} alt="India" className="max-w-full h-96 lg:w-1/2 shadow-md rounded-md" loading="lazy"/>
        <div className="text-left">
          <h2 className="text-4xl font-heading mb-5 leading-tight">Discover India</h2>
          <p className="mb-5 text-gray-800">
            India is a country like no other, offering a diverse range of experiences for travelers. From bustling cities to serene countryside, delicious cuisine, rich history, and vibrant culture, there&apos;s something for everyone in India. Here are just a few reasons why you should consider visiting India:
          </p>
          <ul className="list-disc text-gray-800 list-inside">
            <li>Explore ancient temples, palaces, and forts that tell stories of centuries gone by.</li>
            <li>Experience the colorful festivals, such as Diwali, Holi, and Navaratri, which showcase the spirit of Indian culture.</li>
            <li>Savor mouthwatering dishes from different regions, each with its unique flavors and ingredients.</li>
            <li>Discover the natural beauty of the Himalayas, beaches, deserts, and wildlife sanctuaries.</li>
            <li>Meet warm and welcoming people who will make you feel at home.</li>
          </ul>
          <button
            className="mt-5 bg-indigo-800 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            <HashLink smooth to="#travel">Explore Now</HashLink>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Discover;