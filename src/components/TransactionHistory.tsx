
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { History, Plus, Minus, Download, Filter, Calendar, ArrowUpDown } from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const [filterType, setFilterType] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  const transactions = [
    {
      id: 1,
      date: '2024-01-10',
      type: 'earned',
      description: 'Purchase at Coffee Shop Downtown',
      points: 125,
      category: 'purchase'
    },
    {
      id: 2,
      date: '2024-01-09',
      type: 'redeemed',
      description: '$10 Coffee Shop Voucher',
      points: -1000,
      category: 'redemption'
    },
    {
      id: 3,
      date: '2024-01-08',
      type: 'earned',
      description: 'Challenge Completed: Coffee Lover',
      points: 500,
      category: 'challenge'
    },
    {
      id: 4,
      date: '2024-01-07',
      type: 'earned',
      description: 'Purchase at Electronics Store',
      points: 200,
      category: 'purchase'
    },
    {
      id: 5,
      date: '2024-01-06',
      type: 'earned',
      description: 'Bonus Points - Weekend Special',
      points: 300,
      category: 'bonus'
    },
    {
      id: 6,
      date: '2024-01-05',
      type: 'redeemed',
      description: 'Free Car Wash Service',
      points: -1500,
      category: 'redemption'
    },
    {
      id: 7,
      date: '2024-01-04',
      type: 'earned',
      description: 'Friend Referral Bonus',
      points: 2000,
      category: 'referral'
    },
    {
      id: 8,
      date: '2024-01-03',
      type: 'earned',
      description: 'Purchase at Restaurant',
      points: 75,
      category: 'purchase'
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'earned', label: 'Points Earned' },
    { value: 'redeemed', label: 'Points Redeemed' },
    { value: 'purchase', label: 'Purchases' },
    { value: 'challenge', label: 'Challenges' },
    { value: 'bonus', label: 'Bonuses' }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (filterType === 'all') return true;
    if (filterType === 'earned' || filterType === 'redeemed') {
      return transaction.type === filterType;
    }
    return transaction.category === filterType;
  });

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
  });

  const totalEarned = transactions
    .filter(t => t.type === 'earned')
    .reduce((sum, t) => sum + t.points, 0);
  
  const totalRedeemed = Math.abs(transactions
    .filter(t => t.type === 'redeemed')
    .reduce((sum, t) => sum + t.points, 0));

  const getTransactionIcon = (type: string) => {
    return type === 'earned' ? Plus : Minus;
  };

  const getTransactionColor = (type: string) => {
    return type === 'earned' ? 'text-green-600' : 'text-red-600';
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      purchase: { label: 'Purchase', className: 'bg-blue-100 text-blue-800' },
      challenge: { label: 'Challenge', className: 'bg-purple-100 text-purple-800' },
      bonus: { label: 'Bonus', className: 'bg-orange-100 text-orange-800' },
      redemption: { label: 'Redemption', className: 'bg-red-100 text-red-800' },
      referral: { label: 'Referral', className: 'bg-green-100 text-green-800' }
    };
    
    const badge = badges[category as keyof typeof badges] || { label: category, className: 'bg-gray-100 text-gray-800' };
    return <Badge className={badge.className}>{badge.label}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Plus className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{totalEarned.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Minus className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">{totalRedeemed.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total Redeemed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <History className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{transactions.length}</p>
                <p className="text-sm text-gray-600">Total Transactions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <History className="w-5 h-5" />
                <span>Transaction History</span>
              </CardTitle>
              <CardDescription>
                View all your points earning and redemption activities
              </CardDescription>
            </div>
            
            <div className="flex space-x-2">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {sortedTransactions.map((transaction) => {
              const Icon = getTransactionIcon(transaction.type);
              
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      transaction.type === 'earned' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      <Icon className={`w-5 h-5 ${getTransactionColor(transaction.type)}`} />
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        {getCategoryBadge(transaction.category)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-semibold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === 'earned' ? '+' : ''}{transaction.points.toLocaleString()} pts
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          
          {sortedTransactions.length === 0 && (
            <div className="text-center py-12">
              <History className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600">Try adjusting your filter to see more transactions</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
