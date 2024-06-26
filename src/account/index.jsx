import { View, ScrollView, Image, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import loginimg from "../../assets/login.png";
// import loginimg from "../../assets/pastry.jpg";
import { MaterialIcons } from "@expo/vector-icons";

import RenderButton from "../common/Button";
import NavigationButton from "../api/navigateComponents";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AccountScreen = ({ navigation }) => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  let user = { name: name, email: email };
  const getData = async () => {
    const name = await AsyncStorage.getItem("username");
    const email = await AsyncStorage.getItem("useremail");
    setName(name);
    setEmail(email);
  };
  getData();
  const UseableComp = ({
    title1,
    title2,
    title1Icon,
    title2Icon,
    onpressTitle2,
    onpressTitle1,
  }) => {
    return (
      <>
        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            onPress={() => navigation.navigate(`${onpressTitle1}`)}
          >
            <View className="border border-zinc-400 flex-row justify-center items-center space-x-4  w-44 py-3  rounded-lg">
              <Text>{title1Icon}</Text>
              <Text className="text-textColor">{title1}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(`${onpressTitle2}`)}
          >
            <View className="border border-zinc-400 flex-row justify-center items-center space-x-4  w-44 py-3  rounded-lg">
              <Text>{title2Icon}</Text>
              <Text className="text-textColor">{title2}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <>
      <ScrollView>
        <View className="px-3">
          <View className="border-b pb-5 border-zinc-400 mt-3">
            {user && user.email && user.name ? (
              <View className="px-4 space-y-1 py-4 bg-stone-200">
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <MaterialIcons name="verified-user" size={24} color="gray" />
                  <Text className="text-lg font-medium pl-2">{user.name}</Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Ionicons name="mail-open-outline" size={24} color="gray" />
                  <Text className="pl-2">{user.email}</Text>
                </View>
              </View>
            ) : (
              <View className=" py-2  space-y-2">
                <Image source={loginimg} className="h-32  w-screen" />
                <TouchableOpacity
                  className="flex-row justify-center bg-buttomColor py-4 rounded-md "
                  onPress={() => navigation.navigate("SignIn")}
                >
                  <Text className="text-white font-semibold">
                    SignIn / SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View className="border-b border-zinc-400 pb-5">
            <UseableComp
              onpressTitle1="MyOrder"
              title1="My Orders"
              title1Icon={
                <Ionicons name="cube-outline" size={20} color="#61677A" />
              }
              onpressTitle2="Reminder"
              title2="Reminders"
              title2Icon={
                <MaterialCommunityIcons
                  name="bell-ring-outline"
                  size={24}
                  color="#61677A"
                />
              }
            />
            <UseableComp
              onpressTitle1="ChatWith"
              title1="Chat with Us"
              title1Icon={
                <Ionicons
                  name="chatbox-ellipses-outline"
                  size={20}
                  color="#61677A"
                />
              }
              onpressTitle2="Wishlist"
              title2="Wishlist"
              title2Icon={
                <FontAwesome6 name="heart" size={20} color="#61677A" />
              }
            />
          </View>
          <View>
            <NavigationButton navigation={navigation} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
export default AccountScreen;
