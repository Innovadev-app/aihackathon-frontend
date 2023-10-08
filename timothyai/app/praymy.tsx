import { useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Platform, UIManager } from 'react-native';
import { AccordionList } from 'react-native-accordion-list-view';

const styles = StyleSheet.create({
    container: {
        paddingVertical: '2%',
        paddingHorizontal: '3%',
        height: '100%',
        backgroundColor: '#e7e7e7',
    },
    text: {
        fontSize: 12,
        color: "#ffffff",
    },
});

export default function MyPrayers() {


    const handleServerResponse = (responseData: any) => {
        console.log(JSON.stringify(responseData));
        data = responseData;
    };

    fetch("https://1lqp8lahll.execute-api.us-west-2.amazonaws.com/prod/timothy-chat", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    })
        .then((response) => response.json())
        .then(handleServerResponse);




    useEffect(() => {
        if (Platform.OS === 'android') {
            if (UIManager.setLayoutAnimationEnabledExperimental) {
                UIManager.setLayoutAnimationEnabledExperimental(true);
            }
        }
    }, []);

    let data = [
        {
            title: "Bob’s knee",
            body: "May your healing light shine upon Bob's knee, bringing warmth and relief to the pain he bears. Guide the hands of those who care for him, granting them wisdom and skill to aid in his recovery.\n" +
                "\n" +
                "Grant Bob the faith to trust in the journey ahead, knowing that with your guidance, all things are possible. May he find solace in knowing that he is never alone, for you are with him, every step of the way.\n" +
                "\n" +
                "In your name, we pray.\n" +
                "\n" +
                "Amen."
        },
        {
            title: "Friend's car accident",
            body: "Dear Lord, \n\nThank you for the gift of life. We pray for our friend who was in a car accident. Please protect them and guide them through this difficult time. Grant them strength and healing. Surround them with your love and comfort. May they experience your peace that surpasses all understanding. \n\nAmen."
        }];




    return (
        <View className="mx-6 mt-8">
            <Text className='text-3xl font-bold text-white'>My Prayers</Text>
            <Text className='text-xs text-white mt-1'>Here are some of your recent prayers.</Text>
            <View style={{ paddingTop: 10, backgroundColor: "#212121" }} >
                <AccordionList
                    data={data}
                    customTitle={item => <Text>{item.title}</Text>}
                    customBody={item => <Text>{item.body}</Text>}
                    animationDuration={400}
                    expandMultiple={true}

                />
            </View>
        </View>
    );
}

