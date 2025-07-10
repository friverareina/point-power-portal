
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Star, Gift, Target, History, Award, Zap, Calendar, TrendingUp, ShoppingBag } from 'lucide-react';
import { AccountOverview } from '@/components/AccountOverview';
import { RewardsCatalog } from '@/components/RewardsCatalog';
import { TransactionHistory } from '@/components/TransactionHistory';
import { ChallengeCenter } from '@/components/ChallengeCenter';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    points: 12350,
    tier: "Gold",
    nextTier: "Platinum",
    pointsToNextTier: 2650,
    memberSince: "2021",
    avatar: "/placeholder.svg"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LoyaltyPlus</h1>
                <p className="text-sm text-gray-600">Rewards Program</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Current Balance</p>
                <p className="text-2xl font-bold text-purple-600">{userData.points.toLocaleString()} pts</p>
              </div>
              <Avatar className="w-12 h-12">
                <AvatarImage src={userData.avatar} />
                <AvatarFallback className="bg-purple-100 text-purple-600">
                  {userData.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData.name}!</h2>
          <p className="text-gray-600">Manage your rewards and discover new ways to earn points</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 backdrop-blur-sm">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Gift className="w-4 h-4" />
              <span>Rewards</span>
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Challenges</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2">
              <History className="w-4 h-4" />
              <span>History</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AccountOverview userData={userData} />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <RewardsCatalog userPoints={userData.points} />
          </TabsContent>

          <TabsContent value="challenges" className="space-y-6">
            <ChallengeCenter userPoints={userData.points} />
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <TransactionHistory />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
