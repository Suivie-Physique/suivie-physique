export interface ThemeCode {
    name: string;
    code: string;
}

export class Themes {

    public static readonly modes: Array<string> = ['light', 'dark'];

    public static readonly themes: Array<ThemeCode> = [
        {
            name: 'base',
            code: '#e11d48',
          },
          {
            name: 'yellow',
            code: '#f59e0b',
          },
          {
            name: 'green',
            code: '#22c55e',
          },
          {
            name: 'blue',
            code: '#3b82f6',
          },
          {
            name: 'orange',
            code: '#ea580c',
          },
          {
            name: 'red',
            code: '#cc0022',
          },
          {
            name: 'violet',
            code: '#6d28d9',
          }
    ]
}