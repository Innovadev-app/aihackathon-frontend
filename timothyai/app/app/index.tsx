import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export default function Notifications() {
  const router = useRouter();

  return (
    <View>
      <Pressable onPress={() => router.push('/notifications')}>
        <View className="bg-red-500 w-full h-20 border border-solid">
          <Text>Notifications</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/modal')}>
        <View className="bg-blue-500 w-full h-20 border border-solid">
          <Text>Modal</Text>
        </View>
      </Pressable>
    </View>
  );
}
