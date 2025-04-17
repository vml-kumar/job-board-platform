const Hero = () => {
  return (
    <section className="bg-indigo-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Find Your Next Job Opportunity
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Browse thousands of job listings from top companies across various industries.
          Apply, get hired, and start your career journey today.
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/login"
            className="bg-white text-indigo-600 hover:bg-indigo-100 px-6 py-3 rounded-full text-lg font-semibold"
          >
            Browse Jobs
          </a>
          <a
            href="/login"
            className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-6 py-3 rounded-full text-lg font-semibold"
          >
            Post a Job
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
