import { useState } from 'react';
import { FaUserPlus, FaSearch, FaClipboardList, FaRegCheckCircle } from 'react-icons/fa';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const steps = [
    {
      title: '1. Create an Account',
      desc: 'Sign up as a recruiter or job seeker in just a few steps.',
      details: 'Provide your information and start exploring the platform. You’ll get access to personalized features based on your profile type.',
      icon: <FaUserPlus size={40} color="#4F46E5" />,
    },
    {
      title: '2. Post or Find Jobs',
      desc: 'Recruiters can post jobs, and candidates can browse and apply.',
      details: 'Recruiters can post job openings, and seekers can browse and apply for jobs using powerful search filters.',
      icon: <FaSearch size={40} color="#4F46E5" />,
    },
    {
      title: '3. Manage Applications',
      desc: 'Track job applications and update statuses through your dashboard.',
      details: 'Recruiters can track applications, review resumes, and interact with candidates directly from their dashboard.',
      icon: <FaClipboardList size={40} color="#4F46E5" />,
    },
    {
      title: '4. Get Hired or Hire',
      desc: 'Recruiters select candidates. Job seekers land their next opportunity.',
      details: 'Recruiters can approve or reject candidates based on their application and qualifications.',
      icon: <FaRegCheckCircle size={40} color="#4F46E5" />,
    },
  ];

  const handleStepClick = (index: number) => {
    setActiveStep(activeStep === index ? null : index); // Toggle between showing and hiding step details
  };

  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow p-6 transition-transform transform hover:scale-105 cursor-pointer"
              onClick={() => handleStepClick(index)}
            >
              <div className="mb-4">{step.icon}</div>
              <div className="text-xl font-semibold text-indigo-600 mb-2">{step.title}</div>
              <p className="text-gray-700 mb-4">{step.desc}</p>
              {activeStep === index && (
                <div className="mt-2 text-sm text-gray-600">{step.details}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
