import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle, DollarSign } from 'lucide-react';

interface BudgetData {
  income: number;
  housing: number;
  food: number;
  transportation: number;
  entertainment: number;
  utilities: number;
  other: number;
}

interface BudgetAnalyzerProps {
  userType: 'student' | 'professional';
}

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--finance-green))', 'hsl(var(--finance-gold))', 'hsl(var(--muted-foreground))'];

export const BudgetAnalyzer: React.FC<BudgetAnalyzerProps> = ({ userType }) => {
  const [budget, setBudget] = useState<BudgetData>({
    income: 0,
    housing: 0,
    food: 0,
    transportation: 0,
    entertainment: 0,
    utilities: 0,
    other: 0
  });
  
  const [showAnalysis, setShowAnalysis] = useState(false);

  const totalExpenses = budget.housing + budget.food + budget.transportation + budget.entertainment + budget.utilities + budget.other;
  const remainingBudget = budget.income - totalExpenses;
  const savingsRate = budget.income > 0 ? (remainingBudget / budget.income) * 100 : 0;

  const pieData = [
    { name: 'Housing', value: budget.housing, color: COLORS[0] },
    { name: 'Food', value: budget.food, color: COLORS[1] },
    { name: 'Transportation', value: budget.transportation, color: COLORS[2] },
    { name: 'Entertainment', value: budget.entertainment, color: COLORS[3] },
    { name: 'Utilities', value: budget.utilities, color: COLORS[4] },
    { name: 'Other', value: budget.other, color: COLORS[5] },
  ].filter(item => item.value > 0);

  const recommendations = [
    {
      title: userType === 'student' ? 'Housing Budget' : 'Housing Rule',
      description: userType === 'student' 
        ? 'Try to keep housing under 30% of your budget. Consider shared living to reduce costs.'
        : 'Keep housing costs below 30% of gross income for financial stability.',
      status: budget.income > 0 && (budget.housing / budget.income) <= 0.30 ? 'good' : 'warning',
      percentage: budget.income > 0 ? Math.round((budget.housing / budget.income) * 100) : 0
    },
    {
      title: 'Savings Rate',
      description: userType === 'student'
        ? 'Even saving 10-15% as a student builds great habits!'
        : 'Aim for 20% savings rate to build wealth effectively.',
      status: savingsRate >= (userType === 'student' ? 10 : 20) ? 'good' : 'warning',
      percentage: Math.round(savingsRate)
    },
    {
      title: 'Emergency Fund',
      description: userType === 'student'
        ? 'Start with $500, then build to 3 months of expenses.'
        : 'Maintain 3-6 months of expenses in emergency savings.',
      status: remainingBudget > 0 ? 'good' : 'warning',
      percentage: null
    }
  ];

  const handleAnalyze = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-card bg-gradient-card">
        <div className="flex items-center gap-2 mb-6">
          <DollarSign className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold">Budget Analyzer</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="income">
              {userType === 'student' ? 'Monthly Budget' : 'Monthly Income'}
            </Label>
            <Input
              id="income"
              type="number"
              value={budget.income || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, income: Number(e.target.value) }))}
              placeholder="3000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="housing">Housing</Label>
            <Input
              id="housing"
              type="number"
              value={budget.housing || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, housing: Number(e.target.value) }))}
              placeholder="1000"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="food">Food</Label>
            <Input
              id="food"
              type="number"
              value={budget.food || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, food: Number(e.target.value) }))}
              placeholder="400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="transportation">Transportation</Label>
            <Input
              id="transportation"
              type="number"
              value={budget.transportation || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, transportation: Number(e.target.value) }))}
              placeholder="300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="entertainment">Entertainment</Label>
            <Input
              id="entertainment"
              type="number"
              value={budget.entertainment || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, entertainment: Number(e.target.value) }))}
              placeholder="200"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="utilities">Utilities</Label>
            <Input
              id="utilities"
              type="number"
              value={budget.utilities || ''}
              onChange={(e) => setBudget(prev => ({ ...prev, utilities: Number(e.target.value) }))}
              placeholder="150"
            />
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <Label htmlFor="other">Other Expenses</Label>
          <Input
            id="other"
            type="number"
            value={budget.other || ''}
            onChange={(e) => setBudget(prev => ({ ...prev, other: Number(e.target.value) }))}
            placeholder="200"
          />
        </div>

        <Button onClick={handleAnalyze} className="w-full bg-gradient-primary">
          Analyze My Budget
        </Button>
      </Card>

      {showAnalysis && budget.income > 0 && (
        <>
          {/* Budget Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-foreground">${budget.income.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-finance-green" />
              </div>
            </Card>
            <Card className="p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-foreground">${totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </Card>
            <Card className="p-4 shadow-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-finance-green' : 'text-destructive'}`}>
                    ${remainingBudget.toLocaleString()}
                  </p>
                </div>
                {remainingBudget >= 0 ? 
                  <CheckCircle className="w-8 h-8 text-finance-green" /> : 
                  <AlertCircle className="w-8 h-8 text-destructive" />
                }
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6 shadow-card">
              <h3 className="text-lg font-semibold mb-4">Budget vs. Ideal</h3>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                    <div className="flex items-center gap-3">
                      {rec.status === 'good' ? 
                        <CheckCircle className="w-5 h-5 text-finance-green" /> :
                        <AlertCircle className="w-5 h-5 text-accent" />
                      }
                      <div>
                        <p className="font-medium">{rec.title}</p>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                      </div>
                    </div>
                    {rec.percentage !== null && (
                      <span className={`font-bold ${rec.status === 'good' ? 'text-finance-green' : 'text-accent'}`}>
                        {rec.percentage}%
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};