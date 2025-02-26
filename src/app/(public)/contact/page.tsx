"use client";

import React, { useState } from "react";
import About from "./_Components/About";
import ContactSection from "./_Components/ContactSection";
import { motion } from "framer-motion";

const AboutContact = () => {

  return (
    <motion.div className="min-h-screen bg-gray-900 py-16 px-4">
      <About/>
      <ContactSection/>
    </motion.div>
  );
};

export default AboutContact;


// 'use client'

// import React, { useState } from 'react';
// import { MessageSquare, Mail, Send, Loader2 } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import Link from 'next/link';

// const AboutContact = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [errors, setErrors] = useState({
//     email: '',
//     subject: '',
//     message: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const [response, setResponse] = useState('');

//   const validateForm = () => {
//     const newErrors = {
//       email: '',
//       subject: '',
//       message: ''
//     };

//     // Email validation
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
//       newErrors.email = 'Invalid email address';
//     }

//     // Subject validation
//     if (!formData.subject) {
//       newErrors.subject = 'Please select a subject';
//     }

//     // Message validation
//     if (!formData.message) {
//       newErrors.message = 'Message is required';
//     } else if (formData.message.length < 10) {
//       newErrors.message = 'Message must be at least 10 characters';
//     } else if (formData.message.length > 1000) {
//       newErrors.message = 'Message must not exceed 1000 characters';
//     }

//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error !== '');
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubjectChange = (value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       subject: value
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setLoading(true);
//     setResponse('');

//     try {
//       const res = await fetch('/api/contact', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setResponse(data.message || 'Message sent successfully!');
//       setFormData({ name: '', email: '', subject: '', message: '' });
//     } catch (error) {
//       setResponse('Something went wrong. Please try again.');
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 py-16 px-4">
//       {/* About Section */}
//       <div className="max-w-4xl mx-auto mb-20">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-white mb-6">About VanishChat</h1>
//           <p className="text-gray-400 text-lg">
//             We believe in building an experience shaped by our users. Our platform is designed 
//             to give you control over your digital conversations.
//           </p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8 mb-12">
//           <Card className="bg-gray-800/50 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">Our Mission</CardTitle>
//             </CardHeader>
//             <CardContent className="text-gray-400">
//               To provide a secure and private messaging platform where users have complete 
//               control over their conversations and digital footprint.
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800/50 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">Our Vision</CardTitle>
//             </CardHeader>
//             <CardContent className="text-gray-400">
//               A world where digital communication is both ephemeral and meaningful, 
//               protecting privacy while fostering genuine connections.
//             </CardContent>
//           </Card>
//         </div>
//       </div>

//       {/* Contact Section */}
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
//           <p className="text-gray-400">We'd love to hear from you! 💬</p>
//         </div>

//         <div className="grid md:grid-cols-2 gap-8">
//           {/* Contact Info */}
//           <Card className="bg-gray-800/50 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">How to Reach Us</CardTitle>
//               <CardDescription>We're here to help and listen</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center space-x-3 text-gray-400">
//                 <Mail className="w-5 h-5 text-purple-400" />
//                 <span>support : <Link href={"mailto:siddh907729@gmail.com"} className="text-cyan-400 hover:text-cyan-600">siddh907729@gmail.com</Link></span>
//               </div>
//               <div className="flex items-center space-x-3 text-gray-400">
//                 <MessageSquare className="w-5 h-5 text-purple-400" />
//                 <span>24/7 Chat Support</span>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Contact Form */}
//           <Card className="bg-gray-800/50 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">Send Us a Message</CardTitle>
//               <CardDescription>Fill out the form below</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div className="space-y-2">
//                   <label className="text-sm text-gray-400">Name (Optional)</label>
//                   <Input
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     placeholder="Your name"
//                     className="bg-gray-700 border-gray-600"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm text-gray-400">Email</label>
//                   <Input
//                     name="email"
//                     type="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     placeholder="your.email@example.com"
//                     className="bg-gray-700 border-gray-600"
//                   />
//                   {errors.email && (
//                     <p className="text-red-400 text-sm">{errors.email}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm text-gray-400">Subject</label>
//                   <Select value={formData.subject} onValueChange={handleSubjectChange}>
//                     <SelectTrigger className="bg-gray-700 border-gray-600">
//                       <SelectValue placeholder="Select a subject" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       <SelectItem value="Bug Report">Bug Report</SelectItem>
//                       <SelectItem value="Feature Request">Feature Request</SelectItem>
//                       <SelectItem value="General Inquiry">General Inquiry</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   {errors.subject && (
//                     <p className="text-red-400 text-sm">{errors.subject}</p>
//                   )}
//                 </div>

//                 <div className="space-y-2">
//                   <label className="text-sm text-gray-400">Message</label>
//                   <Textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     placeholder="Your message"
//                     className="bg-gray-700 border-gray-600 min-h-[120px]"
//                   />
//                   {errors.message && (
//                     <p className="text-red-400 text-sm">{errors.message}</p>
//                   )}
//                 </div>

//                 <Button 
//                   type="submit" 
//                   className="w-full bg-purple-500 hover:bg-purple-600"
//                   disabled={loading}
//                 >
//                   {loading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Sending
//                     </>
//                   ) : (
//                     <>
//                       <Send className="mr-2 h-4 w-4" />
//                       Send Message
//                     </>
//                   )}
//                 </Button>
//               </form>

//               {response && (
//                 <Alert className="mt-4 bg-green-500/10 text-green-400 border-green-500/20">
//                   <AlertDescription>{response}</AlertDescription>
//                 </Alert>
//               )}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutContact;