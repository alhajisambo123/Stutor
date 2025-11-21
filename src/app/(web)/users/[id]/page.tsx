'use client';

import { useState } from 'react';
import useSWR from 'swr';
import Image from 'next/image';
import { FaSignOutAlt } from 'react-icons/fa';
import { BsJournalBookmarkFill } from 'react-icons/bs';
import { GiMoneyStack } from 'react-icons/gi';
import { signOut, useSession } from 'next-auth/react';
import axios from 'axios';
import toast from 'react-hot-toast';

import LoadingSpinner from '../../loading';
import RatingModal from '@/components/RatingModal/RatingModal';
import BackDrop from '@/components/BackDrop/BackDrop';
import { User } from '@/models/user';

const UserDetails = () => {
  const { data: session, status } = useSession();
  const [currentNav, setCurrentNav] = useState<'bookings' | 'amount' | 'ratings'>('bookings');
  const [courseId, setCourseId] = useState<string | null>(null);
  const [isRatingVisible, setIsRatingVisible] = useState(false);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [ratingText, setRatingText] = useState('');

  const toggleRatingModal = () => setIsRatingVisible(prev => !prev);

  // Only fetch user data if session exists
  const fetchUserData = async () => {
    if (!session?.user?.email) return null;
    const { data } = await axios.get<User>('/api/users');
    return data;
  };

  const { data: userData, error: userError, isLoading: loadingUserData } = useSWR(
    session?.user?.email ? '/api/users' : null,
    fetchUserData
  );

  const reviewSubmitHandler = async () => {
    if (!ratingText.trim() || !ratingValue) {
      return toast.error('Please provide a rating text and a rating');
    }
    if (!courseId) return toast.error('Course ID not provided');

    setIsSubmittingReview(true);

    try {
      await axios.post('/api/users', {
        reviewText: ratingText,
        ratingValue,
        courseId,
      });
      toast.success('Review Submitted');
    } catch (err) {
      console.error(err);
      toast.error('Review Failed');
    } finally {
      setRatingText('');
      setRatingValue(null);
      setCourseId(null);
      setIsSubmittingReview(false);
      setIsRatingVisible(false);
    }
  };

  if (status === 'loading' || loadingUserData) return <LoadingSpinner />;
  if (!session) return <p className="text-center mt-10">You must be logged in to view this page.</p>;
  if (userError) return <p className="text-center mt-10 text-red-500">Failed to load user data.</p>;
  if (!userData) return <p className="text-center mt-10">No user data available.</p>;

  return (
    <div className="container mx-auto px-2 md:px-4 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        {/* Sidebar */}
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-28 h-28 md:h-[143px] mx-auto mb-5 rounded-full overflow-hidden">
            <Image
              src={userData.image || '/hero-1.jpeg'}
              alt={userData.name || 'User'}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData.about ?? ''}</p>
          </div>
          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt
              className="text-3xl cursor-pointer"
              onClick={() => signOut({ callbackUrl: '/' })}
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello, {userData.name}</h5>
          </div>

          <p className="text-xs py-2 font-medium">
            Joined In {userData._createdAt.split('T')[0]}
          </p>

          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 mt-7">
            <ol
              className={`${
                currentNav === 'bookings' ? 'text-blue-600' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('bookings')}
                className="inline-flex items-center cursor-pointer"
              >
                <BsJournalBookmarkFill />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>
            <ol
              className={`${
                currentNav === 'amount' ? 'text-blue-600' : 'text-gray-700'
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                onClick={() => setCurrentNav('amount')}
                className="inline-flex items-center cursor-pointer"
              >
                <GiMoneyStack />
                <a className="inline-flex items-center mx-1 md:mx-3 text-xs md:text-sm font-medium">
                  Amount Spent
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Rating Modal */}
      <RatingModal
        isOpen={isRatingVisible}
        ratingValue={ratingValue}
        setRatingValue={setRatingValue}
        ratingText={ratingText}
        setRatingText={setRatingText}
        isSubmittingReview={isSubmittingReview}
        reviewSubmitHandler={reviewSubmitHandler}
        toggleRatingModal={toggleRatingModal}
      />
      <BackDrop isOpen={isRatingVisible} />
    </div>
  );
};

export default UserDetails;
