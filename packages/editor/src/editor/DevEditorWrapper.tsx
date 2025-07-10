import { useState, useRef } from 'react';
import { AppRenderer } from '@reactgrad/renderer';
import { Editor } from '@monaco-editor/react';

interface DevEditorWrapperProps {
  initialSchema: any;
}

export function DevEditorWrapper({ initialSchema }: DevEditorWrapperProps) {
  const initialJson = JSON.stringify(initialSchema, null, 2);

  const [json, setJson] = useState(initialJson);
  const [config, setConfig] = useState(initialSchema);
  const [editorKey, setEditorKey] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (value?: string) => {
    setJson(value || '');

    try {
      const parsed = JSON.parse(value || '{}');
      setConfig(parsed);
    } catch (error) {
      console.warn('Invalid JSON input:', error);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-schema.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const text = reader.result as string;
      try {
        const parsed = JSON.parse(text);
        setJson(text);
        setConfig(parsed);
        setEditorKey(prev => prev + 1);
      } catch (error) {
        console.warn('Uploaded file is not valid JSON:', error);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      data-layout="editor-wrapper"
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* App Preview */}
      <div
        data-layout="preview"
        style={{
          flex: '3 0 0',
          height: '100%',
          overflow: 'auto',
          borderRight: '1px solid #333',
        }}
      >
        <AppRenderer config={config} />
      </div>

      {/* Editor */}
      <div
        data-layout="json-editor"
        style={{
          flex: '1 0 0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#1e1e1e',
          color: '#d4d4d4',
        }}
      >
        {/* Toolbar */}
        <div
          style={{
            display: 'flex',
            height: '2.5rem',
            borderBottom: '1px solid #333',
          }}
        >
          <button
            onClick={handleDownload}
            style={{
              flex: 1,
              background: '#252526',
              color: '#d4d4d4',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              height: '100%',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#15803d')}
            onMouseLeave={e => (e.currentTarget.style.background = '#252526')}
          >
            Download
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            style={{
              flex: 1,
              background: '#252526',
              color: '#d4d4d4',
              border: 'none',
              outline: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 500,
              height: '100%',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#15803d')}
            onMouseLeave={e => (e.currentTarget.style.background = '#252526')}
          >
            Upload
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            style={{ display: 'none' }}
            onChange={handleUpload}
          />
        </div>

        {/* Monaco Editor */}
        <div style={{ flex: 1 }}>
          <Editor
            key={editorKey}
            height="100%"
            defaultLanguage="json"
            theme="vs-dark"
            value={json}
            onChange={handleChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: 'on',
            }}
          />
        </div>
      </div>
    </div>
  );
}
