import React, { useState } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { BudgetAnalyzer } from '@/components/BudgetAnalyzer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageCircle, Calculator, TrendingUp, Target, User, Settings } from 'lucide-react';

interface UserProfile {
  name: string;
  userType: 'student' | 'professional';
  age: string;
  income: string;
  goals: string;
}

interface DashboardProps {
  profile: UserProfile;
  onProfileEdit: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, onProfileEdit }) => {
  const [activeTab, setActiveTab] = useState('chat');

  const quickStats = [
    {
      label: 'Profile Type',
      value: profile.userType === 'student' ? 'Student' : 'Professional',
      icon: User,
      color: 'text-primary'
    },
    {
      label: profile.userType === 'student' ? 'Monthly Budget' : 'Annual Income',
      value: `$${parseInt(profile.income).toLocaleString()}`,
      icon: TrendingUp,
      color: 'text-finance-green'
    },
    {
      label: 'Age',
      value: profile.age,
      icon: Target,
      color: 'text-secondary'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground shadow-elegant">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Welcome back, {profile.name}!</h1>
              <p className="text-primary-foreground/80 mt-1">
                Your personal finance assistant is ready to help
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={onProfileEdit}
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Settings className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-4 shadow-card bg-gradient-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </Card>
          ))}
        </div>

        {/* Goals Card */}
        {profile.goals && (
          <Card className="p-6 mb-8 shadow-card bg-gradient-card">
            <div className="flex items-start gap-3">
              <Target className="w-6 h-6 text-accent mt-1" />
              <div>
                <h3 className="text-lg font-semibold mb-2">Your Financial Goals</h3>
                <p className="text-muted-foreground leading-relaxed">{profile.goals}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Budget Analyzer
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-0">
            <Card className="shadow-elegant overflow-hidden">
              <ChatInterface userType={profile.userType} />
            </Card>
          </TabsContent>

          <TabsContent value="budget" className="space-y-0">
            <BudgetAnalyzer userType={profile.userType} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};