import { useEffect, useState } from "react";
import { FlatList, ScrollView, TouchableWithoutFeedback, Modal, TextInput, View, Text, Image } from "react-native";
import { TouchableOpacity,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import down from "./assets/down.png";
import usFlag from "./assets/us-flag.jpg";
const { width, height } = Dimensions.get("window");

export default function App() {
  const [areas,setAreas]=useState([]);
  const [selectedArea,setSelectedArea]=useState(null);
  const [modalVisible,setModalVisible]=useState(false);

  // fectch codes from rescountries api

  useEffect(()=>{
      fetch("https://restcountries.com/v2/all")
      .then(response=>response.json())
      .then(data=>{
        let areaData = data.map(item=>{
          return {
            code: item.alpha2Code,
            item: item.name,
            callingCode: `+${item.callingCodes[0]}`,
            flag: `https://countryflagsapi.com/png/${item.name}`
          }
        });

        setAreas(areaData);
        if(areaData.length > 0){
          let defaultData = areaData.filter(a=>a.code == "US");

          if(defaultData.length > 0){
            setSelectedArea(defaultData[0])
          }
        }
      })
  },[])

  // render countries codes modal
  function renderAreasCodesModal() {

    const renderItem = ({ item }) =>{
      return (
        <TouchableOpacity
          style={{
            padding: 10,
            flexDirection: "row"
          }}
          onPress={() =>{
            setSelectedArea(item),
            setModalVisible(false)
          }}
        >
          <Image
           source={{uri: item.flag}}
           style={{
            height: 30,
            width: 30,
            marginRight: 10
           }}
          />

          <Text style={{fontSize: 16, color: "#fff"}}>{item.item}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <Modal
       animationType="slide"
       transparent={true}
       visible={modalVisible}
      >
        <TouchableWithoutFeedback
          onPress={() =>setModalVisible(false)}
        >
            <View
             style={{flex: 1, alignItems: "center", justifyContent: "center"}}
            >
                <View
                 style={{
                  height: 400,
                  width: width*0.8,
                  color: "#fff",
                  backgroundColor: "#342342",
                  borderRadius: 12
                 }}
                >
                    <FlatList
                     data={areas}
                     renderItem={renderItem}
                     keyExtractor={(item)=>item.code}
                     verticalScrollIndicator={false}
                     style={{
                      padding: 20,
                      marginBottom: 20
                     }}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
  }
  return (
    <SafeAreaView style={{flex: 1}}>
        <ScrollView>
           <View style={{flex: 1, alignItems: "center"}}>
                  <Text
                   style={{color:"#111", fontSize: 32, marginVertical: 80}}
                  >
                    Telegram
                  </Text>
                  <Text 
                    style={{color: "#111", fontSize: 25}}
                  >
                    Phone Number
                  </Text>
                  <Text style={{fontSie: 15, color: "#111"}}>Add a new phone number</Text>
                  <View style={{width: "100%", paddingHorizontal: 22, paddingVertical: 60}}>
                        <View style={{flexDirection: "row"}}>
                              <TouchableOpacity
                                 style={{
                                  width: 100,
                                  height: 50,
                                  marginHorizontal: 5,
                                  borderBottomColor: "#111",
                                  borderBottomWidth: 1,
                                  flexDirection: "row",
                                  fontSize: 12
                                 }}
                                 onPress={()=>setModalVisible(true)}
                              >

                                 <View style={{justifyContent: "center"}}>
                                    <Image
                                      source={down}
                                      style={{width: 10,height: 10, tintColor: "#111"}}
                                    />
                                 </View>
                                
                                <View style={{justifyContent: "center", marginLeft: 5}}>
                                    <Image
                                      source={{ uri: selectedArea?.flag}}
                                      resizeMode="contain"
                                      style={{
                                        width: 30,
                                        height: 30
                                      }}
                                    />
                                </View>

                                <View style={{justifyContent: "center", marginLeft: 5}}>
                                      <Text style={{color: "#111",fontSize: 12}}>{selectedArea?.callingCode}</Text>
                                </View>
                              </TouchableOpacity>
                                    {/* Phone Number Text Input */}
                                    <TextInput
                                      style={{
                                        flex: 1,
                                        marginVertical: 10,
                                        borderBottomColor: "#111",
                                        borderBottomWidth: 1,
                                        height: 40,
                                        fontSize: 20,
                                        color: "#111"
                                      }}
                                      placeholder="Enter your phone number"
                                      placeholderTextColor="#111"
                                      selectionColor="#111"
                                      keyboardType="numeric"
                                    />
                        </View>
                        <TouchableOpacity
                         onPress={()=>console.log("Pressed")}
                        style={{
                          backgroundColor: "#342342",
                          paddingVertical: 12,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: 8,
                          marginVertical: 32
                        }}
                        >
                           <Text style={{fontSize: 20, color: "#fff"}}>Submit</Text>
                        </TouchableOpacity>
                  </View>
           </View>
           {renderAreasCodesModal()}
        </ScrollView>
    </SafeAreaView>
  );
}
