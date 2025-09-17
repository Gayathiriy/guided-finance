import React, { useState } from 'react';
import { UserProfileForm } from '@/components/UserProfileForm';
import { Dashboard } from '@/pages/Dashboard';

interface UserProfile {
  name: string;
  userType: 'student' | 'professional';
  age: string;
  income: string;
  goals: string;
}

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleProfileComplete = (profile: UserProfile) => {
    setUserProfile(profile);
  };

  const handleProfileEdit = () => {
    setShowProfile(true);
  };

  const handleProfileUpdate = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowProfile(false);
  };

  if (showProfile || !userProfile) {
    return (
      <UserProfileForm 
        onProfileComplete={showProfile ? handleProfileUpdate : handleProfileComplete} 
      />
    );
  }

  return (
    <Dashboard 
      profile={userProfile} 
      onProfileEdit={handleProfileEdit} 
    />
  );
};

export default Index;
