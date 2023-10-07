import { Pressable, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function PrayerRoom() {
  const router = useRouter();

  return (
    <View>
      <Text>In PrayerRoom</Text>

      <Pressable onPress={() => router.push('/accountabilitymodal')}>
        <View className="bg-blue-500 w-full h-25 border border-solid">
          <Text>Accountabilty Modal</Text>
        </View>
      </Pressable>

    </View>
  );
}
