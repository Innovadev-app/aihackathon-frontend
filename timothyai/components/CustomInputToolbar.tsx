import React, { useState } from 'react';
import { InputToolbar } from 'react-native-gifted-chat'; // Assuming you import InputToolbar from a package

const CustomInputToolbar = props => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };

    if (!isVisible) {
        return null; // Return null to hide the component
    }

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

export default CustomInputToolbar;




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

export default CustomInputToolbar;
