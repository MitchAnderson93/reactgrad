import React from 'react';
import { useThemeTokens } from '../../themes/ThemeProvider';

export interface TextProps {
  content?: string | string[];
  data?: any; // For API response data
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  content,
  data,
  className = '',
}) => {
  const tokens = useThemeTokens();

  if (!tokens.text) {
    console.error('[ReactGrad] Text tokens not found in theme');
    return <div style={{ color: 'red' }}>Text theme tokens missing</div>;
  }

  // Handle API data rendering
  if (data) {
    if (Array.isArray(data)) {
      return (
        <div className={`${tokens.text.container} ${className}`}>
          {data.map((item, index) => (
            <div key={item.id || index} className={tokens.text.item}>
              <h5 className={tokens.text.title}>{item.name}</h5>
              {item.data && (
                <ul className={tokens.text.list}>
                  {Object.entries(item.data).map(([key, value]) => (
                    <li key={key} className={tokens.text.listItem}>
                      <strong>{key}:</strong> {String(value)}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Handle single object
    return (
      <div className={`${tokens.text.container} ${className}`}>
        <pre className={tokens.text.code}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }

  // Handle string content
  if (Array.isArray(content)) {
    return (
      <div className={`${tokens.text.container} ${className}`}>
        {content.map((paragraph, index) => (
          <p key={index} className={tokens.text.paragraph}>
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div className={`${tokens.text.container} ${className}`}>
      <p className={tokens.text.paragraph}>{content}</p>
    </div>
  );
};