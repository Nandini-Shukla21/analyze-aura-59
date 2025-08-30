// AI Resume Analyzer API Service
// Handles all backend communication for resume analysis

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method for making requests
  async makeRequest(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Upload and analyze resume
  async analyzeResume(file, jobDescription = null) {
    const formData = new FormData();
    formData.append('resume', file);
    
    if (jobDescription) {
      formData.append('job_description', jobDescription);
    }

    const response = await fetch(`${this.baseURL}/analyze`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Analysis failed: ${response.status}`);
    }

    return await response.json();
  }

  // Get resume scoring breakdown
  async getResumeScore(resumeId) {
    return this.makeRequest(`/score/${resumeId}`);
  }

  // Get keyword analysis
  async getKeywordAnalysis(resumeId, jobDescription = null) {
    const endpoint = jobDescription 
      ? `/keywords/${resumeId}?job_description=${encodeURIComponent(jobDescription)}`
      : `/keywords/${resumeId}`;
    
    return this.makeRequest(endpoint);
  }

  // Get grammar and readability analysis
  async getGrammarAnalysis(resumeId) {
    return this.makeRequest(`/grammar/${resumeId}`);
  }

  // Compare resume with job description
  async compareWithJob(resumeId, jobDescription) {
    return this.makeRequest(`/compare/${resumeId}`, {
      method: 'POST',
      body: JSON.stringify({ job_description: jobDescription }),
    });
  }

  // Export analysis report (frontend-only for now)
  async exportReport(analysisData) {
    // This will be handled client-side for now
    return Promise.resolve(analysisData);
  }

  // Mock data for development - remove when backend is ready
  getMockAnalysisData() {
    return {
      overall_score: 78,
      ats_score: 82,
      keyword_match_percentage: 75,
      grammar_score: 85,
      readability_score: 80,
      matched_skills: [
        'JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'
      ],
      missing_skills: [
        'Kubernetes', 'TypeScript', 'GraphQL', 'CI/CD'
      ],
      grammar_suggestions: [
        {
          type: 'spelling',
          text: 'Misspelled word: "recieve"',
          suggestion: 'Change to "receive"',
          position: { line: 5, column: 12 }
        },
        {
          type: 'grammar',
          text: 'Missing comma after introductory phrase',
          suggestion: 'Add comma after "In my previous role"',
          position: { line: 8, column: 22 }
        }
      ],
      keyword_analysis: {
        total_keywords: 45,
        matched_keywords: 34,
        missing_critical: ['machine learning', 'data analysis'],
        keyword_density: 0.12
      },
      sections_analysis: {
        experience: { score: 85, suggestions: ['Add quantified achievements'] },
        skills: { score: 70, suggestions: ['Include more relevant technologies'] },
        education: { score: 90, suggestions: [] },
        summary: { score: 75, suggestions: ['Make it more impactful'] }
      }
    };
  }
}

// Export singleton instance
export default new ApiService();

// Named exports for specific functions
export const analyzeResume = (file, jobDescription) => 
  ApiService.prototype.analyzeResume.call(new ApiService(), file, jobDescription);

export const getResumeScore = (resumeId) => 
  ApiService.prototype.getResumeScore.call(new ApiService(), resumeId);

export const getKeywordAnalysis = (resumeId, jobDescription) => 
  ApiService.prototype.getKeywordAnalysis.call(new ApiService(), resumeId, jobDescription);