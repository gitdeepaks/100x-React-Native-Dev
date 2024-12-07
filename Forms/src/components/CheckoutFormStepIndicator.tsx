import { Link, useSegments } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const steps = [
  { key: "personal", title: "Personal" },
  { key: "payment", title: "Payment" },
  { key: "confirm", title: "Confirm" },
];

export default function CheckoutFormStepIndicator() {
  const segments = useSegments();
  const currentScreen = segments[segments.length - 1];
  const stepIndex = steps.findIndex((step) => step.key === currentScreen);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
        height: 110,
      }}
    >
      {steps.map((step, index) => (
        <View
          key={step.key}
          style={{
            borderBottomWidth: 3,
            borderColor: stepIndex >= index ? "#006AE6" : "lightgray",
            padding: 5,
            flex: 1,
          }}
        >
          <Link
            href={`/checkout/${step.key}`}
            style={{
              color: stepIndex >= index ? "#006AE6" : "gray",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {step.title}
          </Link>
        </View>
      ))}
    </SafeAreaView>
  );
}
