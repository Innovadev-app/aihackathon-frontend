import React from 'react';
import { View, Button } from 'react-native';

const ResponseButtons = ({onSelect: onSelect}) => {
    const options = [
        { label: 'Very much agree', value: 5 },
        { label: 'Somewhat agree', value: 4 },
        { label: 'Neutral', value: 3 },
        { label: 'Somewhat disagree', value: 2 },
        { label: 'Very much disagree', value: 1 },
    ];

    return (
        <View>
            {messages.map(message => (
                <MessageComponent key={message._id} message={message} />
            ))}
            {currentQuestionIndex < sortedQuestions.length && (
                <Question
                    question={sortedQuestions[currentQuestionIndex][1]}
                    onAnswer={handleResponse}
                />
            )}
        </View>
    );
};

export default ResponseButtons;