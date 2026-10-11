"use client";
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function UserNav({ session }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <span>স্বাগতম, {session.user.name}</span>
        <span className="text-xs">▼</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50 flex flex-col gap-3">
          <div className="border-b border-gray-100 pb-2">
            <p className="font-semibold text-gray-800">{session.user.name}</p>
            <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Link 
              href="/myProfile" 
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              আমার প্রোফাইল
            </Link>
            <button 
              onClick={() => { signOut(); router.push("/"); router.refresh();
              }}
              className="w-full text-center bg-red-50 hover:bg-red-100 text-red-600 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <FontAwesomeIcon icon={faRightFromBracket} style={{ color: "rgb(251, 8, 8)" }} />
              লগআউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
}