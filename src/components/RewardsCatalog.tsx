
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Gift, Search, Filter, ShoppingBag, Coffee, Smartphone, Plane, Car, Home } from 'lucide-react';

interface RewardsCatalogProps {
  userPoints: number;
}

export const RewardsCatalog: React.FC<RewardsCatalogProps> = ({ userPoints }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const rewards = [
    {
      id: 1,
      name: "$10 Coffee Shop Voucher",
      points: 1000,
      category: "food",
      icon: Coffee,
      description: "Redeem at any participating coffee shop",
      popular: true,
      image: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Wireless Earbuds",
      points: 8500,
      category: "electronics",
      icon: Smartphone,
      description: "Premium quality wireless earbuds with noise cancellation",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 3,
      name: "$50 Flight Discount",
      points: 5000,
      category: "travel",
      icon: Plane,
      description: "Discount on domestic flights with partner airlines",
      popular: true,
      image: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Free Car Wash",
      points: 1500,
      category: "automotive",
      icon: Car,
      description: "Premium car wash service at participating locations",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 5,
      name: "Home Cleaning Service",
      points: 6000,
      category: "home",
      icon: Home,
      description: "3-hour professional home cleaning service",
      popular: false,
      image: "/placeholder.svg"
    },
    {
      id: 6,
      name: "$25 Restaurant Voucher",
      points: 2500,
      category: "food",
      icon: Coffee,
      description: "Dine at over 500 partner restaurants",
      popular: true,
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'food', label: 'Food & Dining' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'travel', label: 'Travel' },
    { value: 'automotive', label: 'Automotive' },
    { value: 'home', label: 'Home & Services' }
  ];

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || reward.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleRedeem = (reward: typeof rewards[0]) => {
    if (userPoints >= reward.points) {
      alert(`Redeeming ${reward.name} for ${reward.points} points!`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-purple-600" />
            <span>Rewards Catalog</span>
          </CardTitle>
          <CardDescription>
            Browse and redeem exclusive rewards with your points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search rewards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Rewards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRewards.map((reward) => {
          const canAfford = userPoints >= reward.points;
          const IconComponent = reward.icon;
          
          return (
            <Card key={reward.id} className={`transition-all hover:shadow-lg ${!canAfford ? 'opacity-60' : ''}`}>
              <CardHeader className="relative">
                {reward.popular && (
                  <Badge className="absolute top-2 right-2 bg-orange-100 text-orange-800">
                    Popular
                  </Badge>
                )}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <IconComponent className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-lg">{reward.name}</CardTitle>
                <CardDescription>{reward.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-purple-600">
                      {reward.points.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500">points</span>
                  </div>
                  {canAfford && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Available
                    </Badge>
                  )}
                </div>
                
                <Button 
                  className="w-full" 
                  disabled={!canAfford}
                  onClick={() => handleRedeem(reward)}
                >
                  {canAfford ? (
                    <>
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Redeem Now
                    </>
                  ) : (
                    `Need ${(reward.points - userPoints).toLocaleString()} more points`
                  )}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRewards.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No rewards found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
