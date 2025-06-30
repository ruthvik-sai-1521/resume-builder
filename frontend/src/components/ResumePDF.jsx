import React from 'react';

const ResumePDF = React.forwardRef(({ resume }, ref) => {
  return (
    <div ref={ref} style={{ padding: '1rem', fontFamily: 'Arial' }}>
      <h2>{resume.name}</h2>
      <h3>Summary</h3>
      <p>{resume.summary}</p>

      <h3>Education</h3>
      <ul>
        {resume.education.map((edu, i) => (
          <li key={i}>{edu}</li>
        ))}
      </ul>

      <h3>Experience</h3>
      <ul>
        {resume.experience.map((exp, i) => (
          <li key={i}>{exp}</li>
        ))}
      </ul>

      <h3>Skills</h3>
      <ul>
        {resume.skills.map((skill, i) => (
          <li key={i}>{skill}</li>
        ))}
      </ul>
    </div>
  );
});

export default ResumePDF;