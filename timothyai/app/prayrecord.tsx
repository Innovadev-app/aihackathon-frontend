import { Text, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function PrayerRecord() {

  return (
    <View>
        <View className="mx-6 mt-8">

        </View>
        <View className="mx-6 mt-8 items-center justify-center">
            <FontAwesome name="microphone" size={80} color="white" />
        </View>
        <View className="mx-6 mt-16">
            <Text className='font-medium text-white mb-6'>Dear God,</Text>
            <Text className='font-medium text-white mb-6'>
                We pray for Bob, who is struggling
                with a knee injury.
                We ask that you bring healing to his
                knee, and give him the strength and
                courage to face this challenge.
                We also ask for your guidance, and
                for the ability to trust in your care.
                Amen.</Text>
        </View>
    </View>

  );
}
