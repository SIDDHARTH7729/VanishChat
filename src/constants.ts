import { Menu, X, Home, Info, Settings, Mail, ArrowRight,Shield,MessageSquare,Users } from "lucide-react";

export const navItems = [
    { label: "Home", path: "/", icon: Home },
    { label: "About", path: "/about", icon: Info },
    // { label: "Services", path: "/services", icon: Settings },
    { label: "Contact", path: "/contact", icon: Mail },
  ];

export const messages = [
    "Politics is the art of looking for trouble, finding it everywhere, diagnosing it incorrectly, and applying the wrong remedies.",
    "Elections are won by those who show up—and sometimes by those who count the votes.",
    "Real Madrid beating ManCiy was thrill to watch and Mbappe scoring hat-trick goal was the icing on the cake.",
    "Your team winning doesn’t mean they’re the best; it just means the referee was on your side today.",
    "Messi or Ronaldo? The real question is: when will your team finally win a trophy?",
    "I think Government has been doing a good job",
  ];

 
  // not used due to issues persisting

//  const iconStyles = {
//   shield: "w-12 h-12 text-purple-500 mb-4",
//   messageSquare: "w-12 h-12 text-blue-500 mb-4",
//   users: "w-12 h-12 text-green-500 mb-4",
// };

//   type Props = {
//     icon:React.ElementType,
//     className:string,
//     title:string,
//     description:string,
//     className2:string,
//   }

//   export const features: Props[] = [
//     {
//       icon: Shield,
//       className: iconStyles.shield, 
//       title: "End-to-End Encryption",
//       description: "Your messages are protected with military-grade encryption, ensuring complete privacy.",
//       className2:"text-xl font-bold mb-4 text-green",
//     },
//     {
//       icon: MessageSquare,
//       className: iconStyles.messageSquare, 
//       title: "Timed Messages",
//       description: "Set custom timers for your messages. Once read, they'll disappear forever.",
//       className2:"text-xl font-bold mb-4 text-blue",
//     },
//     {
//       icon: Users,
//       className: iconStyles.users, 
//       title: "Group Chats",
//       description: "Create secure group conversations with the same vanishing message features.",
//       className2:"text-xl font-bold mb-4 text-red",
//     },
//   ];
  