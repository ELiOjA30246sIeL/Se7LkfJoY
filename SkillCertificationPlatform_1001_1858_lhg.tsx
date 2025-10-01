// 代码生成时间: 2025-10-01 18:58:02
import React, { useState } from 'react';

// Define the Skill interface to represent a skill with an ID and name
interface Skill {
  id: string;
  name: string;
}

// Define the Certification interface to represent a certification with details
interface Certification {
  skillId: string;
  certified: boolean;
  dateIssued?: string;
}

// Main component of the skill certification platform
const SkillCertificationPlatform: React.FC = () => {
  // State to store the list of skills
  const [skills, setSkills] = useState<Skill[]>([]);
  // State to store the list of certifications
  const [certifications, setCertifications] = useState<Certification[]>([]);
  // State to track if an error occurred
  const [error, setError] = useState<string>(null);

  // Function to add a new skill to the platform
  const addSkill = (newSkill: Skill) => {
    if (!newSkill.id || !newSkill.name) {
      setError('Error: Skill ID and name are required.');
      return;
    }
    try {
      setSkills([...skills, newSkill]);
    } catch (e) {
      setError('Error: Failed to add skill.');
    }
  };

  // Function to certify a skill for a user
  const certifySkill = (skillId: string) => {
    try {
      const newCertification: Certification = {
        skillId,
        certified: true,
        dateIssued: new Date().toISOString()
      };
      setCertifications([...certifications, newCertification]);
    } catch (e) {
      setError('Error: Failed to certify skill.');
    }
  };

  // Render the platform UI
  return (
    <div>
      {error && <p>Error: {error}</p>}
      <h1>Skill Certification Platform</h1>
      <SkillForm addSkill={addSkill} />
      <CertificationList certifications={certifications} certifySkill={certifySkill} />
    </div>
  );
};

// Component to handle skill input and addition
const SkillForm: React.FC<{ addSkill: (skill: Skill) => void }> = ({ addSkill }) => {
  const [skillId, setSkillId] = useState<string>("");
  const [skillName, setSkillName] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSkill: Skill = { id: skillId, name: skillName };
    addSkill(newSkill);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Skill ID:
        <input type="text" value={skillId} onChange={e => setSkillId(e.target.value)} />
      </label>
      <label>
        Skill Name:
        <input type="text" value={skillName} onChange={e => setSkillName(e.target.value)} />
      </label>
      <button type="submit">Add Skill</button>
    </form>
  );
};

// Component to display the list of certifications
const CertificationList: React.FC<{ certifications: Certification[]; certifySkill: (skillId: string) => void }> = ({ certifications, certifySkill }) => (
  <div>
    <h2>Certifications</h2>
    <ul>
      {certifications.map(cert => (
        <li key={cert.skillId}>
          {cert.skillId}: {cert.certified ? 'Certified' : 'Not Certified'}
          {cert.dateIssued && <> on {new Date(cert.dateIssued).toLocaleDateString()}</>}
          <button onClick={() => certifySkill(cert.skillId)}>Certify</button>
        </li>
      ))}
    </ul>
  </div>
);

export default SkillCertificationPlatform;