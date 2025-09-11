// 代码生成时间: 2025-09-11 17:55:59
import React, { useState, useEffect } from 'react';
import './LogParserTool.css'; // Assume a CSS file for styling

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
}

interface LogFile {
  filename: string;
  content: string;
}

const LogParserTool: React.FC = () => {
  const [logFile, setLogFile] = useState<LogFile | null>(null);
  const [parsedLogs, setParsedLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Load and parse the log file
  const loadLogFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const content = reader.result as string;
        const logEntries = content.split('
').map((line) => {
          const parts = line.split(' ');
          if (parts.length >= 3) {
            return {
              timestamp: parts[0],
              level: parts[1],
              message: parts.slice(2).join(' ')
            };
          }
          return null;
        }).filter(Boolean) as LogEntry[];

        setLogFile({ filename: file.name, content: content });
        setParsedLogs(logEntries);
      } catch (e) {
        setError('Error parsing log file: ' + e.message);
      }
    };

    reader.onerror = () => {
      setError('Error reading log file');
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <h1>Log File Parser</h1>
      {error && <div className='error'>{error}</div>}
      <input type='file' onChange={(e) => {
        if (e.target.files?.length) {
          loadLogFile(e.target.files[0]);
        }
      }} />
      {logFile && (
        <div>
          <h2>Log File: {logFile.filename}</h2>
          <ul>
            {parsedLogs.map((log, index) => (
              <li key={index}>
                <span>{log.timestamp} - {log.level}:</span> {log.message}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default LogParserTool;
