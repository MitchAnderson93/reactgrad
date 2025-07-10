// packages/editor/src/DevEditorWrapper.tsx
import { useState } from 'react';
import { AppRenderer } from '@reactgrad/renderer';
import { Editor } from '@monaco-editor/react';

interface DevEditorWrapperProps {
  initialSchema: any; // optionally type with z.infer<typeof configSchema>
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
      // Optional: show a toast or highlight error in JSON
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* App preview */}
      <div className="flex-shrink-0 w-3/4 h-full border-r overflow-auto">
        <AppRenderer config={config} />
      </div>

      {/* Editor */}
      <div className="flex-shrink-0 w-1/4 h-full bg-gray-100">
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
