import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ArrowLeft, Facebook, Instagram } from "iconsax-react-native";
import { AppView } from "@/components/common/AppViews";
import { MediumText } from "@/components/common/AppText";
import { formatPhoneNumber, responsiveText } from "@/utilities/helper";
import {
  DefaultInput,
  EditEmail,
  EditInput,
  EditNum,
  EmailInput,
  NumInput,
} from "@/components/common/AppInput";
import { DefaultButton } from "@/components/common/Button";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { router } from "expo-router";
import { UseAuth } from "@/hooks/apis";
import { ErrorToast } from "@/components/common/Toasts";
import Spacing from "@/constants/Spacing";
import { StatusBar } from "react-native";

export default function ReachUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const { reachUs, isLoading } = UseAuth();

  const handleSubmit = async () => {
    if (!email || !message) {
      ErrorToast("Please fill in all fields");
      return;
    }

    try {
      await reachUs(message, email);
      // Clear form after successful submission
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: Spacing * 2,
        paddingTop: (StatusBar.currentHeight ?? 20) + 5,
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft size="32" color="black" />
            </TouchableOpacity>
            <MediumText style={{ fontSize: responsiveText(15), marginLeft: 5 }}>
              Reach out to us
            </MediumText>
          </View>
          <MediumText style={{ marginBottom: 30, fontSize: 12, marginTop: 10 }}>
            Got questions or feedback? Let’s talk.
          </MediumText>
          <EditInput
            style={{ marginBottom: 16 }}
            title="Name"
            placeholder="Enter your name"
            onChangeText={(val: string) => setName(val)}
          />
          <EditEmail
            style={{ marginBottom: 16 }}
            title="Email"
            placeholder="Enter your email address"
            onChangeText={(val: string) => setEmail(val)}
          />
          <EditInput
            style={{ marginBottom: 16 }}
            title="Message"
            placeholder="Tell us more"
            onChangeText={(val: string) => setMessage(val)}
            value={message}
            multiline
          />
          <DefaultButton
            style={{ marginTop: 50 }}
            title="Send Message"
            onPress={handleSubmit}
            loading={isLoading}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <MediumText
              style={{
                color: "#494949",
                fontSize: responsiveText(10),
              }}
            >
              Email: pikuphq@gmail.com
            </MediumText>
            <MediumText
              style={{
                color: "#494949",
                fontSize: responsiveText(10),
              }}
            >
              Phone: +234 8088513703
            </MediumText>
          </View>
          <View
            style={{
              alignSelf: "stretch",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 24,
              marginBottom: 15,
            }}
          >
            <FontAwesome6 name="x-twitter" size={20} color="black" />
            <FontAwesome6 name="facebook" size={20} color="black" />
            <FontAwesome6 name="instagram" size={24} color="black" />
            <FontAwesome name="linkedin-square" size={20} color="black" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
