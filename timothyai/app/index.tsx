import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage } from 'react-native-gifted-chat';
const { width } = Dimensions.get('window');
// TODO: add Dynamo?


function Timothy() {

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
