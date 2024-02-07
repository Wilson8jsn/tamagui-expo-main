import { Image } from "react-native"; // Importa el componente Image
import { useRouter } from "expo-router";
import { Button, H1, YStack } from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return (
    <MySafeAreaView>
      <MyStack>
        <YStack maxWidth={600}>
          <Image
            source={require("../assets/camera2.png")}
            style={{
              width: "100%",
              height: 200,
              resizeMode: "cover",
              top: 170,
              left: -20
            }}
          />
          <H1
            textAlign="center"
            style={{
              top: 360,
              position: "absolute",
              width: "115%"
            }}
          >
            Movie Mummy
          </H1>
        </YStack>
        <YStack space={5}>
          <Button onPress={() => router.push("/tabs")}>Begin</Button>
        </YStack>
      </MyStack>
    </MySafeAreaView>
  );
}
