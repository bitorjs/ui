import * as monaco from "monaco-editor";
export default [
  /**   * 语句   */
  {
    label: 'events',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: `
events
{
  use epoll;
  worker_connections 65535;
}
`,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Events Statement'
  }, {
    label: 'http',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: `
http 
{
  include mime.types;
  default_type application/octet-stream;
  charset utf-8;
}    
    `,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Http Statement'
  }, {
    label: 'server',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: `
server 
{
  listen 80;
  server_name localhost;
}    
    `,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Http Statement'
  }, {
    label: 'location',
    kind: monaco.languages.CompletionItemKind.Snippet,
    insertText: `
location /
{
  root root html; 
  index index.html index.htm;
}    
    `,
    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
    documentation: 'Http Statement'
  },
]