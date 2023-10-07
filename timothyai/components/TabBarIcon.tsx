import { FontAwesome5 } from '@expo/vector-icons';

const TabBarIcon = ({ name, color }) => {
  let iconName;

  switch (name) {
    case 'Profile':
      iconName = 'user';
      break;
    case 'Pray':
      iconName = 'pray';
      break;
    case 'Timothy':
      iconName = 'comment';
      break;
    case 'Connect':
      iconName = 'cross';
      break;
    case 'Goals':
      iconName = 'bullseye';
      break;
    default:
      iconName = 'circle';
      break;
  }

  return <FontAwesome5 name={iconName} size={18} color={color} solid />;
};

export default TabBarIcon;
