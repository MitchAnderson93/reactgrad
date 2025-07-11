import { useState, useRef, useEffect } from 'react';
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
  const [debouncedJson, setDebouncedJson] = useState(initialJson);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // debounce the JSON input to avoid excessive updates
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        const parsed = JSON.parse(debouncedJson || '{}');
        setConfig(parsed);
        setJsonError(null);
      } catch (error: any) {
        setJsonError(error.message);
        console.warn('Invalid JSON input:', error);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [debouncedJson]);


  const handleChange = (value?: string) => {
    const raw = value || '';
    setJson(raw);            // Immediately update the editor content
    setDebouncedJson(raw);   // Schedule parsing for later
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
          width: '100%',
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
          zIndex: '9999',
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

        {/* Editor + Error container */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Monaco Editor */}
          <div style={{ flex: jsonError ? '1 1 calc(100% - 4rem)' : '1', display: 'flex' }}>
            <Editor
              key={editorKey}
              wrapperProps={{ style: { flex: 1, display: 'flex' } }}
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

          {/* Error Display */}
          {/* Error Display (with full height space reserved) */}
          {jsonError && (
            <div
              style={{
                height: '4rem',
                background: '#7f1d1d',
                color: '#fca5a5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1rem',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                borderTop: '1px solid #b91c1c',
                boxShadow: '0 -2px 4px rgba(0, 0, 0, 0.4)',
                flexShrink: 0,
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                ⚠️ Error: {jsonError}
              </span>
              <button
                onClick={() => setJsonError(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fca5a5',
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  lineHeight: 1,
                  padding: '0.25rem',
                }}
                title="Dismiss error"
              >
                ×
              </button>
            </div>
          )}


        </div>


      </div>
    </div>
  );
}