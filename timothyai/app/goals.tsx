import { useEffect, useState } from 'react';
import { View, Text, Platform, UIManager, StyleSheet } from 'react-native';
import { AccordionList } from 'react-native-accordion-list-view';

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: '#e7e7e7',
  },
});

export default function Goals() {
  const [data, setData] = useState([]); // State to hold the fetched data

  const handleServerResponse = (responseData: any) => {
    console.log(JSON.stringify(responseData));
    // Assuming responseData is an array, if not, adapt this part according to the actual data structure
    setData(responseData);
  };

  const pullData = () => {
    return fetch("https://1lqp8lahll.execute-api.us-west-2.amazonaws.com/prod/timothy-chat", {
      method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        handleServerResponse(responseData);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    pullData();

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  return (
    <View className="mx-6 mt-8">
      <Text className="text-3xl font-bold text-white">Goals</Text>
      <Text className="text-xs text-white mt-1">
        We’ve curated relevant, world class resources based on your conversation
        with Timothy
      </Text>
      <View style={{ paddingTop: 10 }}>
        {data && data.length > 0 ? (  // Check if data is available before rendering AccordionList
          <AccordionList
            data={data}
            customTitle={(item) => <Text>{item.title}</Text>}
            customBody={(item) => <Text>{item.body}</Text>}
            animationDuration={400}
            expandMultiple={true}
          />
        ) : (
          <Text>Loading...</Text>  
        )}
      </View>
    </View>
  );
}
