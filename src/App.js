import React, { useState,/ useEffect } from 'react';
import { Github, Mail, MapPin, ExternalLink, Code2, Star, GitFork, Eye, Menu, X, Phone } from 'lucide-react';

export default function PortfolioWebsite() {
  const [typedText, setTypedText] = useState('');
  const [nameOffset, setNameOffset] = useState(0);
  const [githubData, setGithubData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const fullText = "Hello, I'm";
  const githubUsername = "candradeveloper";
  const whatsappNumber = "6285733142558"; // Format internasional
  
  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);
    
    return () => clearInterval(typingInterval);
  }, []);
  
  // Name swipe animation
  useEffect(() => {
    let direction = 1;
    let position = 0;
    const swipeInterval = setInterval(() => {
      position += direction * 0.5;
      if (position > 10 || position < -10) {
        direction *= -1;
      }
      setNameOffset(position);
    }, 30);
    
    return () => clearInterval(swipeInterval);
  }, []);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch GitHub Data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${githubUsername}`);
        const userData = await userResponse.json();
        setGithubData(userData);
        
        // Fetch repositories
        const reposResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);
        const reposData = await reposResponse.json();
        setRepositories(reposData);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);

  const skills = [
    { name: 'React.js', level: 95 },
    { name: 'TypeScript', level: 90 },
    { name: 'Node.js', level: 88 },
    { name: 'Next.js', level: 92 },
    { name: 'Tailwind CSS', level: 93 },
    { name: 'PostgreSQL', level: 85 },
    { name: 'Docker', level: 80 }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("Hi Candra! I'm interested in working with you.");
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-950/95 backdrop-blur-lg border-b border-slate-800 shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <a href="#home" onClick={() => scrollToSection('home')} className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                CW
              </a>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Home
              </a>
              <a href="#stats" onClick={(e) => { e.preventDefault(); scrollToSection('stats'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Stats
              </a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Skills
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Contact
              </a>
            </div>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <button 
                onClick={openWhatsApp}
                className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
              >
                <Phone size={18} />
                Hire Me
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950/98 backdrop-blur-lg border-t border-slate-800">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} className="block py-2 hover:text-emerald-400 transition-colors">
                Home
              </a>
              <a href="#stats" onClick={(e) => { e.preventDefault(); scrollToSection('stats'); }} className="block py-2 hover:text-emerald-400 transition-colors">
                Stats
              </a>
              <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills'); }} className="block py-2 hover:text-emerald-400 transition-colors">
                Skills
              </a>
              <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }} className="block py-2 hover:text-emerald-400 transition-colors">
                Projects
              </a>
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }} className="block py-2 hover:text-emerald-400 transition-colors">
                Contact
              </a>
              <button 
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all"
              >
                <Phone size={18} />
                Hire Me
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div id="home" className="container mx-auto px-4 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-4 text-2xl md:text-3xl text-emerald-400 font-mono">
            {typedText}<span className="animate-pulse">|</span>
          </div>
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent transition-transform duration-300"
            style={{ transform: `translateX(${nameOffset}px)` }}
          >
            Candra Wicaksono
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-4">Full-Stack Developer</p>
          <p className="text-slate-400 max-w-2xl mx-auto mb-8">
            Passionate about building beautiful and functional web applications. 
            I turn ideas into elegant solutions with clean code and modern technologies.
          </p>
          
          {/* Contact Info */}
          <div className="flex flex-wrap justify-center gap-6 mb-8 text-sm">
            <div className="flex items-center gap-2 text-slate-300">
              <Github size={18} className="text-emerald-400" />
              <span>{githubUsername}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail size={18} className="text-emerald-400" />
              <span>candradeveloper@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone size={18} className="text-emerald-400" />
              <span>+62 857-3314-2558</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin size={18} className="text-emerald-400" />
              <span>Indonesia</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:candradeveloper@gmail.com"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
            >
              Get in Touch
            </a>
            <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all border border-slate-700">
              View Resume
            </button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4 mt-8">
            <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 hover:bg-emerald-500 rounded-lg transition-all transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="mailto:candradeveloper@gmail.com" className="p-3 bg-slate-800 hover:bg-emerald-500 rounded-lg transition-all transform hover:scale-110">
              <Mail size={24} />
            </a>
            <button onClick={openWhatsApp} className="p-3 bg-slate-800 hover:bg-emerald-500 rounded-lg transition-all transform hover:scale-110">
              <Phone size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* GitHub Stats */}
      {!loading && githubData && (
        <div id="stats" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">
              GitHub <span className="text-emerald-400">Statistics</span>
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800 text-center">
                <div className="text-4xl font-bold text-emerald-400 mb-2">
                  {githubData.public_repos}
                </div>
                <div className="text-slate-400 text-sm">Public Repos</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800 text-center">
                <div className="text-4xl font-bold text-cyan-400 mb-2">
                  {githubData.followers}
                </div>
                <div className="text-slate-400 text-sm">Followers</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800 text-center">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  {githubData.following}
                </div>
                <div className="text-slate-400 text-sm">Following</div>
              </div>
              <div className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800 text-center">
                <div className="text-4xl font-bold text-yellow-400 mb-2">
                  {githubData.public_gists}
                </div>
                <div className="text-slate-400 text-sm">Gists</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Activity Visualization */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            GitHub <span className="text-emerald-400">Activity</span>
          </h2>
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-8 border border-slate-800">
            <p className="text-slate-400 text-center mb-6">365 contributions in the last year</p>
            <div className="overflow-x-auto">
              <div className="inline-grid grid-rows-7 gap-1 min-w-max">
                {[...Array(52)].map((_, week) => (
                  <React.Fragment key={week}>
                    {[...Array(7)].map((_, day) => {
                      const intensity = Math.random();
                      let bgColor = 'bg-slate-800';
                      if (intensity > 0.7) bgColor = 'bg-emerald-500';
                      else if (intensity > 0.5) bgColor = 'bg-emerald-600';
                      else if (intensity > 0.3) bgColor = 'bg-emerald-700';
                      else if (intensity > 0.1) bgColor = 'bg-emerald-800';
                      
                      return (
                        <div
                          key={`${week}-${day}`}
                          className={`w-3 h-3 ${bgColor} rounded-sm hover:scale-125 transition-transform cursor-pointer`}
                          style={{ gridColumn: week + 1, gridRow: day + 1 }}
                          title={`${Math.floor(intensity * 10)} contributions`}
                        />
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-xs text-slate-500">
              <span>Less</span>
              <div className="w-3 h-3 bg-slate-800 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-800 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-700 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Skills */}
      <div id="skills" className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Technical <span className="text-emerald-400">Skills</span>
          </h2>
          <div className="grid gap-6">
            {skills.map((skill, index) => (
              <div key={index} className="bg-slate-900/50 backdrop-blur rounded-xl p-6 border border-slate-800">
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">{skill.name}</span>
                  <span className="text-emerald-400">{skill.level}%</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tech Stack Tags */}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'MongoDB', 'PostgreSQL', 'Docker', 'AWS', 'Git'].map((tech, i) => (
              <span key={i} className="px-4 py-2 bg-slate-800 rounded-full text-sm border border-slate-700 hover:border-emerald-500 transition-colors cursor-default">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* GitHub Repositories - Real Data */}
      <div id="projects" className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Latest <span className="text-emerald-400">Repositories</span>
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
              <p className="mt-4 text-slate-400">Loading repositories...</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {repositories.map((repo, index) => (
                <div key={index} className="bg-slate-900/50 backdrop-blur rounded-2xl p-6 border border-slate-800 hover:border-emerald-500 transition-all hover:transform hover:scale-105">
                  <div className="flex justify-between items-start mb-4">
                    <Code2 className="text-emerald-400" size={32} />
                    <div className="flex gap-2">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                      >
                        <Github size={20} />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 truncate">{repo.name}</h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed line-clamp-3">
                    {repo.description || 'No description available'}
                  </p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <Star size={16} className="text-yellow-400" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GitFork size={16} className="text-blue-400" />
                      <span>{repo.forks_count}</span>
                    </div>
                    {repo.watchers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Eye size={16} className="text-purple-400" />
                        <span>{repo.watchers_count}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {repo.language && (
                      <span className="px-3 py-1 bg-slate-800/70 rounded-full text-xs text-emerald-400">
                        {repo.language}
                      </span>
                    )}
                    {repo.topics && repo.topics.slice(0, 3).map((topic, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-800/70 rounded-full text-xs text-cyan-400">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                    Updated: {new Date(repo.updated_at).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <a 
              href={`https://github.com/${githubUsername}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all border border-slate-700 hover:border-emerald-500"
            >
              <Github size={20} />
              View All Repositories
            </a>
          </div>
        </div>
      </div>

      {/* Get in Touch Section */}
      <div id="contact" className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Get in <span className="text-emerald-400">Touch</span>
          </h2>
          <p className="text-slate-400 mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>
          
          <div className="bg-slate-900/50 backdrop-blur rounded-2xl p-8 border border-slate-800">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 text-lg">
                <Mail className="text-emerald-400" />
                <a href="mailto:candradeveloper@gmail.com" className="hover:text-emerald-400 transition-colors">
                  candradeveloper@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <Github className="text-emerald-400" />
                <a href={`https://github.com/${githubUsername}`} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  github.com/{githubUsername}
                </a>
              </div>
              <div className="flex items-center justify-center gap-3 text-lg">
                <Phone className="text-emerald-400" />
                <button onClick={openWhatsApp} className="hover:text-emerald-400 transition-colors">
                  +62 857-3314-2558
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <a 
                href="mailto:candradeveloper@gmail.com"
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-slate-800 hover:bg-slate-700 rounded-lg font-semibold transition-all transform hover:scale-105 border border-slate-700"
              >
                <Mail size={20} />
                Email Me
              </a>
              <button 
                onClick={openWhatsApp}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 bg-emerald-500 hover:bg-emerald-600 rounded-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-emerald-500/30"
              >
                <Phone size={20} />
                WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2026 Candra Wicaksono. All rights reserved.</p>
          <p className="mt-2 text-sm">Built with React & TailwindCSS</p>
        </div>
      </footer>
    </div>
  );
}
