'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { AiOutlineFile } from 'react-icons/ai';
import { FaPaperPlane } from 'react-icons/fa';
import { BsFillInfoCircleFill } from 'react-icons/bs';

interface TeacherProps {}

const Teacher: React.FC<TeacherProps> = () => {
  const router = useRouter();
  const [resume, setResume] = useState<File | null>(null);
  const [requestStatus, setRequestStatus] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Pinata API details
  const pinataEndpoint = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
  const pinataAPIKey = 'ba943b167d821f1de695';
  const pinataAPISecret =
    '86eeb88f5c80cd00ca3d14945e2d4eecd0454938752711a5f65564dfb38fc84f';

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setResume(file);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  // Upload file to IPFS
  const uploadToIPFS = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    const headers = {
      pinata_api_key: pinataAPIKey,
      pinata_secret_api_key: pinataAPISecret,
    };
    try {
      const response = await axios.post(pinataEndpoint, formData, {
        headers: headers,
      });
      return `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
    } catch (error) {
      console.error('Error uploading to IPFS', error);
      setRequestStatus('Error uploading resume to IPFS.');
      return null;
    }
  };

  // Send request to admin with resume IPFS link
  const sendRequest = async () => {
    if (!resume) {
      alert('Please upload a resume.');
      return;
    }

    setIsUploading(true);
    const ipfsLink = await uploadToIPFS(resume);
    if (ipfsLink) {
      try {
        await addDoc(collection(db, 'requests'), {
          ipfsLink: ipfsLink,
          status: 'pending',
        });
        alert('Request sent successfully!');
        setResume(null);
        setRequestStatus('Request sent successfully.');
      } catch (error) {
        console.error('Error sending request:', error);
        setRequestStatus('Error sending request.');
      }
    }
    setIsUploading(false);
  };

  // Handle navigation
  const handlePublish = () => {
    router.push('/publish');
  };

  const handleHome = () => {
    router.push('/');
  };

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
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2ecc71] mb-12 drop-shadow-[2px_2px_1px_#000]">
          Teacher Panel
        </h1>

        {/* Navigation Buttons */}
        <div className="flex justify-between mb-12">
          <button
            onClick={handleHome}
            className="px-4 py-2 font-bold text-white bg-[#27ae60] border-4 border-[#8b4513] rounded-none hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] transition-all duration-200 transform hover:-translate-y-1"
          >
            Home
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 font-bold text-white bg-[#27ae60] border-4 border-[#8b4513] rounded-none hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] transition-all duration-200 transform hover:-translate-y-1"
          >
            Publish
          </button>
        </div>

        {/* Request Form */}
        <div className="max-w-xl mx-auto p-8 bg-[#27ae60] border-4 border-[#8b4513] rounded-none shadow-[4px_4px_0_#000]">
          <h2 className="text-2xl font-bold text-[#ffffff] mb-6 drop-shadow-[2px_2px_1px_#000]">
            Send Request to Admin
          </h2>
          <div className="flex items-center mb-6">
            <AiOutlineFile className="mr-3 text-[#3498db] drop-shadow-[1px_1px_1px_#000]" size={24} />
            <input
              type="file"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full p-4 text-[#ffffff] bg-[#1e8449] border-2 border-[#8b4513] rounded-none"
            />
          </div>
          <button
            onClick={sendRequest}
            className="flex items-center justify-center w-full py-3 font-bold text-[#ffffff] bg-[#2ecc71] border-2 border-[#8b4513] rounded-none hover:bg-[#27ae60] hover:shadow-[4px_4px_0_#000] transition-all duration-200 transform hover:-translate-y-1"
            disabled={isUploading}
          >
            <FaPaperPlane className="mr-3" size={20} />
            {isUploading ? 'Uploading...' : 'Send Request'}
          </button>
          {requestStatus && (
            <p className="mt-4 text-center text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
              {requestStatus}
            </p>
          )}
        </div>

        {/* Note Box */}
        <div className="max-w-md mx-auto mt-12 p-6 bg-[#27ae60] border-4 border-[#8b4513] rounded-none shadow-[4px_4px_0_#000]">
          <div className="flex items-center">
            <BsFillInfoCircleFill className="mr-3 text-[#2ecc71] drop-shadow-[1px_1px_1px_#000]" size={30} />
            <p className="text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
              Submit your content publishing request to the admin here to share your educational materials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;