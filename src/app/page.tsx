"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import { BookOpen, Mail, ArrowRight, LayoutDashboard } from "lucide-react";

export default function WelcomePage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-5xl space-y-8"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="text-center space-y-4"
          variants={item}
        >
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome to CMS Dashboard
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive solution for content management and business operations
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={item}
        >
          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LayoutDashboard className="h-5 w-5 text-primary" />
                Overview
              </CardTitle>
              <CardDescription>View your dashboard overview</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <Link href="/overview" className="flex items-center justify-between">
                  Go to Overview
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Documentation
              </CardTitle>
              <CardDescription>Learn how to use the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/help" className="flex items-center justify-between">
                  View Documentation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Contact Support
              </CardTitle>
              <CardDescription>Get help from our team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href="/contact" className="flex items-center justify-between">
                  Contact Developers
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          className="text-center"
          variants={item}
        >
          <p className="text-sm text-muted-foreground">
            Version 1.0.0 • Made with ❤️ by the CMS Team
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}