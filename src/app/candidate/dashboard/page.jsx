'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/provider/AuthProvider';
import { ethers } from 'ethers';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { 
  MapPin,
  Building,
  Clock,
  Briefcase,
  CheckCircle2,
  XCircle
} from 'lucide-react';

export default function CandidateDashboardPage() {
  // Auth & wallet
  const { user } = useAuth();
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Please install MetaMask!');
      return;
    }
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balanceWei = await provider.getBalance(address);
      const balanceEth = ethers.formatEther(balanceWei);
      setWalletAddress(address);
      setBalance(parseFloat(balanceEth).toFixed(4));
    } catch (err) {
      console.error(err);
      alert('Failed to connect wallet.');
    }
  };

  // Resume analysis
  const [resumeFile, setResumeFile] = useState(null);
  const [githubUsername, setGithubUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile || !githubUsername.trim()) {
      setError('Please upload a resume and enter your GitHub username.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('resume', resumeFile);
      fd.append('username', githubUsername.trim());
      const res = await fetch('/api/analyze', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Analysis failed');
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Job opportunities (Sample data - replace with actual data)
  const recommendedOpportunities = [];
  const allOpportunities = [];
  const recentApplications = [];

  // Status badge
  const renderStatusBadge = (status, color) => {
    const colorClasses = {
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      red: 'bg-red-100 text-red-800',
    };
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${colorClasses[color]}`}>
        {status}
      </span>
    );
  };

  // Render job card
  const renderJobCard = (job) => (
    <Card key={job.id} className="overflow-hidden border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all cursor-pointer">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 lg:w-1/4 relative h-48 md:h-auto">
          <img src={job.imageUrl || '/placeholder.svg'} alt={job.company} className="object-cover w-full h-full" />
        </div>
        <div className="flex-1 p-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-xl">{job.title}</h3>
                <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                  {job.match}% Match
                </span>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1"><Building className="h-4 w-4"/><span>{job.company}</span></div>
                <div className="flex items-center gap-1"><MapPin className="h-4 w-4"/><span>{job.location}</span></div>
                <div className="flex items-center gap-1"><Briefcase className="h-4 w-4"/><span>{job.type}</span></div>
                <div className="flex items-center gap-1"><Clock className="h-4 w-4"/><span>Posted {job.posted}</span></div>
              </div>
              <p className="text-sm mb-4 line-clamp-2">{job.description}</p>
            </div>
            <div className="flex flex-row md:flex-col gap-2 min-w-[120px]">
              <Button asChild className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
                <Link href={`/candidate/opportunities/${job.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" className="border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">Apply Now</Button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm mb-2">Required tokens:</p>
            <div className="flex flex-wrap gap-4">
              {job.tokens && job.tokens.map((token, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: token.color }}>
                    <span className="text-white text-xs">{token.required}</span>
                  </div>
                  <span className="text-xs">{token.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 space-y-8">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName?.split(' ')[0] || 'User'}</h1>
        
        <Card className="border-2 border-border shadow-shadow p-6">
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>View and manage your credentials</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center text-center md:w-1/3">
              <Avatar className="w-32 h-32 mb-4 border-2 border-border">
                <AvatarImage src={user?.photoURL || '/placeholder.svg'} alt="Profile"/>
                <AvatarFallback>{user?.displayName?.split(' ').map(n => n[0]).join('') || 'JD'}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.displayName}</h2>
              <p className="text-sm text-muted-foreground">Frontend Developer</p>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" onClick={connectWallet}>
                  {walletAddress ? 'Wallet Connected' : 'Connect Wallet'}
                </Button>
              </div>
              {walletAddress && <p className="mt-2 text-sm">{walletAddress} • {balance} ETH</p>}
            </div>
            <div className="flex-1">
              <Tabs defaultValue="about">
                <TabsList className="grid grid-cols-5 w-full border-2 border-border">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="education">Education</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="extracurricular">Extracurricular</TabsTrigger>
                </TabsList>
                {/* Add TabsContent components here */}
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-border shadow-shadow p-6">
          <CardHeader>
            <CardTitle>Analyze Your Profile</CardTitle>
            <CardDescription>Upload resume & GitHub for fit analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Resume (DOCX)</label>
                <input type="file" accept=".docx" onChange={e => setResumeFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium">GitHub Username</label>
                <input type="text" value={githubUsername} onChange={e => setGithubUsername(e.target.value)} placeholder="e.g. arkokundu500" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" />
              </div>
              {error && <p className="text-red-600">{error}</p>}
              <Button type="submit" disabled={loading}>
                {loading ? 'Analyzing…' : 'Analyze Profile'}
              </Button>
            </form>
            {analysisResult && (
              <Card className="mt-6 border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle>Analysis Result</CardTitle>
                  <CardDescription>Resume & GitHub fit</CardDescription>
                </CardHeader>
                <CardContent>
                  <p><strong>Fit Score:</strong> {analysisResult.fitPercentage}%</p>
                  <p><strong>Role:</strong> {analysisResult.finalRole}</p>
                  <p><strong>Skills:</strong> {analysisResult.skills?.join(', ')}</p>
                  {analysisResult.recommendations?.length > 0 && (
                    <ul className="list-disc list-inside mt-2">
                      {analysisResult.recommendations.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  )}
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Recommended Opportunities</h2>
          {recommendedOpportunities.map(renderJobCard)}
        </div>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Opportunities</h2>
          {allOpportunities.map(renderJobCard)}
        </div>
      </div>

      <div className="md:w-80 shrink-0">
        <div className="sticky top-6 space-y-4">
          <Card className="border-2 border-border shadow-shadow">
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your job applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map(app => (
                  <div key={app.id} className="border-b pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{app.jobTitle}</p>
                        <p className="text-sm text-muted-foreground">{app.company}</p>
                        <p className="text-xs text-muted-foreground">Applied on {app.appliedDate}</p>
                      </div>
                      {renderStatusBadge(app.status, app.statusColor)}
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full border-2 border-border shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all">
                  <Link href="/candidate/applications">View All Applications</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}