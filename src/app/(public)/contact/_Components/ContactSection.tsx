import { sendContactEmail } from '@/actions/contactUs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ContactFormData, contactSchema } from '@/types/ContactSchema'
import { ApiError } from '@/utils/ApiError'
import { zodResolver } from '@hookform/resolvers/zod'
import { set } from 'date-fns'
import { Loader2, Mail, MessageSquare, Send } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const ContactSection = (props: Props) => {
    const [response, setResponse] = useState("");
      const [loading, setLoading] = useState(false);
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        reset,
      } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
      });
    
      const onSubmit = async (data: ContactFormData) => {
        setLoading(true);
        setResponse("");
      
        try {
          const res = await sendContactEmail(data);
          console.log(res);
      
          if (res.statusCode === 200) {
            setResponse(res.message || "Message sent successfully!");
            reset(); // Reset form on success
          } else {
            setResponse(res.message || "Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Frontend error:", error);
          setResponse("An unexpected error occurred. Please try again.");
        }
      
        setLoading(false);
      };
      
      
      
  return (
    <div className="max-w-4xl mx-auto">
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold text-white mb-4">Contact Us</h2>
      <p className="text-gray-400">We'd love to hear from you! 💬</p>
    </div>

    <div className="grid md:grid-cols-2 gap-8">
      {/* Contact Info */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">How to Reach Us</CardTitle>
          <CardDescription>We're here to help and listen</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3 text-gray-400">
            <Mail className="w-5 h-5 text-purple-400" />
            <span>support : <Link href={"mailto:siddh907729@gmail.com"} className="text-cyan-400 hover:text-cyan-600" target={"_blank"}>siddh907729@gmail.com</Link></span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400">
            <MessageSquare className="w-5 h-5 text-purple-400" />
            <span>Owner replies within 1 Day</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Form */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Send Us a Message</CardTitle>
          <CardDescription>Fill out the form below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">Name (Optional)</label>
              <Input {...register("name")} placeholder="Your name" className="bg-gray-700 border-gray-600" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Email</label>
              <Input {...register("email")} placeholder="your.email@example.com" className="bg-gray-700 border-gray-600" />
              {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Subject</label>
              <Select onValueChange={(value) => setValue("subject", value as "Bug Report" | "Feature Request" | "General Inquiry", { shouldValidate: true })}>
              <SelectTrigger className="bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select a subject" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Bug Report">Bug Report</SelectItem>
              <SelectItem value="Feature Request">Feature Request</SelectItem>
              <SelectItem value="General Inquiry">General Inquiry</SelectItem>
              </SelectContent>
              </Select>

              {errors.subject && <p className="text-red-400 text-sm">{errors.subject.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Message</label>
              <Textarea {...register("message")} placeholder="Your message" className="bg-gray-700 border-gray-600 min-h-[120px]" />
              {errors.message && <p className="text-red-400 text-sm">{errors.message.message}</p>}
            </div>

            <Button type="submit" className="w-full bg-purple-500 hover:bg-purple-600" disabled={loading}>
              {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />} Send Message
            </Button>
          </form>

          {response && <Alert className="mt-4 bg-green-500/10 text-green-400 border-green-500/20">
           <AlertDescription>
             {response}
           </AlertDescription>
           </Alert>}
        </CardContent>
      </Card>
    </div>
  </div>
  )
}

export default ContactSection