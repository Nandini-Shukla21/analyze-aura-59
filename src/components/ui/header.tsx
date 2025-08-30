import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Brain } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [isDark, setIsDark] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize dark mode
    document.documentElement.classList.add('dark');
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <motion.header
      className="sticky top-0 z-50 backdrop-blur-xl bg-glass/50 border-b border-glass-border"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                AI Resume Analyzer
              </h1>
            </div>
          </motion.div>

          {/* Navigation & Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                Home
              </Button>
              <Button
                variant="ghost"
                onClick={() => navigate('/auth')}
                className="text-muted-foreground hover:text-foreground"
              >
                Sign In
              </Button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl hover:bg-glass/50"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDark ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};