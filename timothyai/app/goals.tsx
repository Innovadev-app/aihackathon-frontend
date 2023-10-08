import { useEffect, useState } from 'react';
import { View, Text, Platform, UIManager, StyleSheet } from 'react-native';
import { AccordionList } from 'react-native-accordion-list-view';

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: '100%',
    backgroundColor: 'rgb(9, 9, 9)'
  },
  titleText: {
    color: 'white',  // White text color for dark theme
    fontSize: 18,
    padding: 10,
    backgroundColor: '#333',  // Darker background for title
  },
  bodyText: {
    color: 'white',  // White text color for dark theme
    fontSize: 16,
    padding: 10,
    backgroundColor: '#212121',  // Dark background color
  },
  header: {
    color: 'white',  // White text color for dark theme
    fontSize: 36,
  },
  subheader: {
    color: 'white',  // White text color for dark theme
    fontSize: 14,
  },
  loadingText: {
    color: 'white',  // White text color for dark theme
  }
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
    <View style={styles.container}>
      <Text style={styles.subheader}>
        We’ve curated relevant, world class resources based on your conversation
        with Timothy. Click on the statement below to view your recommended goals.
      </Text>
      <View style={{ paddingTop: 10, paddingBottom: 100 }}>
        {data && data.length > 0 ? (
          <AccordionList
            containerItemStyle={styles.bodyText}
            data={data}
            customTitle={(item) => <Text style={styles.bodyText}>{item.title}</Text>}
            customBody={(item) => <Text style={styles.bodyText}>{item.body}</Text>}
            animationDuration={400}
            expandMultiple={true}
          />
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>
    </View>
  );
}