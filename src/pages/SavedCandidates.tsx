import React, {useState, useEffect} from 'react';
import { Candidate as CandidateType } from '../interfaces/Candidate.interface.tsx';

// interface SavedCandidatesProps {
//   candidates: CandidateType[];
// }

const SavedCandidates: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateType[]>([]);
  useEffect(() => {
    const savedCandidatesFromStorage = localStorage.getItem('savedCandidates');
    if (savedCandidatesFromStorage) {
      setCandidates(JSON.parse(savedCandidatesFromStorage));
    }
  }, []);

  console.log(candidates);
  return (
    <div>
      {candidates.length === 0 ? (
        <p>No candidates have been accepted</p>
      ) : (
        candidates.map(candidate => (
          <div key={candidate.id}>
            <img src={candidate.avatar_url} alt="avatar" />
            <h2>{candidate.name}</h2>
            <p>{candidate.login}</p>
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
