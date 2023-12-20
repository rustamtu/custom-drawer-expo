import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({ selected }) =>{
    let backgroundColor;
    backgroundColor = selected ? '#ff2156' : '#808080'
    return (
        <View
          style={{
            height: 5,
            width: 5,
            marginHorizontal: 3,
            backgroundColor
          }}
        />
    )
}

const Done = ({ ...props }) =>(
    <TouchableOpacity
      style={{
        marginRight: 12
      }}
    {...props}
    >
        <Text style={{color: "#ff2156"}}>Done</Text>
    </TouchableOpacity>
)

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
    onSkip={()=> navigation.navigate('Login')}
    onDone={()=> navigation.navigate('Login')}
    DotComponent={Dots}
    DoneButtonComponent={Done}
    bottomBarColor='#ffffff'
  pages={[
    {
      backgroundColor: '#fff',
      image: <Image source={require('../assets/onboarding_1.png')} />,
      title: 'Find Blood Donors',
      subtitle: 'Lorem ipsum dollor Lorem ipsum dollor  Lorem ipsum dollor  Lorem ipsum dollor ',
    },
    {
        backgroundColor: '#fff',
        image: <Image source={require('../assets/onboarding_2.png')} />,
        title: 'Post a Blood Request',
        subtitle: 'Lorem ipsum dollor Lorem ipsum dollor  Lorem ipsum dollor  Lorem ipsum dollor ',
      },
  ]}
/>
  )
}

export default OnboardingScreen