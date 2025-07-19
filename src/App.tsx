import React, { useState, useEffect } from 'react';
import { ChevronDown, Globe, Users, Award, Calendar, MapPin, Clock, Gavel, BookOpen, Trophy, MessageSquare, Target, Lightbulb } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine active section based on scroll position
      const sections = [
        { id: 'hero', start: 0, end: 800 },
        { id: 'about', start: 800, end: 1600 },
        { id: 'activities', start: 1600, end: 2400 },
        { id: 'details', start: 2400, end: 3200 },
        { id: 'register', start: 3200, end: 4000 }
      ];
      
      const current = sections.find(section => 
        window.scrollY >= section.start && window.scrollY < section.end
      );
      
      if (current) {
        setActiveSection(current.id);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date('2025-08-22T00:00:00');
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const sectionMap: { [key: string]: number } = {
      hero: 0,
      about: 800,
      activities: 1600,
      details: 2400,
      register: 3200
    };
    
    window.scrollTo({
      top: sectionMap[sectionId],
      behavior: 'smooth'
    });
  };

  const parallaxOffset = scrollY * 0.5;
  const fadeInOffset = Math.max(0, 1 - scrollY / 800);

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Target },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'activities', label: 'Activities', icon: Lightbulb },
    { id: 'details', label: 'Details', icon: Calendar },
    { id: 'register', label: 'Register', icon: Trophy }
  ];

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Left Navigation Bar */}
      <nav className="fixed left-6 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-md rounded-full p-2 border border-white/20">
          <div className="space-y-4">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`group relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  activeSection === id 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
                title={label}
              >
                <Icon className="w-5 h-5" />
                
                {/* Tooltip */}
                <div className="absolute left-16 bg-black/90 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                  {label}
                </div>
                
                {/* Active indicator */}
                {activeSection === id && (
                  <div className="absolute -right-2 w-1 h-8 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center">
        {/* Background with parallax */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
          }}
        />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-12 gap-4 h-full p-8">
            {[...Array(144)].map((_, i) => (
              <div
                key={i}
                className="border border-white/10 animate-pulse"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Main content */}
        <div 
          className="relative z-10 text-center px-4"
          style={{
            opacity: fadeInOffset,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-8 tracking-wider">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PRESTIGE
            </span>
            <br />
            <span className="text-white">MUN</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Diplomatic Excellence. Global Perspectives. Transformative Debates.
          </p>

          {/* Countdown Timer */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl mb-6 text-blue-400">Conference Begins In</h2>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-3xl md:text-4xl font-bold text-white">{value}</div>
                  <div className="text-sm uppercase tracking-wider text-gray-400">{unit}</div>
                </div>
              ))}
            </div>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
            Register Now
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white/60" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"
          style={{
            transform: `translateY(${(scrollY - 800) * 0.2}px)`,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div 
            className="grid md:grid-cols-2 gap-16 items-center"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 400) / 400)),
              transform: `translateY(${Math.max(0, 100 - (scrollY - 400) / 4)}px)`,
            }}
          >
            <div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
                Where Future
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {" "}Leaders
                </span>
                <br />Are Born
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed mb-8">
                Prestige MUN brings together the brightest minds from around the world to engage in 
                diplomatic discourse, debate global issues, and forge the path toward a better future.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed mb-8">
                Our conference provides an unparalleled platform for students to develop critical thinking, 
                public speaking, and negotiation skills while addressing the world's most pressing challenges. 
                Through authentic simulation of United Nations proceedings, delegates gain invaluable experience 
                in international relations and diplomacy.
              </p>
              <div className="flex items-center space-x-4 text-blue-400">
                <MapPin className="w-6 h-6" />
                <span className="text-lg">Virtual & In-Person Experience</span>
              </div>
            </div>
            
            <div className="space-y-8">
              {[
                { icon: Globe, title: "Global Reach", desc: "Delegates from 50+ countries", color: "from-blue-500 to-cyan-500" },
                { icon: Users, title: "Expert Chairs", desc: "Industry leaders and academics", color: "from-purple-500 to-pink-500" },
                { icon: Award, title: "Recognition", desc: "Certificates and awards for excellence", color: "from-yellow-500 to-orange-500" }
              ].map(({ icon: Icon, title, desc, color }, index) => (
                <div 
                  key={title}
                  className="flex items-center space-x-6 p-6 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className={`p-3 bg-gradient-to-r ${color} rounded-lg`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-gray-400">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="relative py-32 px-4">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-indigo-900/30 to-purple-900/30"
          style={{
            transform: `translateY(${(scrollY - 1600) * 0.15}px)`,
          }}
        />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div 
            className="text-center mb-16"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 1200) / 400)),
              transform: `translateY(${Math.max(0, 100 - (scrollY - 1200) / 4)}px)`,
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Conference
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Activities
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Immerse yourself in a comprehensive diplomatic experience with diverse activities 
              designed to challenge and inspire future global leaders.
            </p>
          </div>

          <div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 1400) / 400)),
              transform: `translateY(${Math.max(0, 80 - (scrollY - 1400) / 5)}px)`,
            }}
          >
            {[
              {
                icon: Gavel,
                title: "Committee Sessions",
                description: "Engage in authentic UN committee simulations with real-world crisis scenarios and diplomatic negotiations.",
                color: "from-blue-500 to-indigo-600"
              },
              {
                icon: MessageSquare,
                title: "Moderated Caucuses",
                description: "Participate in structured debates and discussions on pressing international issues and policy solutions.",
                color: "from-purple-500 to-violet-600"
              },
              {
                icon: Users,
                title: "Networking Events",
                description: "Connect with delegates, chairs, and industry professionals from around the world in exclusive social events.",
                color: "from-pink-500 to-rose-600"
              },
              {
                icon: BookOpen,
                title: "Workshops & Training",
                description: "Attend specialized workshops on diplomacy, public speaking, and international relations led by experts.",
                color: "from-green-500 to-emerald-600"
              },
              {
                icon: Trophy,
                title: "Awards Ceremony",
                description: "Recognition for outstanding delegates, best position papers, and exceptional diplomatic performance.",
                color: "from-yellow-500 to-amber-600"
              },
              {
                icon: Globe,
                title: "Cultural Exchange",
                description: "Experience diverse cultures through international food, performances, and cultural presentation sessions.",
                color: "from-cyan-500 to-teal-600"
              }
            ].map(({ icon: Icon, title, description, color }, index) => (
              <div 
                key={title}
                className="group p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className={`inline-flex p-4 bg-gradient-to-r ${color} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                  {title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Activities Info */}
          <div 
            className="mt-16 p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-white/20"
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 1800) / 400)),
              transform: `translateY(${Math.max(0, 60 - (scrollY - 1800) / 6)}px)`,
            }}
          >
            <h3 className="text-3xl font-bold mb-6 text-center">Special Features</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-blue-400">Crisis Committees</h4>
                <p className="text-gray-300">
                  Experience fast-paced, dynamic scenarios where delegates must respond to evolving 
                  international crises in real-time, testing adaptability and quick thinking.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xl font-semibold text-purple-400">Guest Speakers</h4>
                <p className="text-gray-300">
                  Learn from distinguished diplomats, UN officials, and international relations 
                  experts who will share insights from their real-world experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Details */}
      <section id="details" className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div 
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 2400) / 400)),
              transform: `translateY(${Math.max(0, 100 - (scrollY - 2400) / 4)}px)`,
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-16">
              Conference
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}Details
              </span>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <Calendar className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Date</h3>
                <p className="text-gray-300">August 22-24, 2025</p>
              </div>
              
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <Clock className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Duration</h3>
                <p className="text-gray-300">3 Days of Intensive Debate</p>
              </div>
              
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                <Users className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">Delegates</h3>
                <p className="text-gray-300">500+ Participants Expected</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-8 rounded-lg border border-white/20">
              <h3 className="text-3xl font-bold mb-4">Committee Themes</h3>
              <div className="grid md:grid-cols-2 gap-4 text-left">
                <ul className="space-y-2 text-gray-300">
                  <li>• UN Security Council</li>
                  <li>• Human Rights Council</li>
                  <li>• Economic and Social Council</li>
                </ul>
                <ul className="space-y-2 text-gray-300">
                  <li>• International Court of Justice</li>
                  <li>• General Assembly</li>
                  <li>• Crisis Committee</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="register" className="relative py-32 px-4">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-gray-900" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div 
            style={{
              opacity: Math.max(0, Math.min(1, (scrollY - 3200) / 400)),
              transform: `translateY(${Math.max(0, 100 - (scrollY - 3200) / 4)}px)`,
            }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Ready to Make
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                {" "}History?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Join the most prestigious Model United Nations conference and be part of 
              shaping tomorrow's global leadership.
            </p>
            
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <button className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                Register as Delegate
              </button>
              <button className="w-full sm:w-auto bg-transparent border-2 border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-16 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Prestige MUN</h3>
          <p className="text-gray-400 mb-8">Diplomatic Excellence Since 2025</p>
          <div className="flex justify-center space-x-8 text-gray-400">
            <span>contact@prestigemun.org</span>
            <span>|</span>
            <span>+1 (555) 123-4567</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
