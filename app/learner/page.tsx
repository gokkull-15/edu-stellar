'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FaFilePdf, FaSearch, FaHome } from 'react-icons/fa';

interface Course {
  id: string;
  courseName?: string;
  description?: string;
  pdfUrl?: string;
}

const LearnerHome: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, 'courses'));
        const courseData: Course[] = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(courseData);
        setLoading(false);
        setTimeout(() => {
          setIsVisible(true);
        }, 100);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.courseName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewPdf = (e: React.MouseEvent<HTMLAnchorElement>, pdfUrl?: string) => {
    if (!pdfUrl) {
      e.preventDefault();
      alert('PDF is not available for this course.');
    }
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
          className="absolute w-32 h-16 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjUwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0wIDI1QzAgMTAgMjAgMCA0MCAwQzYwIDAgODAgMTAgMTAwIDI1QzEwMCA0MCA4MCA1MCA6MCA1MEM0MCA1MCAyMCA0MCAwIDI1eiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==')] bg-cover animate-cloud"
          style={{ top: '20%', animationDelay: '5s' }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 container px-4 py-16 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#2ecc71] drop-shadow-[2px_2px_1px_#000]">
            Published Courses
          </h1>
          <button
            onClick={() => router.push('/')}
            className="flex items-center px-4 py-2 text-white bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] transform hover:-translate-y-1"
          >
            <FaHome className="mr-2 text-[#3498db]" />
            <span>Home</span>
          </button>
        </div>

        {/* Search Section */}
        <div className="mx-auto mt-6 mb-10 max-w-md">
          <div className="relative overflow-hidden border-ee border-[#8b4513] bg-[#27ae60] rounded-none">
            <input
              type="text"
              placeholder="Search for a course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-5 text-white bg-transparent focus:outline-none placeholder-[#ffffff] text-sm"
            />
            <FaSearch className="absolute transform -translate-y-1/2 text-[#3498db] right-4 top-1/2" />
          </div>
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-[#2ecc71] border-t-[#3498db] rounded-full animate-spin"></div>
            <p className="mt-4 text-[#2ecc71] drop-shadow-[1px_1px_1px_#000]">Loading courses...</p>
          </div>
        )}

        {/* Course Grid */}
        {!loading && (
          <div>
            {filteredCourses.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <p className="text-xl text-[#2ecc71] drop-shadow-[1px_1px_1px_#000]">
                  No courses available.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course, index) => (
                  <div
                    key={course.id}
                    className={`transform transition-all duration-500 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                    onMouseEnter={() => setHoveredCard(course.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className="relative flex flex-col h-full p-6 bg-[#27ae60] border-4 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[4px_4px_0_#000] group transform hover:-translate-y-1">
                      <div
                        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMjdlYzcxIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjwvc3ZnPg==')] opacity-0 group-hover:opacity-100 transition-opacity"
                      ></div>
                      <h2 className="mb-4 text-xl font-bold text-[#ffffff] drop-shadow-[2px_2px_1px_#000]">
                        {course.courseName}
                      </h2>
                      <p className="flex-grow mb-4 text-sm text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
                        {course.description}
                      </p>
                      <a
                        href={course.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => handleViewPdf(e, course.pdfUrl)}
                        className="flex items-center justify-center w-full py-2 text-sm text-[#ffffff] bg-[#3498dbAverage] border-2 border-[#8b4513] rounded-none transition-all duration-200 hover:bg-[#2ecc71] hover:shadow-[2px_2px_0_#000] group-hover:scale-105"
                      >
                        <FaFilePdf className="mr-2 text-[#ffffff]" />
                        View Course PDF
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="py-10 mt-16 text-center text-[#ffffff] drop-shadow-[1px_1px_1px_#000]">
          <p>© 2025 ChainED. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LearnerHome;