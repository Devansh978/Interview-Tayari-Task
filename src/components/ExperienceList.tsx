import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { InterviewExperience } from '../types';
import { format } from 'date-fns';
import { Building, Globe, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';

export function ExperienceList() {
  const [experiences, setExperiences] = useState<InterviewExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      setError(null);
      const { data, error: supabaseError } = await supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        setError(supabaseError.message);
        toast.error(supabaseError.message);
        return;
      }

      setExperiences(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch experiences';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Failed to load experiences. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Recent Interview Experiences</h2>
      
      {experiences.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No experiences shared yet. Be the first one!</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {experiences.map((experience) => (
            <div key={experience.id} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">{experience.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-gray-600">
                  <Building className="w-4 h-4 mr-2" />
                  {experience.company}
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="w-4 h-4 mr-2" />
                  {experience.country}
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {format(new Date(experience.created_at), 'PPP')}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Questions Asked:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {experience.questions.map((question, index) => (
                    <li key={index} className="text-gray-700">{question}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}