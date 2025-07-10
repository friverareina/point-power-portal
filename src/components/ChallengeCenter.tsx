
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Target, Trophy, Zap, Calendar, Star, PlayCircle, CheckCircle, Clock } from 'lucide-react';

interface ChallengeCenterProps {
  userPoints: number;
}

export const ChallengeCenter: React.FC<ChallengeCenterProps> = ({ userPoints }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null);

  const activeChallenges = [
    {
      id: 1,
      title: "Coffee Lover's Quest",
      description: "Purchase 5 coffee drinks this month",
      progress: 3,
      target: 5,
      reward: 500,
      timeLeft: "12 days",
      difficulty: "Easy",
      type: "purchase"
    },
    {
      id: 2,
      title: "Weekend Warrior",
      description: "Make purchases on 3 weekends",
      progress: 1,
      target: 3,
      reward: 750,
      timeLeft: "3 weeks",
      difficulty: "Medium",
      type: "timing"
    },
    {
      id: 3,
      title: "Big Spender",
      description: "Spend $200 in a single month",
      progress: 120,
      target: 200,
      reward: 1200,
      timeLeft: "18 days",
      difficulty: "Hard",
      type: "spending"
    }
  ];

  const availableChallenges = [
    {
      id: 4,
      title: "Social Butterfly",
      description: "Refer 3 friends to join the loyalty program",
      reward: 2000,
      duration: "30 days",
      difficulty: "Medium",
      type: "social"
    },
    {
      id: 5,
      title: "Early Bird",
      description: "Make 5 purchases before 10 AM",
      reward: 800,
      duration: "2 weeks",
      difficulty: "Easy",
      type: "timing"
    },
    {
      id: 6,
      title: "Category Explorer",
      description: "Purchase from 4 different categories",
      reward: 1000,
      duration: "1 month",
      difficulty: "Medium",
      type: "variety"
    }
  ];

  const completedChallenges = [
    {
      id: 7,
      title: "First Steps",
      description: "Make your first loyalty purchase",
      reward: 100,
      completedDate: "2024-01-15"
    },
    {
      id: 8,
      title: "Point Collector",
      description: "Accumulate 1,000 points",
      reward: 200,
      completedDate: "2024-01-28"
    }
  ];

  const handleStartChallenge = (challenge: any) => {
    alert(`Starting challenge: ${challenge.title}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'purchase': return Target;
      case 'timing': return Clock;
      case 'spending': return Trophy;
      case 'social': return Star;
      case 'variety': return Zap;
      default: return Target;
    }
  };

  return (
    <div className="space-y-6">
      {/* Challenge Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{activeChallenges.length}</p>
                <p className="text-sm text-gray-600">Active Challenges</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{completedChallenges.length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {completedChallenges.reduce((sum, c) => sum + c.reward, 0)}
                </p>
                <p className="text-sm text-gray-600">Points Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <span>Active Challenges</span>
          </CardTitle>
          <CardDescription>
            Complete these challenges to earn bonus points
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeChallenges.map((challenge) => {
            const progressPercentage = (challenge.progress / challenge.target) * 100;
            const TypeIcon = getTypeIcon(challenge.type);
            
            return (
              <div key={challenge.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <TypeIcon className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-gray-600">{challenge.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-purple-600">+{challenge.reward} pts</p>
                    <Badge className={getDifficultyColor(challenge.difficulty)}>
                      {challenge.difficulty}
                    </Badge>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress: {challenge.progress}/{challenge.target}</span>
                    <span className="text-gray-500">{challenge.timeLeft} left</span>
                  </div>
                  <Progress value={progressPercentage} className="h-2" />
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Available Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <PlayCircle className="w-5 h-5 text-blue-500" />
            <span>Available Challenges</span>
          </CardTitle>
          <CardDescription>
            Start new challenges to earn more points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableChallenges.map((challenge) => {
              const TypeIcon = getTypeIcon(challenge.type);
              
              return (
                <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <TypeIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="font-semibold text-purple-600">+{challenge.reward} pts</p>
                        <p className="text-sm text-gray-500">{challenge.duration}</p>
                      </div>
                      <Badge className={getDifficultyColor(challenge.difficulty)}>
                        {challenge.difficulty}
                      </Badge>
                    </div>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" onClick={() => setSelectedChallenge(challenge)}>
                          Start Challenge
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Start {challenge.title}?</DialogTitle>
                          <DialogDescription className="space-y-4">
                            <p>{challenge.description}</p>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                              <span>Reward:</span>
                              <span className="font-semibold text-purple-600">+{challenge.reward} points</span>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                              <span>Duration:</span>
                              <span className="font-semibold">{challenge.duration}</span>
                            </div>
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleStartChallenge(challenge)}
                            className="flex-1"
                          >
                            Start Challenge
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Completed Challenges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Completed Challenges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completedChallenges.map((challenge) => (
              <div key={challenge.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">{challenge.title}</p>
                    <p className="text-sm text-gray-600">{challenge.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+{challenge.reward} pts</p>
                  <p className="text-xs text-gray-500">
                    Completed {new Date(challenge.completedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
