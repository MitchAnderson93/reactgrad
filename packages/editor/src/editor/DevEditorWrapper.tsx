// packages/editor/src/DevEditorWrapper.tsx
import { useState } from 'react';
import { AppRenderer } from '@reactgrad/renderer';
import { Editor } from '@monaco-editor/react';

interface DevEditorWrapperProps {
  initialSchema: any;
}

export function DevEditorWrapper({ initialSchema }: DevEditorWrapperProps) {
  const initialJson = JSON.stringify(initialSchema, null, 2);

  const [json, setJson] = useState(initialJson);
  const [config, setConfig] = useState(initialSchema);

  const handleChange = (value?: string) => {
    setJson(value || '');

    try {
      const parsed = JSON.parse(value || '{}');
      setConfig(parsed);
    } catch {
      // Optionally show a toast or visual indicator
    }
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
          borderRight: '1px solid #ccc',
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
          background: '#f6f8fa', 
        }}
      >
        <Editor
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
  );
}
