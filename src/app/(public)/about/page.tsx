import React from 'react';
import { MessageSquare, Lock, Clock, Eye } from 'lucide-react';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className=" min-hscreen overflow-y-auto bg-gray-900 text-white py-16">
      
      <div className="relative max-w-4xl mx-auto mb-20 p-1 rounded-2xl bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500">
        <div className="bg-gray-900 p-12 rounded-2xl">
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            A New Era of Private Conversations
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed">
            In a world where data is permanent and privacy is constantly under threat, we believe in the 
            <span className="font-bold text-purple-400"> power of disappearing messages</span>. 
            Our platform is designed to let you share your thoughts, ideas, and secrets without leaving a trace—unless you choose otherwise.
          </p>
        </div>
      </div>

      
      <div className="max-w-4xl mx-auto mb-20 p-12 rounded-2xl backdrop-blur-lg bg-gray-800/50 border border-gray-700">
        <h2 className="text-3xl font-bold mb-10 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-700/50 rounded-xl transition-all duration-300">
            <MessageSquare className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Vanishing Messages</h3>
            <p className="text-gray-400">Every message you send disappears after being read, ensuring your privacy.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-700/50 rounded-xl transition-all duration-300">
            <Eye className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">Public Secrets</h3>
            <p className="text-gray-400">Want your words to linger? Make them public and see how many likes they gather.</p>
          </div>
          <div className="flex flex-col items-center text-center p-6 hover:bg-gray-700/50 rounded-xl transition-all duration-300">
            <Lock className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold mb-3">End-to-End Encryption</h3>
            <p className="text-gray-400">Your conversations are protected with the highest level of security.</p>
          </div>
        </div>
      </div>

      <div className="relative max-w-4xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/20 transform -skew-y-6"></div>
        <div className="relative bg-gray-800/50 p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-6">Why We Built This</h2>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            We believe that <span className="font-bold text-purple-400">not every conversation needs to be permanent</span>. 
            Some thoughts are meant to be shared in the moment and then forgotten. Whether it's an inside joke, 
            a fleeting idea, or a secret confession, our app lets you communicate freely—without the fear of 
            messages being saved, screenshotted, or resurfaced in the future.
          </p>
          <div className="border-l-4 border-purple-500 pl-6 mb-8">
            <h3 className="text-2xl font-bold mb-4">Your Words, Your Control</h3>
            <p className="text-gray-300">
              Here, <span className="font-bold text-blue-400">you decide the fate of your messages</span>. 
              Vanish instantly or linger for a while—it's all in your hands.
            </p>
          </div>
          <div className="text-center mt-12">
            <Link href={"/dashboard"}>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full text-lg hover:opacity-90 transition-opacity flex items-center mx-auto">
              Start Sharing Today
              <Clock className="ml-2 w-5 h-5" />
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;