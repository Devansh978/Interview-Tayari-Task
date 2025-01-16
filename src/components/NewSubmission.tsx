import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  companyName: string;
  experience: string;
  ctc: string;
  country: string;
  verificationFile: File | null;
  questions: Array<{
    text: string;
    file: File | null;
    type: string;
    difficulty: string;
  }>;
}

const QUESTION_TYPES = [
  'Problem Solving',
  'System Design',
  'Data Structures',
  'Algorithms',
  'Behavioral'
];

const DIFFICULTY_LEVELS = [
  'Easy',
  'Medium',
  'Hard'
];

export function NewSubmission() {
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    experience: '',
    ctc: '',
    country: '',
    verificationFile: null,
    questions: [{ text: '', file: null, type: '', difficulty: '' }]
  });

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate form data
      if (!formData.companyName || !formData.experience || !formData.ctc || !formData.country) {
        throw new Error('Please fill in all company details');
      }

      if (!formData.verificationFile) {
        throw new Error('Please upload a verification file');
      }

      const validQuestions = formData.questions.filter(q => q.text.trim() && q.type && q.difficulty);
      if (validQuestions.length < 3) {
        throw new Error('Please add at least 3 questions with all details');
      }

      // TODO: Handle file uploads and submission
      toast.success('Experience submitted successfully!');
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, { text: '', file: null, type: '', difficulty: '' }]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
        <div className="flex items-center">
          <AlertTriangle className="h-5 w-5 text-red-400 mr-2" />
          <p className="text-red-700">
            SUBMIT AT LEAST 2 INTERVIEW EXPERIENCES TO GET VERIFIED
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Details Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            onClick={() => setActiveSection(activeSection === 1 ? 0 : 1)}
          >
            <span className="font-semibold">Level 1: Company Level Details</span>
            {activeSection === 1 ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {activeSection === 1 && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyName}
                  onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Type or select your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Overall years of experience <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.experience}
                  onChange={e => setFormData(prev => ({ ...prev, experience: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Experience</option>
                  {[...Array(20)].map((_, i) => (
                    <option key={i} value={i + 1}>{i + 1} years</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    CTC (INR) <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.ctc}
                    onChange={e => setFormData(prev => ({ ...prev, ctc: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="">Select CTC</option>
                    {[3, 5, 7, 10, 15, 20, 25, 30, 40, 50].map(ctc => (
                      <option key={ctc} value={ctc}>{ctc} LPA</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={e => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Type or select your country"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Verification Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            onClick={() => setActiveSection(activeSection === 2 ? 0 : 2)}
          >
            <span className="font-semibold">Level 2: Interview Email Screenshot</span>
            {activeSection === 2 ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {activeSection === 2 && (
            <div className="p-6">
              <div className="mb-4">
                <p className="font-medium mb-2">Upload screenshot of email which has following details:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Email of the candidate, Company Name, Date and Time of interview</li>
                  <li>Only the following file formats are accepted: JPEG, PNG.</li>
                  <li>The maximum size for each file is 5MB.</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Verification File (Image) <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/jpeg,image/png"
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    verificationFile: e.target.files ? e.target.files[0] : null 
                  }))}
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>
            </div>
          )}
        </div>

        {/* Questions Section */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <button
            type="button"
            className="w-full px-6 py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            onClick={() => setActiveSection(activeSection === 3 ? 0 : 3)}
          >
            <span className="font-semibold">Level 3: Interview Questions Submission</span>
            {activeSection === 3 ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {activeSection === 3 && (
            <div className="p-6">
              <div className="mb-6">
                <p className="font-medium mb-2">Follow the below guidelines for a successful verification:</p>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>At least <span className="font-semibold">two problem solving</span> Questions required</li>
                  <li>At least 3 Questions have to be added</li>
                  <li>You can add more questions by clicking the "Add Question" button</li>
                </ul>
              </div>

              {formData.questions.map((question, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Question Text <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={question.text}
                      onChange={e => {
                        const newQuestions = [...formData.questions];
                        newQuestions[index].text = e.target.value;
                        setFormData(prev => ({ ...prev, questions: newQuestions }));
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Question Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={question.type}
                        onChange={e => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].type = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Question Type</option>
                        {QUESTION_TYPES.map(type => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Question Difficulty <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={question.difficulty}
                        onChange={e => {
                          const newQuestions = [...formData.questions];
                          newQuestions[index].difficulty = e.target.value;
                          setFormData(prev => ({ ...prev, questions: newQuestions }));
                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Difficulty</option>
                        {DIFFICULTY_LEVELS.map(level => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question File (Optional)
                    </label>
                    <input
                      type="file"
                      onChange={e => {
                        const newQuestions = [...formData.questions];
                        newQuestions[index].file = e.target.files ? e.target.files[0] : null;
                        setFormData(prev => ({ ...prev, questions: newQuestions }));
                      }}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addQuestion}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add Question
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-[#0A2F7D] text-white py-3 px-4 rounded-md hover:bg-[#0A2F7D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A2F7D]"
        >
          Submit
        </button>
      </form>
    </div>
  );
}