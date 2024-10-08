import React from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface.tsx';

interface CandidateProps {
  candidate: CandidateType;
  onSave: () => void;
  onSkip: () => void;
}

const Candidate: React.FC<CandidateProps> = ({ candidate, onSave, onSkip }) => {
  return (
    <div>
      <img src={candidate.avatar_url} alt="avatar" />
      <h2>{candidate.name}</h2>
      <p>{candidate.login}</p>
      <p>{candidate.location}</p>
      <p>{candidate.email}</p>
      <p>{candidate.company}</p>
      <a href={candidate.html_url}>GitHub Profile</a>
      <button onClick={onSave}>+</button>
      <button onClick={onSkip}>-</button>
    </div>
  );
};

export default Candidate;