// 代码生成时间: 2025-10-12 03:24:25
import React, { useState } from 'react';

// 模拟从后端API获取的内容数据
interface ContentData {
  id: string;
  title: string;
  content: string;
}

// ContentManager 组件，用于管理内容
const ContentManager: React.FC = () => {
  const [contents, setContents] = useState<ContentData[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [newContent, setNewContent] = useState<ContentData>({ id: '', title: '', content: '' });

  // 从后端API获取内容
  const fetchContents = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('/api/contents');
      if (!response.ok) {
        throw new Error('Failed to fetch contents');
      }
      const data: ContentData[] = await response.json();
      setContents(data);
    } catch (err) {
      setError('Error fetching contents: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 添加新内容
  const addContent = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('/api/contents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newContent),
      });
      if (!response.ok) {
        throw new Error('Failed to add content');
      }
      const data: ContentData = await response.json();
      setContents([...contents, data]);
      setNewContent({ id: '', title: '', content: '' });
    } catch (err) {
      setError('Error adding content: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Content Management System</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <form onSubmit={(e) => { e.preventDefault(); addContent(); }}>
        <input
          type="text"
          value={newContent.title}
          onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
          placeholder="Title"
        />
        <textarea
          value={newContent.content}
          onChange={(e) => setNewContent({ ...newContent, content: e.target.value })}
          placeholder="Content"
        />
        <button type="submit">Add Content</button>
      </form>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <h2>{content.title}</h2>
            <p>{content.content}</p>
          </li>
        ))}
      </ul>
      <button onClick={fetchContents}>Refresh Contents</button>
    </div>
  );
};

export default ContentManager;