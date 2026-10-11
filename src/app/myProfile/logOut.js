"use client";
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export const LogOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <button 
    onClick={handleSignOut} 
    className="text-center bg-red-100 hover:bg-red-100 text-red-600 p-2 rounded-[10px] text-sm font-medium transition-colors border border-red-600 hover:text-red-700 hover:border-red-700"
    >
        <FontAwesomeIcon icon={faRightFromBracket} style={{color: "rgb(251, 8, 8)",}} />
      সাইন আউট
    </button>
  );
};