import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@/components/ui/file-upload";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Brain, Zap, Target, FileSearch } from "lucide-react";
import apiService from "@/services/api";

const Home = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = async (file: File) => {
    setIsAnalyzing(true);
    
    try {
      // For demo purposes, use mock data
      // In production, use: const result = await apiService.analyzeResume(file);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      
      // Navigate to dashboard with mock data
      navigate('/dashboard', { state: { analysisData: apiService.getMockAnalysisData() } });
    } catch (error) {
      console.error('Analysis failed:', error);
      setIsAnalyzing(false);
    }
  };

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume for ATS compatibility and optimization opportunities."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Keyword Matching",
      description: "Compare your skills with job requirements and identify missing keywords."
    },
    {
      icon: <FileSearch className="w-6 h-6" />,
      title: "Grammar & Readability",
      description: "Comprehensive grammar check and readability analysis for professional polish."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Results",
      description: "Get detailed feedback and actionable insights in seconds, not hours."
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="home-background" />
      <Header />
      
      <div className="px-4 md:px-8 pt-8">
        <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="float-animation">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              AI Resume Analyzer
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Transform your resume with AI-powered analysis. Get instant feedback on ATS compatibility, 
            keyword optimization, and professional presentation.
          </p>
        </motion.div>

        {/* Upload Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard variant="large" className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold mb-2">Upload Your Resume</h2>
              <p className="text-muted-foreground">
                Get started by uploading your resume in PDF or DOCX format
              </p>
            </div>
            
            <FileUpload 
              onFileSelect={handleFileUpload}
              placeholder={isAnalyzing ? "Analyzing your resume..." : "Upload your resume"}
            />
            
            {isAnalyzing && (
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="pulse-glow glass-card p-4 inline-block">
                  <p className="text-primary font-medium">🧠 AI is analyzing your resume...</p>
                </div>
              </motion.div>
            )}
          </GlassCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <GlassCard className="h-full text-center feature-card cursor-pointer">
                <div className="text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GlassCard variant="gradient" className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to optimize your resume?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands of professionals who have improved their job prospects with our AI-powered analysis.
            </p>
            <Button 
              className="btn-glass text-white border-white/30 hover:bg-white/20"
              size="lg"
              onClick={() => navigate('/auth')}
            >
              Get Started Free
            </Button>
          </GlassCard>
        </motion.div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Home;