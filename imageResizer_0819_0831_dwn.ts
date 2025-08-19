// 代码生成时间: 2025-08-19 08:31:50
import React, { useState } from 'react';

// 图片尺寸批量调整器组件
const ImageResizer: React.FC = () => {
  // 状态：选中的图片文件列表
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  // 状态：新尺寸值
  const [newSize, setNewSize] = useState<number>(100);
  // 状态：是否正在处理图片
  const [processing, setProcessing] = useState<boolean>(false);
  // 状态：错误信息
  const [error, setError] = useState<string | null>(null);

  // 处理文件选择
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  // 调整图片尺寸
  const resizeImages = async () => {
    if (!selectedFiles) return;
    setProcessing(true);
    setError(null);

    try {
      const resizedFiles = Array.from(selectedFiles).map((file) => {
        // 创建一个Image对象
        const img = new Image();
        // 读取图片文件
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            const imgElement = new Image();
            imgElement.src = e.target.result as string;
            imgElement.onload = () => {
              // 创建canvas并绘制图片
              const canvas = document.createElement('canvas');
              canvas.width = newSize;
              canvas.height = newSize;
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.drawImage(imgElement, 0, 0, newSize, newSize);
                const resizedDataURL = canvas.toDataURL(file.type);
                return resizedDataURL;
              }
            };
          }
        };
        reader.readAsDataURL(file);
        return '';
      });

      // 等待所有图片处理完成
      const finalResizedFiles = await Promise.all(resizedFiles);
      console.log('Resized Files:', finalResizedFiles);
      // 这里可以添加代码将处理后的图片保存或发送到服务器
    } catch (err) {
      setError('Failed to resize images.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} disabled={processing} />
      {error && <p>Error: {error}</p>}
      <div>
        <label>New Size:</label>
        <input
          type="number"
          value={newSize}
          onChange={(e) => setNewSize(Number(e.target.value))}
          disabled={processing}
        />
      </div>
      <button onClick={resizeImages} disabled={processing}>Resize Images</button>
      {processing && <p>Processing...</p>}
    </div>
  );
};

export default ImageResizer;