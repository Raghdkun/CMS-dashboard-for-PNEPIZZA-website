"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, ArrowLeft, Send, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Form schemas
const emailFormSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const verificationFormSchema = z.object({
  code: z
    .string()
    .length(6, 'Verification code must be 6 digits')
    .regex(/^\d+$/, 'Code must contain only numbers'),
  newPassword: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetStep = 'email' | 'verification' | 'success';

export default function ResetPasswordPage() {
  const [step, setStep] = useState<ResetStep>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  // Email form
  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: '' },
  });

  // Verification form
  const verificationForm = useForm<z.infer<typeof verificationFormSchema>>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      code: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleEmailSubmit = async (data: z.infer<typeof emailFormSchema>) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Implement API call to send verification code
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      setEmail(data.email);
      setStep('verification');
    } catch (err) {
      setError('Failed to send verification code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerificationSubmit = async (data: z.infer<typeof verificationFormSchema>) => {
    try {
      setIsLoading(true);
      setError(null);

      if (remainingAttempts <= 0) {
        setError('Maximum verification attempts reached. Please request a new code.');
        setStep('email');
        return;
      }

      // TODO: Implement API call to verify code and update password
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      // Simulate verification failure for demo
      if (data.code !== '123456') {
        setRemainingAttempts(prev => prev - 1);
        throw new Error('Invalid verification code');
      }

      setStep('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-in-out">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Reset Password
        </h1>
        <p className="text-muted-foreground">
          {step === 'email' && "Enter your email to reset your password"}
          {step === 'verification' && "Enter the verification code sent to your email"}
          {step === 'success' && "Your password has been reset successfully"}
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>
            {step === 'email' && "We'll send you a verification code"}
            {step === 'verification' && `Enter the 6-digit code sent to ${email}`}
            {step === 'success' && "You can now sign in with your new password"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 'email' && (
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(handleEmailSubmit)} className="space-y-6">
                <FormField
                  control={emailForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            placeholder="name@example.com"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                      Sending code...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send className="h-4 w-4" />
                      Send Code
                    </div>
                  )}
                </Button>
              </form>
            </Form>
          )}

          {step === 'verification' && (
            <Form {...verificationForm}>
              <form onSubmit={verificationForm.handleSubmit(handleVerificationSubmit)} className="space-y-6">
                <FormField
                  control={verificationForm.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123456"
                          maxLength={6}
                          className="text-center tracking-[1em] font-mono"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-sm text-muted-foreground">
                        {remainingAttempts} attempts remaining
                      </p>
                    </FormItem>
                  )}
                />
                <FormField
                  control={verificationForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={verificationForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        Verifying...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-4 w-4" />
                        Reset Password
                      </div>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setStep('email');
                      setRemainingAttempts(3);
                      setError(null);
                    }}
                  >
                    Request New Code
                  </Button>
                </div>
              </form>
            </Form>
          )}

          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="p-4 bg-primary/5 rounded-full w-fit mx-auto">
                <KeyRound className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your password has been reset successfully. You can now sign in with your new password.
                </p>
                <Button
                  className="w-full"
                  asChild
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {step !== 'success' && (
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>
        </div>
      )}
    </div>
  );
}