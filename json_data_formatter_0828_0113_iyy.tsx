// 代码生成时间: 2025-08-28 01:13:50
import React, { useState } from 'react';

type JsonData = {
  jsonString: string;
  error: string | null;
  prettyJsonString: string;
};

const JsonDataFormatter: React.FC = () => {
  const [jsonData, setJsonData] = useState<JsonData>({
    jsonString: '',
    error: null,
    prettyJsonString: '',
  });

  // 处理JSON输入的函数，尝试解析JSON并格式化输出
  const handleJsonInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    try {
      const inputJsonString = event.target.value;
      const parsedJson = JSON.parse(inputJsonString);
      const prettyJsonString = JSON.stringify(parsedJson, null, 2);
      setJsonData({
        jsonString: inputJsonString,
        error: null,
        prettyJsonString,
      });
    } catch (error) {
      setJsonData({
        jsonString: event.target.value,
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        prettyJsonString: '',
      });
    }
  };

  return (
    <div>
      <h1>JSON Data Formatter</h1>
      <textarea
        value={jsonData.jsonString}
        onChange={handleJsonInputChange}
        placeholder='Enter JSON data...'
        rows={10}
        cols={50}
      />
      {jsonData.error && <p style={{ color: 'red' }}>{jsonData.error}</p>}
      <div>
        <h2>Pretty JSON Output:</h2>
        <pre>{jsonData.prettyJsonString}</pre>
      </div>
    </div>
  );
};

export default JsonDataFormatter;