// 代码生成时间: 2025-08-05 01:29:01
/* tslint:disable:no-console */
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import JSZip from 'jszip';
import FileSaver from 'file-saver'; // 用于保存文件

// 组件状态
interface UnzipToolState {
  files: File[];
  zipFile: File | null;
  error: string | null;
}

// 压缩文件解压工具组件
const UnzipTool: React.FC = () => {
  const [state, setState] = useState<UnzipToolState>({
    files: [],
    zipFile: null,
    error: null,
  });

  // 处理文件上传
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setState((prevState) => ({ ...prevState, zipFile: files[0] }));
    }
  };

  // 解压文件
  const unzipFile = async () => {
    if (!state.zipFile) {
      setState({ ...state, error: 'Please select a zip file.' });
      return;
    }

    try {
      setState({ ...state, error: null });
      const zip = new JSZip();
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target && e.target.result) {
          zip.loadAsync(e.target.result as ArrayBuffer);
        }
      };
      fileReader.onerror = (e) => {
        throw new Error('Failed to read zip file.');
      };
      fileReader.readAsArrayBuffer(state.zipFile);

      const unzippedFiles = await zip.generateAsync({ type: 'blob' });
      FileSaver.saveAs(unzippedFiles, 'unzipped.zip');

      // 这里可以添加逻辑来处理解压后的文件，例如显示文件列表等
    } catch (error: any) {
      setState({ ...state, error: error.message });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <button onClick={unzipFile}>Unzip</button>
      {state.error && <p>Error: {state.error}</p>}
    </div>
  );
};

// 创建根节点并挂载组件
const container = document.getElementById('root');
createRoot(container).render(<UnzipTool />);