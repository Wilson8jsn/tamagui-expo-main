import { Github, Twitter } from "@tamagui/lucide-icons";
import { Link, useRouter } from "expo-router";
import {
  Button,
  H1,
  ListItem,
  Paragraph,
  Separator,
  YGroup,
  YStack
} from "tamagui";

import { MySafeAreaView } from "../components/MySafeAreaView";
import { MyStack } from "../components/MyStack";

export default function Home() {
  const router = useRouter();

  return (
    <MySafeAreaView>
      <MyStack>
        <YStack
          space="$4"
          maxWidth={600}
        >
          <H1 textAlign="center">Movie Making.</H1>
        </YStack>

        <YStack space="$3">
          <Button onPress={() => router.push("/tabs")}>Begin</Button>
        </YStack>
      </MyStack>
    </MySafeAreaView>
  );
}
