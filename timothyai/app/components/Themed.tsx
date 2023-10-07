import { Text as DefaultText, View as DefaultView, ScrollView as DefaultScrollView } from 'react-native';
import { useColorScheme } from 'nativewind';

export type TextProps = DefaultText['props'];
export type ViewProps = DefaultView['props'];
export type SafeAreaViewProps = DefaultScrollView['props'];

export function Text(props: TextProps) {
  const { colorScheme } = useColorScheme();
  const { style, ...otherProps } = props;

  const color = colorScheme === 'light' ? '#1E1E1E' : '#fff';

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { colorScheme } = useColorScheme();
  const { style, ...otherProps } = props;

  const backgroundColor = colorScheme === 'light' ? '#fff' : '#1E1E1E';

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
