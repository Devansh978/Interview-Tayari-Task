import React from 'react';
import { BarChart3, Users, BookOpen, Award, TrendingUp, Clock } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Dashboard() {
  const { user } = useAuth();

  const submissions = [
  { id: 1, verified: true, responseTime: 36 },
  { id: 2, verified: false, responseTime: 60 },
  { id: 3, verified: true, responseTime: 48 },
];

// Logic for calculating statistics
const totalSubmissions = submissions.length;
const verifiedSubmissions = submissions.filter((s) => s.verified).length;
const successRate = ((verifiedSubmissions / totalSubmissions) * 100).toFixed(2);
const averageResponseTime = (
  submissions.reduce((total, sub) => total + sub.responseTime, 0) / totalSubmissions
).toFixed(2);

const stats = [
  { name: "Total Submissions", value: totalSubmissions, icon: BookOpen },
  { name: "Verified Submissions", value: verifiedSubmissions, icon: Award },
  { name: "Success Rate", value: `${successRate}%`, icon: TrendingUp },
  { name: "Average Response Time", value: `${averageResponseTime}h`, icon: Clock },
];

  const recentActivity = [
    { type: 'submission', company: 'Google', date: '2024-01-15', status: 'verified' },
    { type: 'submission', company: 'Microsoft', date: '2024-01-14', status: 'pending' },
    { type: 'submission', company: 'Amazon', date: '2024-01-13', status: 'verified' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back, {user?.email}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white overflow-hidden shadow rounded-lg"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Icon className="h-6 w-6 text-[#0A2F7D]" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.name}
                      </dt>
                      <dd className="text-lg font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Recent Activity
          </h3>
        </div>
        <div className="border-t border-gray-200">
          <ul role="list" className="divide-y divide-gray-200">
            {recentActivity.map((activity, index) => (
              <li key={index} className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BookOpen className="h-5 w-5 text-[#0A2F7D]" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.company}
                      </p>
                      <p className="text-sm text-gray-500">
                        Submitted on {activity.date}
                      </p>
                    </div>
                  </div>
                  <div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        activity.status === 'verified'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {activity.status}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}