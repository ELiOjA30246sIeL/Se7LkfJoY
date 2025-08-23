// 代码生成时间: 2025-08-23 12:39:21
import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import { Dialog, Button, Spinner } from 'react-bootstrap';

interface FileBackupSyncToolProps {
  sourcePath: string;
  destinationPath: string;
}

const FileBackupSyncTool: React.FC<FileBackupSyncToolProps> = ({ sourcePath, destinationPath }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<Error | null>(null);

  // Function to copy files from source to destination
  const copyFile = (source: string, destination: string) => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(source)
        .on('error', reject)
        .pipe(fs.createWriteStream(destination))
        .on('finish', resolve)
        .on('error', reject);
    });
  };

  // Function to recursively copy directories
  const copyDirectory = (sourceDir: string, destinationDir: string) => {
    return new Promise((resolve, reject) => {
      fs.readdir(sourceDir, { withFileTypes: true }, (err, files) => {
        if (err) return reject(err);

        const promises = files.map(file => {
          const source = path.join(sourceDir, file.name);
          const destination = path.join(destinationDir, file.name);

          if (file.isDirectory()) {
            return copyDirectory(source, destination);
          } else {
            return copyFile(source, destination);
          }
        });

        Promise.all(promises).then(resolve).catch(reject);
      });
    });
  };

  // Handle file backup and sync
  const handleBackupSync = async () => {
    try {
      setIsSyncing(true);
      setError(null);
      setProgress(0);

      await copyDirectory(sourcePath, destinationPath);
      setProgress(100);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    // Perform backup sync on component mount
    handleBackupSync();
  }, []);

  return (
    <Dialog>
      <Dialog.Header>
        <Dialog.Title>File Backup and Sync Tool</Dialog.Title>
      </Dialog.Header>
      <Dialog.Body>
        {error && <p>Error: {error.message}</p>}
        {isSyncing && <Spinner animation="border"/>}
        {progress}
        {!isSyncing && <Button onClick={handleBackupSync}>Sync Again</Button>}
      </Dialog.Body>
    </Dialog>
  );
};

export default FileBackupSyncTool;
