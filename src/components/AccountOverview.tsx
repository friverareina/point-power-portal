
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Gift, Zap, Calendar, Award, TrendingUp, Target } from 'lucide-react';

interface UserData {
  name: string;
  points: number;
  tier: string;
  nextTier: string;
  pointsToNextTier: number;
  memberSince: string;
}

interface AccountOverviewProps {
  userData: UserData;
}

export const AccountOverview: React.FC<AccountOverviewProps> = ({ userData }) => {
  const tierProgress = ((15000 - userData.pointsToNextTier) / 15000) * 100;
  
  const achievements = [
    { name: "First Purchase", icon: Star, unlocked: true },
    { name: "Point Collector", icon: Trophy, unlocked: true },
    { name: "Loyal Customer", icon: Award, unlocked: true },
    { name: "Challenge Master", icon: Target, unlocked: false },
  ];

  const quickStats = [
    { label: "Total Earned", value: "24,750 pts", icon: TrendingUp, color: "text-green-600" },
    { label: "Total Redeemed", value: "12,400 pts", icon: Gift, color: "text-blue-600" },
    { label: "This Month", value: "+1,250 pts", icon: Calendar, color: "text-purple-600" },
    { label: "Streak Days", value: "15 days", icon: Zap, color: "text-orange-600" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Stats Card */}
      <Card className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2">Account Status</CardTitle>
              <CardDescription className="text-purple-100">
                Member since {userData.memberSince}
              </CardDescription>
            </div>
            <Badge className="bg-white/20 text-white hover:bg-white/30">
              {userData.tier} Member
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg">Progress to {userData.nextTier}</span>
              <span className="text-sm">{userData.pointsToNextTier} points to go</span>
            </div>
            <Progress value={tierProgress} className="h-3 bg-white/20" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Trophy className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{userData.points.toLocaleString()}</p>
              <p className="text-sm text-purple-100">Available Points</p>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg">
              <Star className="w-8 h-8 mx-auto mb-2" />
              <p className="text-2xl font-bold">{userData.tier}</p>
              <p className="text-sm text-purple-100">Current Tier</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>Quick Stats</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {quickStats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <span className="font-semibold">{stat.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5" />
            <span>Recent Achievements</span>
          </CardTitle>
          <CardDescription>
            Unlock achievements by completing challenges and making purchases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg border-2 transition-all ${
                  achievement.unlocked
                    ? 'border-green-200 bg-green-50'
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <achievement.icon 
                  className={`w-8 h-8 mx-auto mb-2 ${
                    achievement.unlocked ? 'text-green-600' : 'text-gray-400'
                  }`} 
                />
                <p className="font-medium text-sm">{achievement.name}</p>
                {achievement.unlocked && (
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Unlocked
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
