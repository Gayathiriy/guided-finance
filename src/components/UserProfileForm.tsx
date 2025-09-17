import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Briefcase, Target, DollarSign } from 'lucide-react';

interface UserProfile {
  name: string;
  userType: 'student' | 'professional';
  age: string;
  income: string;
  goals: string;
}

interface UserProfileFormProps {
  onProfileComplete: (profile: UserProfile) => void;
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({ onProfileComplete }) => {
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    userType: 'student',
    age: '',
    income: '',
    goals: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onProfileComplete(profile);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 shadow-elegant bg-gradient-card">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to FinanceAI</h1>
          <p className="text-muted-foreground">Let's personalize your financial journey</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">What's your name?</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-4">
            <Label>I am a...</Label>
            <RadioGroup
              value={profile.userType}
              onValueChange={(value) => setProfile(prev => ({ ...prev, userType: value as 'student' | 'professional' }))}
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="student" id="student" />
                <Label htmlFor="student" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <div>
                    <div className="font-medium">Student</div>
                    <div className="text-xs text-muted-foreground">Learning to manage finances</div>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="professional" id="professional" />
                <Label htmlFor="professional" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Briefcase className="w-5 h-5 text-secondary" />
                  <div>
                    <div className="font-medium">Professional</div>
                    <div className="text-xs text-muted-foreground">Building wealth and planning ahead</div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={profile.age}
                onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                placeholder="25"
                min="16"
                max="100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">
                {profile.userType === 'student' ? 'Monthly Budget' : 'Annual Income'}
              </Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="income"
                  type="number"
                  value={profile.income}
                  onChange={(e) => setProfile(prev => ({ ...prev, income: e.target.value }))}
                  placeholder={profile.userType === 'student' ? '1000' : '60000'}
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Financial Goals</Label>
            <Textarea
              id="goals"
              value={profile.goals}
              onChange={(e) => setProfile(prev => ({ ...prev, goals: e.target.value }))}
              placeholder={
                profile.userType === 'student' 
                  ? "Build emergency fund, pay off student loans, start investing..."
                  : "Save for house down payment, maximize retirement savings, invest in stocks..."
              }
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-elegant transition-all">
            Start Your Financial Journey
          </Button>
        </form>
      </Card>
    </div>
  );
};