// 代码生成时间: 2025-08-28 16:38:42
// unzip_tool.tsx
// 压缩文件解压工具组件
import React, { useState } from 'react';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

interface UnzipToolProps {}

const UnzipTool: React.FC<UnzipToolProps> = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    }
  };

  // 解压文件
  const unzipFile = async () => {
    if (!file) {
      setError("Please upload a file before unzipping.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const zip = new JSZip();
      const content = await zip.loadAsync(file);
      const files = content.file(/* 过滤出需要的文件 */);
      const zipContent = await files.async("blob");
      FileSaver.saveAs(zipContent, files.name);
    } catch (err: any) {
      setError(err.message || 'An error occurred during unzipping.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      {file && (
        <button onClick={unzipFile} disabled={isLoading}>Unzip File</button>
      )}
      {error && <p>{error}</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};

export default UnzipTool;
