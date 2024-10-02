import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import Candidate from '../components/Candidate';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface.tsx';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<CandidateType | null>(null);
  const [savedCandidates, setSavedCandidates] = useState<CandidateType[]>([]);

  useEffect(() => {
    const loadCandidate = async () => {
      const data = await searchGithub();
      setCandidate(data[0]);
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
      setCandidate(newCandidate[0]);
    }
  };

  const handleSkip = async () => {
    const newCandidate = await searchGithub();
    setCandidate(newCandidate[0]);
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
