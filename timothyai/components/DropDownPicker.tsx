import { useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownButton = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'I would like more recommendations.', value: 'hi'},
    {label: 'I would like more recommendations based on ...', value: 'I would like more recommendations based on ...'},
    {label: 'I would like to find an accountability partner.', value: 'I would like to find an accountability partner.'},
    {label: 'I would like to see a prayer based on ...', value: 'I would like to see a prayer based on ...'},
    {label: 'I would like to find a small group in my area', value: 'I would like to find a small group in my area'},
  ]);

  return (
    <View style={{flex: 1}}>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    paddingHorizontal: 15,
                }}>
                <DropDownPicker
                open={open}
                value={value}
                items={items}
                placeholder="I would like more ..."
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                theme="DARK"
                style={{ backgroundColor: "#212121"}}
                dropDownContainerStyle={{backgroundColor: "#212121"}}
                />
            </View>
        </View>
  );
};

export default DropdownButton;

