import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatInterfaceProps {
  userType: 'student' | 'professional' | null;
}

const getPersonalizedResponse = (message: string, userType: 'student' | 'professional' | null): string => {
  const lowerMessage = message.toLowerCase();
  
  // Budget-related responses
  if (lowerMessage.includes('budget')) {
    if (userType === 'student') {
      return "As a student, I recommend the 50/30/20 rule adapted for your situation: 50% for needs (tuition, books, food), 30% for wants (entertainment, dining out), and 20% for savings and debt repayment. Start with even $25/month in savings!";
    }
    return "For professionals, I suggest the 50/30/20 rule: 50% needs, 30% wants, 20% savings/investments. Consider increasing savings to 25-30% if possible for faster wealth building.";
  }
  
  // Investment responses
  if (lowerMessage.includes('invest')) {
    if (userType === 'student') {
      return "Great question! As a student, start simple: open a Roth IRA and invest in low-cost index funds. Even $50/month can grow significantly over time. Focus on building the habit now!";
    }
    return "For professionals, diversify with a mix of 401(k), IRA, and taxable accounts. Consider index funds, target-date funds, and individual stocks. Aim to invest 15-20% of your income.";
  }
  
  // Savings responses
  if (lowerMessage.includes('save')) {
    if (userType === 'student') {
      return "Building savings as a student is crucial! Start with a $500 emergency fund, then work toward 3 months of expenses. Use high-yield savings accounts and automate transfers.";
    }
    return "Build a 3-6 month emergency fund first, then focus on retirement savings. Consider high-yield savings accounts and money market accounts for better returns.";
  }
  
  // Tax responses
  if (lowerMessage.includes('tax')) {
    if (userType === 'student') {
      return "Student tax tips: Don't forget the American Opportunity Tax Credit (up to $2,500), deduct student loan interest, and file even if you didn't earn much - you might get money back!";
    }
    return "Maximize tax-advantaged accounts like 401(k) and IRA. Consider tax-loss harvesting, HSA contributions, and whether itemizing vs. standard deduction saves more.";
  }
  
  // Default responses
  const responses = [
    "I'm here to help with your personal finance questions! Feel free to ask about budgeting, saving, investing, or taxes.",
    "That's a great financial question! Let me provide some personalized advice based on your situation.",
    "Financial planning is important at any stage of life. What specific area would you like to focus on?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userType }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: userType 
        ? `Hi! I'm your personal finance assistant. I see you're a ${userType}. I can help you with budgeting, saving, investing, and tax planning tailored to your situation. What would you like to know?`
        : "Hi! I'm your personal finance assistant. I can help you with budgeting, saving, investing, and tax planning. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getPersonalizedResponse(inputMessage, userType),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[600px] bg-gradient-card rounded-lg shadow-chat">
      {/* Chat Header */}
      <div className="p-4 bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <h3 className="font-semibold">Personal Finance Assistant</h3>
          {userType && (
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              {userType === 'student' ? 'Student Mode' : 'Professional Mode'}
            </span>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-background/50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            
            <Card className={`max-w-[80%] p-3 ${
              message.sender === 'user' 
                ? 'bg-primary text-primary-foreground ml-auto' 
                : 'bg-card shadow-card'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 opacity-70 ${
                message.sender === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </Card>

            {message.sender === 'user' && (
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-primary-foreground" />
            </div>
            <Card className="bg-card shadow-card p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-card/50">
        <div className="flex gap-2">
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about budgeting, saving, investing, or taxes..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};