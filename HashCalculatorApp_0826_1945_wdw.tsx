// 代码生成时间: 2025-08-26 19:45:25
import React, { useState } from 'react';
import { createHash } from 'crypto';

// HashCalculator组件
const HashCalculatorApp: React.FC = () => {
  // 状态：输入的字符串和生成的哈希值
  const [inputString, setInputString] = useState('');
  const [hashValue, setHashValue] = useState('');

  // 处理输入框值变更的函数
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputString(event.target.value);
  };

  // 计算哈希值的函数
  const calculateHash = (algorithm: 'sha1' | 'sha256' | 'md5') => {
    try {
      // 根据选择的算法创建哈希对象
      const hash = createHash(algorithm);
      // 更新哈希值
      setHashValue(hash.update(inputString).digest('hex'));
    } catch (error) {
      // 错误处理
      console.error('Hash calculation failed:', error);
      setHashValue('Error calculating hash');
    }
  };

  return (
    <div>
      <h1>Hash Calculator Tool</h1>
      <input
        type="text"
        value={inputString}
        onChange={handleInputChange}
        placeholder="Enter text to calculate hash"
      />
      <select
        defaultValue="sha256"
        onChange={(e) => calculateHash(e.target.value as 'sha1' | 'sha256' | 'md5')}
      >
        <option value="sha1">SHA-1</option>
        <option value="sha256">SHA-256</option>
        <option value="md5">MD5</option>
      </select>
      <div>
        <label>Hash Value:</label>
        <div>{hashValue}</div>
      </div>
    </div>
  );
};

export default HashCalculatorApp;