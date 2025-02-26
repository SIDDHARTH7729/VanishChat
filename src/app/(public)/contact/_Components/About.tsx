import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'

type Props = {}

const About = (props: Props) => {
  return (
    <div className="max-w-4xl mx-auto mb-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-6">About VanishChat</h1>
          <p className="text-gray-400 text-lg">
            We believe in building an experience shaped by our users. Our platform is designed 
            to give you control over your digital conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              To provide a secure and private messaging platform where users have complete 
              control over their conversations and digital footprint.
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-400">
              A world where digital communication is both ephemeral and meaningful, 
              protecting privacy while fostering genuine connections.
            </CardContent>
          </Card>
        </div>
      </div>
  )
}

export default About