import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
const { width } = Dimensions.get('window');
// TODO: add Dynamo?



import { useRouter } from 'expo-router';
import { Pressable } from 'react-native';



function Timothy() {
  const router = useRouter();

  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: 'Here was today\'s sermon you missed.',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'GiftedChat',
        avatar: 'https://t3.ftcdn.net/jpg/05/54/39/50/240_F_554395094_D4zOhvLOkvVt5OaWq8dUhqcHDDS87ltG.jpg',
      },
      video: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    },
  ]);
  const onSend = (newMessages: IMessage[] = []) =>
    setMessages(GiftedChat.append(messages, newMessages));

  const getVimeoId = (url: string) => {
    const regExp = /^.*(vimeo\.com\/)([0-9]*).*/;
    const match = url.match(regExp);
    if (match && match[2].length >= 9) {
      return match[2];
    }
    return null;
  };

  const renderMessageVideo = (props: any) => {
    const { currentMessage } = props;
    if (currentMessage.video.includes('vimeo')) {
      if(Platform.OS === 'web') {
        return null
      } 
    }
    return (
      <Video
        style={styles.video}
        source={{
          uri: currentMessage!.video!,
        }}
        useNativeControls
        resizeMode={ResizeMode.COVER}
      />

    );
  };
  return (
      <View style={styles.container}>
        <GiftedChat
          {...{ messages, onSend, renderMessageVideo }}
          user={{
            _id: 1,
          }}
        />
        
      <Pressable onPress={() => router.push('/goals')}>
        <View className="bg-red-500 w-full h-25 border border-solid">
          <Text>Goals</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/connect')}>
        <View className="bg-red-500 w-full h-25 border border-solid">
          <Text>Connect</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/pray')}>
        <View className="bg-red-500 w-full h-25 border border-solid">
          <Text>Pray</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/profile')}>
        <View className="bg-red-500 w-full h-25 border border-solid">
          <Text>Profile</Text>
        </View>
      </Pressable>

      <Pressable onPress={() => router.push('/index')}>
        <View className="bg-blue-500 w-full h-25 border border-solid">
          <Text>Timothy</Text>
        </View>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    width: width / 1.5,
    height: 150,
    margin: 13,
    borderRadius: 13,
  },
});

export default Timothy;
