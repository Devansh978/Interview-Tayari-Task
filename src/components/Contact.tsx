import React from 'react';
import { Mail, Linkedin, MessageSquare, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg text-gray-500">
          Have questions? We're here to help you succeed in your interview journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#0A2F7D] mt-1" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <a
                    href="mailto:contact@interviewtayari.com"
                    className="text-sm text-gray-500 hover:text-[#0A2F7D]"
                  >
                    contact@interviewtayari.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Linkedin className="h-6 w-6 text-[#0A2F7D] mt-1" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">LinkedIn</p>
                  <a
                    href="https://linkedin.com/company/interview-tayari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-500 hover:text-[#0A2F7D]"
                  >
                    Interview Tayari
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#0A2F7D] mt-1" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900">Location</p>
                  <p className="text-sm text-gray-500">
                    Bangalore, India
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Send us a Message
            </h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A2F7D] focus:ring-[#0A2F7D]"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A2F7D] focus:ring-[#0A2F7D]"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A2F7D] focus:ring-[#0A2F7D]"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#0A2F7D] focus:ring-[#0A2F7D]"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#0A2F7D] text-white py-2 px-4 rounded-md hover:bg-[#0A2F7D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2F7D]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}