import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class Alert extends Component {
  render() {
    const {message} = this.props
    return (
      <View
        style={{
          backgroundColor: "rgba(63, 235, 146, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 5,
          borderColor: '#3feb92',
          borderWidth: 0.5
        }}
      >
        <Text style={{color: '#3feb92'}}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
