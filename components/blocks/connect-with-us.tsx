import React from 'react';
import Image from 'next/image';
import { Facebook, Twitter, Linkedin } from 'lucide-react';

export default function ConnectWithUs() {
  const images = [
    { src: '/blocks/yali-work.jpeg', alt: 'yali work' },
    { src: '/blocks/yali-impact.jpeg', alt: 'yali impact' },
    { src: '/blocks/yali-capacity.jpeg', alt: 'yali capacity' },
    { src: '/blocks/yali-inclusive.jpeg', alt: 'yali inclusive' },
  ];

  return (
    <div className="bg-white p-8 mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-800">Connect with us</h2>
          <div className="flex space-x-4">
            <a href="#" className="p-3 bg-primary text-white rounded-full hover:bg-green-800 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="p-3 bg-primary text-white rounded-full hover:bg-green-800 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 bg-primary text-white rounded-full hover:bg-green-800 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {images.map((img, index) => (
            <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
              <Image
                src={img.src}
                alt={img.alt}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}