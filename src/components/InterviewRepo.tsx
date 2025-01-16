import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, MapPin, TrendingUp, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';


interface Experience {
  id: string;
  company: string;
  name: string;
  country: string;
  questions: string[];
  created_at: string;
  ctc?: string;
  experience_years?: string;
  verified?: boolean;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export function InterviewRepo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    company: '',
    experience: '',
  });
  
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  useEffect(() => {
    fetchExperiences();
  }, [selectedFilters]);

  const fetchExperiences = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('experiences')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedFilters.company) {
        query = query.ilike('company', `%${selectedFilters.company}%`);
      }

      if (selectedFilters.experience) {
        query = query.eq('experience_years', selectedFilters.experience);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setExperiences(data || []);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = experiences.filter((exp) => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    return (
      exp.company.toLowerCase().includes(searchLower) ||
      exp.name.toLowerCase().includes(searchLower) ||
      exp.country.toLowerCase().includes(searchLower) ||
      exp.questions.some(q => q.toLowerCase().includes(searchLower))
    );
  });

  const toggleCard = (id: string) => {
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company, name, or questions..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A2F7D]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A2F7D]"
              value={selectedFilters.company}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, company: e.target.value }))}
            >
              <option value="">All Companies</option>
              <option value="Google">Google</option>
              <option value="Microsoft">Microsoft</option>
              <option value="Amazon">Amazon</option>
              <option value="Meta">Meta</option>
              <option value="Apple">Apple</option>
            </select>
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#0A2F7D]"
              value={selectedFilters.experience}
              onChange={(e) => setSelectedFilters(prev => ({ ...prev, experience: e.target.value }))}
            >
              <option value="">All Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-7">5-7 years</option>
              <option value="7+">7+ years</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-[#0A2F7D]" />
        </div>
      ) : filteredExperiences.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No interview experiences found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExperiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg cursor-pointer"
              onClick={() => toggleCard(exp.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Briefcase className="h-5 w-5 text-[#0A2F7D]" />
                    <h3 className="ml-2 text-lg font-semibold text-gray-900">{exp.company}</h3>
                  </div>
                  {exp.verified && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  )}
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600">{exp.name}</p>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    {exp.country}
                    {exp.experience_years && (
                      <>
                        <TrendingUp className="h-4 w-4 ml-4 mr-1" />
                        {exp.experience_years} years
                      </>
                    )}
                  </div>
                </div>

                <div className={`mb-4 transition-all duration-200 ${expandedCard === exp.id ? 'max-h-full' : 'max-h-32 overflow-hidden'}`}>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Interview Questions:</h4>
                  <ul className="space-y-2">
                    {exp.questions.map((question, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {question}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Posted on {new Date(exp.created_at).toLocaleDateString()}
                  </span>
                  {exp.difficulty && (
                    <span className={`font-medium ${
                      exp.difficulty === 'Hard' ? 'text-red-600' :
                      exp.difficulty === 'Medium' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>
                      {exp.difficulty}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}