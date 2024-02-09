import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { Button } from "tamagui";

export default function Layout() {
  const router = useRouter();

  return (
    <Tabs>
      <Tabs.Screen
        name="tab-films"
        options={{
          title: "Films",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="filmstrip"
                {...props}
              />
            );
          },
          headerLeft() {
            return (
              <Button
                ml="$2.5"
                onPress={() => router.push("/")}
              >
                <MaterialCommunityIcons name="arrow-left" />
              </Button>
            );
          }
        }}
      />
      <Tabs.Screen
        name="tab-scene"
        options={{
          title: "Scene",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="camera"
                {...props}
              />
            );
          },
          headerLeft() {
            return (
              <Button
                ml="$2.5"
                onPress={() => router.push("/")}
              >
                <MaterialCommunityIcons name="arrow-left" />
              </Button>
            );
          }
        }}
      />

      <Tabs.Screen
        name="tab-characters"
        options={{
          title: "Character",
          tabBarIcon(props) {
            return (
              <MaterialCommunityIcons
                name="account-outline"
                {...props}
              />
            );
          },
          headerLeft() {
            return (
              <Button
                ml="$2.5"
                onPress={() => router.push("/")}
              >
                <MaterialCommunityIcons name="arrow-left" />
              </Button>
            );
          }
        }}
      />
    </Tabs>
  );
}
