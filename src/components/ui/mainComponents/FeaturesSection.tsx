import React from 'react';
import { Shield, Clock, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from 'next/link';

const FeaturesSection = () => {
  return (
    <div className="w-full bg-gray-900 py-16 px-4 text-center">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 ">
            Our Features
          </Badge>
          <h2 className="text-3xl font-bold text-white">
            Secure. Private. Ephemeral.
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <CardTitle className="text-xl text-white">End-to-End Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Your messages are protected with ourselevs so feel freely to express. 
                <span className="block mt-4 text-purple-400 font-medium">
                  Privacy our topmost Priority
                </span>
              </CardDescription>
              <Link href={"/dashboard"}>
              <Button variant="ghost" className="mt-6 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                Learn More
              </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <CardTitle className="text-xl text-white">Timed Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                Set custom timers for your messages. Once read, they'll disappear forever.
                <span className="block mt-4 text-blue-400 font-medium">
                  Days Duration for your Text
                </span>
              </CardDescription>
              <Link href={"/dashboard"}>
              <Button variant="ghost" className="mt-6 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10">
                Set Timer
              </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all group">
            <CardHeader className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <CardTitle className="text-xl text-white">Like Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-400 text-base leading-relaxed">
                See how other people react to your texts and make them public.
                <span className="block mt-4 text-green-400 font-medium">
                  Counts the Likes and Dislikes
                </span>
              </CardDescription>
              <Link href={"/dashboard"}>
              <Button variant="ghost" className="mt-6 text-green-400 hover:text-green-300 hover:bg-green-500/10">
                Start Liking Messages
              </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;