import React from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface.tsx';

interface SavedCandidatesProps {
  candidates: CandidateType[];
}

const SavedCandidates: React.FC<SavedCandidatesProps> = ({ candidates }) => {
  return (
    <div>
      {candidates.length === 0 ? (
        <p>No candidates have been accepted</p>
      ) : (
        candidates.map(candidate => (
          <div key={candidate.id}>
            <img src={candidate.avatar_url} alt="avatar" />
            <h2>{candidate.name}</h2>
            <p>{candidate.username}</p>
            <p>{candidate.location}</p>
            <p>{candidate.email}</p>
            <p>{candidate.company}</p>
            <a href={candidate.html_url}>GitHub Profile</a>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedCandidates;
