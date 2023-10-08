import * as React from 'react';
import {View, StyleSheet, Dimensions, Platform, Text, Button} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
// import { WebView } from 'react-native-webview';
import { GiftedChat, IMessage, InputToolbar, Composer } from 'react-native-gifted-chat';
import DropdownButton from '../components/DropDownPicker';
import file from '../src/utils/survey.json'
import {useState} from "react";

const { width } = Dimensions.get('window');
// TODO: add Dynamo?


function Timothy() {
    const [showInputBar, setShowInputBar] = useState(false);

  const ratings = ['Strongly agree', 'Somewhat agree', 'Neutral', 'Somewhat disagree', 'Strongly disagree'];

  const Rating = ({ onRate }) => {
    return (
        <View>
          {ratings.map((rating, index) => (
              <Button key={index} title={rating} onPress={() => onRate(index + 1)} />
          ))}
        </View>
    );
  };


  const [messages, setMessages] = React.useState<IMessage[]>([
    {
      _id: 1,
      text: "Hello, I'm Timothy, your local spiritual mentor.  I'm here to help answer your spiritual questions and to learn more about your spiritual maturity and help you grow in your relationship with Christ.\n\nI would like to ask you a few questions about your spiritual maturity. Please rank the following statements:",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Timothy',
        avatar: require('../assets/images/timothy-avatar.png'),
      },
    },

  ]);

  // Sorts question by weight
  const sortedQuestions = Object.entries(file.MaturityTopics)
      .sort(([,a], [,b]) => b.Weight - a.Weight)
      .slice(0, 3);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState({});

  const [currentQuestion, setCurrentQuestion] = React.useState(sortedQuestions[0]);
  const [showRating, setShowRating] = React.useState(false);


  const handleResponse = (response: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [currentQuestion[0]]: response
    }));
    const newMessages = [{
      _id: Math.round(Math.random() * 1000000),
      text: ratings[response - 1],
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'GiftedChat',
        avatar: 'https://t3.ftcdn.net/jpg/05/54/39/50/240_F_554395094_D4zOhvLOkvVt5OaWq8dUhqcHDDS87ltG.jpg',
      }
    }];
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setCurrentQuestion(sortedQuestions[currentQuestionIndex + 1]);
  };

  const askQuestion = () => {
    const questionMessage = [{
      _id: Math.round(Math.random() * 1000000),
      text: currentQuestion[1].Title,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'GiftedChat',
        avatar: 'https://t3.ftcdn.net/jpg/05/54/39/50/240_F_554395094_D4zOhvLOkvVt5OaWq8dUhqcHDDS87ltG.jpg',
      },
    }];
    setMessages((previousMessages) => GiftedChat.append(previousMessages, questionMessage));
    setShowRating(true);
  };

  // Call askQuestion whenever currentQuestion changes
  React.useEffect(() => {
    if (currentQuestion) {
      askQuestion();
    } else {
      console.log(answers)
      setShowRating(false);
      setShowInputBar(true)
    }
  }, [currentQuestion]);


  const handleServerResponse = (responseData: any) => {

    const resp = [{
      _id: Math.round(Math.random() * 1000000),
      text: responseData,
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'GiftedChat',
        avatar: require('../assets/images/timothy-avatar.png'),
      }
    }];
    setMessages((previousMessages) => GiftedChat.append(previousMessages, resp));
  };

  const onSend = (newMessages: IMessage[] = []) => {
    console.log(newMessages);
    setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

    //Send Payload to BedRock and respond in Chat
    if (newMessages[0].user._id == 1) {
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
          .then(handleServerResponse);
    }
  };

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
        <View style={styles.container2}>
          <GiftedChat
              {...{ messages, onSend, renderMessageVideo }}
              renderInputToolbar={showInputBar ? (props) => customInputToolbar(props) : () => null}
              renderBubble={(props) => <CustomSystemMessage {...props} />}
              user={{
                _id: 1,
              }}
          />
          {showRating && <Rating onRate={handleResponse} />}
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  container2: {
    flex: 1,
    
    position: 'relative',
    paddingTop:50,
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
