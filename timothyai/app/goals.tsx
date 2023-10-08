import { useEffect } from 'react';
import {View, SafeAreaView, StyleSheet, Text, Platform, UIManager} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';

const styles = StyleSheet.create({
  container: {
      paddingVertical: '2%',
      paddingHorizontal: '3%',
      height: '100%',
      backgroundColor: '#e7e7e7',
  },
});


export default function Goals() {
  const handleServerResponse = (responseData: any) => {
    console.log(JSON.stringify(responseData));
    return responseData;
  };

 const pullData = () =>{ 
  return fetch("https://1lqp8lahll.execute-api.us-west-2.amazonaws.com/prod/timothy-chat", {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }
  })
      .then((response) => response.json())
      .then((responseData) => { 
        console.log(JSON.stringify(responseData));
        handleServerResponse });
 };



  useEffect(() => {
    if (Platform.OS === 'android') {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
}, []);

  let data =[{
      title: "You are a Christian",
      body: "John 3:16 \"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.\n\n Romans 10:9 \"If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.\"\n\n Ephesians 2:8-9 \"For it is by grace you have been saved, through faith\u2014and this is not from yourselves, it is the gift of God\u2014 not by works, so that no one can boast.\""
    },
    {
      title: "You belong to a local church",
      body: "Attend more"
    },
    {
      title: "You are seeking God's forgiveness",
      body: "You already have it"
    },
    {
      title: "God feels very distant at this time in your life",
      body: "Close the Gap"
    },
    {
      title: "You have a good knowledge of Bible background and history",
      body: "There's always room to know more"
    }];



  
  return (
    <View className="mx-6 mt-8">
      <Text className='text-3xl font-bold text-white'>Goals</Text>
      <Text className='text-xs text-white mt-1'>We’ve curated relevant, world class resources based on your conversation with Timothy</Text>
            <View style={{paddingTop:10}} >
                <AccordionList
                    data={pullData}
                    customTitle={item => <Text>{item.title}</Text>}
                    customBody={item => <Text>{item.body}</Text>}
                    animationDuration={400}
                    expandMultiple={true}

                />
            </View>
    </View>
  );
}
