// 代码生成时间: 2025-09-19 07:44:35
import React, { useState } from 'react';
import XLSX from 'xlsx';

// ExcelTableGenerator 是一个React组件，用于生成Excel表格
const ExcelTableGenerator: React.FC = () => {
  // 表格数据状态
  const [tableData, setTableData] = useState<any[]>([]);
  // Excel文件名状态
  const [filename, setFilename] = useState<string>('');

  // 处理数据的函数，将数据转换成Excel文件
  const handleExportExcel = () => {
    try {
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelBuffer = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

      // 创建Blob对象并触发下载
      const excelFile = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8;' });
      const url = URL.createObjectURL(excelFile);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting to Excel:', error);
      alert('Failed to export to Excel');
    }
  };

  return (
    <div>
      {/* 输入框用于输入文件名 */}
      <input
        type="text"
        value={filename}
        onChange={(e) => setFilename(e.target.value)}
        placeholder="Enter filename"
        style={{ marginBottom: '10px' }}
      />
      {/* 按钮用于导出Excel文件 */}
      <button onClick={handleExportExcel}>Export to Excel</button>
    </div>
  );
};

export default ExcelTableGenerator;
