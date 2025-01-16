import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { LogIn, UserPlus, Mail, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!email || (!isForgotPassword && !password)) {
        throw new Error('Please fill in all required fields');
      }

      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        toast.success('Password reset link sent to your email!');
      } else {
        const { error } = isSignUp 
          ? await supabase.auth.signUp({ email, password })
          : await supabase.auth.signInWithPassword({ email, password });

        if (error) throw error;
        toast.success(isSignUp ? 'Account created successfully!' : 'Welcome back!');
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 sm:p-8 bg-gray-100 rounded-lg shadow-md transition-transform transform hover:scale-105">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 animate-fade-in">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
          {isForgotPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {!isForgotPassword && (
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center disabled:opacity-50 disabled:cursor-not-allowed w-full mb-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              'Processing...'
            ) : isForgotPassword ? (
              <>
                <Mail className="w-4 h-4 mr-2" />
                Send Reset Link
              </>
            ) : isSignUp ? (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </>
            ) : (
              <>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </>
            )}
          </button>

          <button
            type="button"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            onClick={() => {
              setIsForgotPassword(false);
              setIsSignUp(!isSignUp);
            }}
            disabled={isLoading}
          >
            {isForgotPassword ? '' : isSignUp ? 'Already have an account?' : 'Need an account?'}
          </button>

          {!isForgotPassword && (
            <button
              type="button"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => {
                setIsSignUp(false);
                setIsForgotPassword(true);
              }}
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          )}

          {isForgotPassword && (
            <button
              type="button"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={() => setIsForgotPassword(false)}
              disabled={isLoading}
            >
              Back to Sign In
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
