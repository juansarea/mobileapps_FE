import { Text, StyleSheet, View } from "react-native";
import React, { Component } from "react";

export default class AlertError extends Component {
  render() {
    const {message} = this.props
    return (
      <View
        style={{
          backgroundColor: "rgba(204, 32, 0, 0.3)",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 10,
          borderRadius: 5,
          borderColor: '#cc2000',
          borderWidth: 0.5
        }}
      >
        <Text style={{color: '#cc2000'}}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
