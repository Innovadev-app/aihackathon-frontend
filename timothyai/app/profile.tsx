import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Profile() {
  return (
      <View>
        <View className="mx-6 mt-8">
          <Text className='text-3xl font-bold text-white mb-6'>My Profile</Text>
          <Text className='text-xl font-bold text-white mt-1 mb-8'>My Church</Text>
        </View>
            <View className="mx-24 mt-0">
                <Button title={'Connect Church'}/>
            </View>
        <View className="mx-6 mt-8">
            <BouncyCheckbox text={'I would like to be an accountability\n' +
                'partner'} onPress={(isChecked: boolean) => {}} />
        </View>
          <View className="mx-6 mt-8">
              <BouncyCheckbox text={"I would like to be a prayer partner"} onPress={(isChecked: boolean) => {}} />
          </View>
          <View className={"mx-2 mt-2"}>
              <TextInput style={styles.input} placeholder="First Name" placeholderTextColor={"#ffffff"}></TextInput>
          </View>
          <View className={"mx-2 mt-2"}>
              <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor={"#ffffff"}></TextInput>
          </View>
          <View className={"mx-2 mt-2"}>
              <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor={"#ffffff"}></TextInput>
          </View>
          <View className={"mx-2 mt-2"}>
              <Text className='text-xl font-bold text-white'>{"Nudges"}</Text>
          </View>
          <View className={"mx-2 mt-0"}>
              <TextInput style={styles.input} placeholder="Daily" placeholderTextColor={"#ffffff"}></TextInput>
          </View>
      </View>
  );

}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: "#1E1E1E",
        fontSize: 17
    },
});


