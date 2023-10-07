import * as React from 'react';
import { View, StyleSheet, Dimensions, Platform, Text } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage, InputToolbar, Composer } from 'react-native-gifted-chat';
import DropdownButton from '../components/DropDownPicker';

const { width } = Dimensions.get('window');
// TODO: add Dynamo?


function Timothy() {

  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: "Hi, I'm Timothy! I'm here to help you with your goals. What would you like to do today?",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Timothy',
        avatar: require('../assets/images/timothy-avatar.png'),
      },
    },

  ]);


  const onSend = (newMessages: IMessage[] = []) => {
    setMessages(GiftedChat.append(messages, newMessages));

    //Send Payload to BedRock and respond in Chat
    fetch("https://1lqp8lahll.execute-api.us-west-2.amazonaws.com/prod/bedrock", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: newMessages[0].text,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // const resp = React.useState<IMessage[]>([{
        //   text: responseData,
        //   createdAt: new Date(),
        //   user: {
        //     _id: 2,
        //     name: 'GiftedChat',
        //     avatar: 'https://t3.ftcdn.net/jpg/05/54/39/50/240_F_554395094_D4zOhvLOkvVt5OaWq8dUhqcHDDS87ltG.jpg',
        //   }
        // }]
        // setMessages(GiftedChat.append(messages, resp));
        console.log(JSON.stringify(responseData));
      })
  }
  
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
        <DropdownButton />
        <GiftedChat
          {...{ messages, onSend, renderMessageVideo }}
          renderInputToolbar={props => customInputToolbar(props)}
          renderBubble={(props) => <CustomSystemMessage {...props} />}
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

const customInputToolbar = props => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        backgroundColor: "#212121",
        marginHorizontal: 10,
      }}
      renderComposer={props => <CustomComposer {...props} />}
    />
  );
};

const CustomComposer = (props) => {
  return (
    <Composer
      {...props}
      textInputStyle={{ 
        color: '#eeeeee',
      }}
    />
  );
};

const CustomSystemMessage = (props) => {
  return (
    <View style={{
      padding: 10,
      backgroundColor: "#1E1E1E",
      borderRadius: 5,
      alignItems: 'center',
      flexWrap: 'wrap',  // Allow wrapping
      maxWidth: Dimensions.get('window').width - 130,  // Set max width
      }}>
      <Text style={{color: "#eeeeee"}}>{props.currentMessage.text}</Text>
    </View>
  );
};

export default Timothy;
