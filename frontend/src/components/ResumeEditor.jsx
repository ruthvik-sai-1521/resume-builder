import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { enhanceSection, saveResume } from '../api/api';
import { FaUpload, FaPlus, FaTrash, FaSave, FaDownload, FaRobot } from 'react-icons/fa';
import html2pdf from 'html2pdf.js';

const dummyResume = {
  name: "John Doe",
  summary: "Experienced frontend developer...",
  education: ["B.Tech - CSE, XYZ University"],
  experience: ["Frontend Intern at ABC"],
  skills: ["React", "JavaScript", "CSS"]
};

const ResumeEditor = () => {
  const [resume, setResume] = useState(null);

  const onDrop = () => {
    setResume(dummyResume);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleChangeListItem = (section, index, value) => {
    const updated = [...resume[section]];
    updated[index] = value;
    setResume({ ...resume, [section]: updated });
  };

  const handleAddItem = (section) => {
    setResume({ ...resume, [section]: [...resume[section], ""] });
  };

  const handleRemoveItem = (section, index) => {
    const updated = resume[section].filter((_, i) => i !== index);
    setResume({ ...resume, [section]: updated });
  };

  const handleEnhance = async (section) => {
    const original = resume[section];
    let enhanced;
    if (Array.isArray(original)) {
      enhanced = await Promise.all(
        original.map((item) => enhanceSection(section, item))
      );
    } else {
      enhanced = await enhanceSection(section, original);
    }
    setResume({ ...resume, [section]: enhanced });
  };

  const handleSaveResume = async () => {
    const response = await saveResume(resume);
    alert(response.message || "Resume save attempt completed.");
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('resume-preview');

    // Temporarily show the hidden element
    element.style.display = 'block';

    const opt = {
      margin: 1,
      filename: 'resume.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().from(element).set(opt).save().then(() => {
      // Hide it again after PDF is saved
      element.style.display = 'none';
    });
  };

  if (!resume) {
    return (
      <div className="upload-container" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="upload-box">
          <FaUpload size={60} color="#555" />
          <p>Click or drag a .pdf/.docx file here to upload your resume</p>
        </div>
      </div>
    );
  }

  return (
    <div className="editor-container">
      <h2>Edit Your Resume</h2>

      <input
        type="text"
        value={resume.name}
        onChange={(e) => setResume({ ...resume, name: e.target.value })}
        placeholder="Name"
        className="input"
      />

      <textarea
        value={resume.summary}
        onChange={(e) => setResume({ ...resume, summary: e.target.value })}
        className="textarea"
        placeholder="Summary"
      />
      <button className="btn blue" onClick={() => handleEnhance("summary")}>
        <FaRobot /> Enhance Summary
      </button>

      {["education", "experience", "skills"].map((section) => (
        <div key={section}>
          <h3>{section.charAt(0).toUpperCase() + section.slice(1)}</h3>
          {resume[section].map((item, i) => (
            <div key={i} className="list-item">
              <input
                value={item}
                className="input"
                onChange={(e) => handleChangeListItem(section, i, e.target.value)}
              />
              <button className="btn red" onClick={() => handleRemoveItem(section, i)}>
                <FaTrash />
              </button>
            </div>
          ))}
          <button className="btn green" onClick={() => handleAddItem(section)}>
            <FaPlus /> Add
          </button>
          <button className="btn blue" onClick={() => handleEnhance(section)}>
            <FaRobot /> Enhance
          </button>
        </div>
      ))}

      <button className="btn yellow" onClick={handleSaveResume}>
        <FaSave /> Save Resume
      </button>
      <button className="btn purple" onClick={handleDownloadPDF}>
        <FaDownload /> Download PDF
      </button>

      {/* Hidden Printable Preview */}
      <div id="resume-preview" style={{ display: 'none', padding: '2rem', fontFamily: 'Arial' }}>
        <h1>{resume.name}</h1>
        <p>{resume.summary}</p>
        <h2>Education</h2>
        <ul>{resume.education.map((e, i) => <li key={i}>{e}</li>)}</ul>
        <h2>Experience</h2>
        <ul>{resume.experience.map((e, i) => <li key={i}>{e}</li>)}</ul>
        <h2>Skills</h2>
        <ul>{resume.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </div>
    </div>
  );
};

export default ResumeEditor;
