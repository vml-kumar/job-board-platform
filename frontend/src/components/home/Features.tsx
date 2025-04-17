const Features = () => {
  const features = [
    {
      title: 'Curated Jobs',
      desc: 'Only high-quality freelance jobs from verified companies.',
    },
    {
      title: 'Remote Freedom',
      desc: 'Work from anywhere around the globe at your convenience.',
    },
    {
      title: 'Easy Application',
      desc: 'Apply to jobs with just a few clicks—simple and fast.',
    },
    {
      title: 'Track Applications',
      desc: 'View the status of your applications in real-time.',
    },
    {
      title: 'Powerful Dashboard',
      desc: 'Manage your job posts, applications, and profile easily from a single dashboard.',
    },
    {
      title: 'Resume & Profile Builder',
      desc: 'Create and update your freelancer profile to attract recruiters.',
    },
  ];

  return (
    <section className="py-16 bg-white px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Why Choose JobForge?</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <div key={idx} className="bg-gray-50 p-6 rounded shadow hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
