'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap } from 'lucide-react';
import { FaChalkboardTeacher, FaInfoCircle, FaCheckCircle, FaBook, FaQuestionCircle } from 'react-icons/fa';

interface FAQ {
  question: string;
  answer: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs: FAQ[] = [
    {
      question: 'How does ChainED ensure content quality?',
      answer:
        'ChainED ensures quality by verifying the teacher’s credentials through the admin before allowing them to publish content. This process maintains the authenticity of educational materials.',
    },
    {
      question: 'What role does IPFS play in ChainED?',
      answer:
        'IPFS is used to store documentation as hashes temporarily. After admin approval, this metadata is stored securely on smart contracts in Avalanche and Ethereum blockchains.',
    },
    {
      question: 'Is ChainED suitable for all types of learners?',
      answer:
        'Yes, ChainED provides personalized courses and interactive learning materials that cater to various learning styles and needs, making it suitable for everyone.',
    },
  ];

  return (
    <div className="min-h-screen bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMzNDk4ZGIiLz4KPC9zdmc+')] bg-cover bg-fixed font-['Press_Start_2P'] text-white">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
        .animate-cloud {
          animation: moveCloud 20s linear infinite;
        }
        @keyframes moveCloud {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
      `}</style>

      {/* Animated pixelated clouds */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute w-24 h-12 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDI1QzAgMTAgMjAgMCA0MCAwQzYwIDAgODAgMTAgMTAwIDI1QzEwMCA0MCA4MCA1MCA2MCA1MEM0MCA1MCAyMCA0MCAwIDI1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-cover animate-cloud"
          style={{ top: '10%' }}
        ></div>
        <div
          className="absolute w-32 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDI1QzAgMTAgMjAgMCA0MCAwQzYwIDAgODAgMTAgMTAwIDI1QzEwMCA0MCA4MCA1MCA2MCA1MEM0MCA1MCAyMCA0MCAwIDI1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-cover animate-cloud"
          style={{ top: '20%', animationDelay: '5s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container px-4 py-16 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]">
            Welcome to ChainED
          </h1>
          <button
            onClick={() => router.push('/donation')}
            className="p-3 bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] text-[#ffffff] text-sm font-bold drop-shadow-[1px_1px_1px_#000] transform hover:-translate-y-1"
          >
            Donation
          </button>
        </div>

        {/* Learner and Teacher Boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Learner Box */}
          <button
            onClick={() => router.push('/learner')}
            className="relative flex flex-col items-center justify-center p-8 bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] group transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMjdlYzcxIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <GraduationCap className="w-12 h-12 mb-4 text-[#3498db] group-hover:text-[#3498db] drop-shadow-[2px_2px_1px_#000]" />
            <h2 className="mb-4 text-xl font-bold text-[#ffffff] drop-shadow-[2px_2px_1px_#000]">
              I'm a Learner
            </h2>
            <p className="max-w-md text-center text-[#ffffff] text-sm">
              Start your learning journey with pixel-perfect courses and interactive quests.
            </p>
          </button>

          {/* Teacher Box */}
          <button
            onClick={() => router.push('/teacher')}
            className="relative flex flex-col items-center justify-center p-8 bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] group transform hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMjdlYzcxIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <FaChalkboardTeacher className="w-12 h-12 mb-4 text-[#3498db] group-hover:text-[#3498db] drop-shadow-[2px_2px_1px_#000]" />
            <h2 className="mb-4 text-xl font-bold text-[#ffffff] drop-shadow-[2px_2px_1px_#000]">
              I'm a Teacher
            </h2>
            <p className="max-w-md text-center text-[#ffffff] text-sm">
              Craft epic courses, guide adventurers, and share your wisdom in a pixel world.
            </p>
          </button>
        </div>

        {/* About Section */}
        <div className="mb-16">
          <div className="flex items-center justify-start">
            <FaInfoCircle className="w-8 h-8 mr-3 text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]" />
            <h2 className="text-3xl font-bold text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]">About ChainED</h2>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-2/3 p-6 bg-[#27ae60] border-4 border-[#8b4513] rounded-none">
              <p className="mb-6 text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
                <FaCheckCircle className="inline-block mr-2 text-[#3498db]" />
                <span className="font-bold">Our platform offers pixelated courses</span>, interactive quests, and a treasure trove of tools for every adventurer’s needs. All content is crafted by master educators, ensuring legendary quality.
              </p>
              <p className="mb-6 text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
                <FaBook className="inline-block mr-2 text-[#3498db]" />
                <span className="font-bold">ChainED</span> offers a forest of learning materials, ensuring heroes receive epic education. Whether you seek lore or skills, you’ll find your path.
              </p>
              <p className="text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
                <FaChalkboardTeacher className="inline-block mr-2 text-[#3498db]" />
                Our teachers are master guild members, delivering high-quality, thrilling lessons. Join <span className="text-[#2ecc71]">ChainED</span> and embark on a quest for knowledge.
              </p>
            </div>
            <iframe
              src="https://lottie.host/embed/1e40e773-96ae-4f5a-92e8-e2340d758069/gt3xOR4uy7.lottie"
              className="w-full md:w-1/3 h-[300px] md:h-[400px] bg-[#27ae60] border-4 border-[#8b4513] rounded-none shadow-[4px_4px_0_#000]"
              title="About Animation"
            ></iframe>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="flex items-center justify-start mb-6">
            <FaQuestionCircle className="w-8 h-8 mr-3 text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]" />
            <h2 className="text-3xl font-bold text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]">Frequent FAQs</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="relative p-6 bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:shadow-[4px_4px_0_#000]"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="flex items-center justify-between w-full text-left text-[#ffffff] drop-shadow-[1px_1px_1px_#000]"
                >
                  <span className="text-lg font-bold">{faq.question}</span>
                  <span className="text-xl">{openFAQ === index ? '-' : '+'}</span>
                </button>
                {openFAQ === index && (
                  <p className="mt-4 text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;