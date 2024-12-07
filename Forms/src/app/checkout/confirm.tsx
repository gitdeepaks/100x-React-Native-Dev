import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import KeyBoardAwareScrollView from "../../components/KeyBoardAwareScrollView";
import { useCheckoutForm } from "../../contexts/CheckoutFormProvider";

// const personalInfo = {
//   fullName: "Vadim Savin",
//   address: "Poblenou",
//   city: "Barcelona",
//   postcode: "1234",
//   phone: "60123123123",
//   country: "ES",
// };

// const paymentInfo = {
//   cardNumber: "1234123412341234",
//   expires: "01/30",
//   cvv: "123",
// };

export default function ConfirmForm() {
  const { paymentInfo, personalInfo, onSubmit } = useCheckoutForm();
  // function onNext() {
  //   // validate from

  //   // submit the data

  //   // redirect Next
  //   router.dismissAll();
  //   router.back();
  //   // router.push("/");
  // }
  return (
    <KeyBoardAwareScrollView>
      <Text>Confirm Form Submission</Text>
      <View style={styles.container}>
        {personalInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Personal</Text>
              <Link
                href={"/checkout"}
                style={{ color: "#007BFF", fontWeight: "600" }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(personalInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value?.toString()}
              </Text>
            ))}
          </View>
        )}

        {paymentInfo && (
          <View style={styles.dataContainer}>
            <View style={styles.dataContainerHeader}>
              <Text style={styles.title}>Payment</Text>
              <Link
                href={"/checkout/payment"}
                style={{ color: "#007BFF", fontWeight: "600" }}
              >
                Edit
              </Link>
            </View>
            {Object.entries(paymentInfo).map(([key, value]) => (
              <Text key={key}>
                {key}: {value}
              </Text>
            ))}
          </View>
        )}
      </View>

      <CustomButton onPress={onSubmit} title="Submit" style={styles.button} />
    </KeyBoardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    paddingBottom: 25,
    gap: 15,
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: "#B3D8FF",
    padding: 10,
    borderRadius: 10,
    gap: 3,
  },
  dataContainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
  button: {
    marginTop: 24,
  },
});
