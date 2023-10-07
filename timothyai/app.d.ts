/// <reference types="nativewind/types" />

declare module '*.otf' {
  import { FontSource } from 'expo-font';

  const value: FontSource;
  export default value;
}

declare module '*.webp' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
