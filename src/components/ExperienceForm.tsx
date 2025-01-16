import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';

export function ExperienceForm() {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [company, setCompany] = useState('');
  const [questions, setQuestions] = useState(['']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddQuestion = () => {
    setQuestions([...questions, '']);
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate form data
      if (!name.trim() || !country.trim() || !company.trim()) {
        throw new Error('Please fill in all fields');
      }

      const filteredQuestions = questions.filter(q => q.trim() !== '');
      if (filteredQuestions.length === 0) {
        throw new Error('Please add at least one interview question');
      }

      setIsSubmitting(true);

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('Please sign in to share your experience');
      }

      const { error: insertError } = await supabase
        .from('experiences')
        .insert({
          name: name.trim(),
          country: country.trim(),
          company: company.trim(),
          questions: filteredQuestions,
          user_id: user.id
        });

      if (insertError) {
        throw insertError;
      }

      toast.success('Experience shared successfully!');
      
      // Reset form
      setName('');
      setCountry('');
      setCompany('');
      setQuestions(['']);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-2xl font-bold mb-6">Share Your Interview Experience</h2>
      
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Your Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Country
        </label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Company
        </label>
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Interview Questions
        </label>
        {questions.map((question, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter interview question"
              required
              disabled={isSubmitting}
            />
            {questions.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="bg-red-500 text-white p-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                <Minus className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="mt-2 flex items-center gap-2 text-blue-500 hover:text-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Plus className="w-4 h-4" /> Add Question
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Share Experience'}
      </button>
    </form>
  );
}