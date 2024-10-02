import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from './Candidate';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<any>(null);
  const [savedCandidates, setSavedCandidates] = useState<any[]>([]);

  useEffect(() => {
    const loadCandidate = async () => {
      const data = await searchGithub();
      setCandidate(data);
    };

    loadCandidate();
  }, []);

  const handleSave = async () => {
    if (candidate) {
      await searchGithubUser(candidate.username); // Assuming this saves the candidate
      const updatedSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem('savedCandidates', JSON.stringify(updatedSavedCandidates));
      const newCandidate = await searchGithub();
      setCandidate(newCandidate);
    }
  };

  const handleSkip = async () => {
    const newCandidate = await searchGithub();
    setCandidate(newCandidate);
  };

  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem('savedCandidates');
    if (savedCandidatesFromStorage) {
      setSavedCandidates(JSON.parse(savedCandidatesFromStorage));
    }
  }, []);

  return (
    <div>
      <h1>Candidate Search</h1>
      {candidate ? (
        <Candidate candidate={candidate} onSave={handleSave} onSkip={handleSkip} />
      ) : (
        <p>No more candidates available</p>
      )}
    </div>
  );
};


export default CandidateSearch;
