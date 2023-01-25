import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default class Card extends Component {
  render() {
    const { onOpen, fullName, branch, product, tenor, avatar, onPress } = this.props;
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Image
            source={{ uri: avatar }}
            style={{ width: 80, height: 80, resizeMode: "contain" }}
          />
          <View style={{ marginLeft: 20 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: 230,
              }}
            >
              <TouchableOpacity onPress={onPress}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: "#484848",
                    marginVertical: 3,
                  }}
                >
                  {fullName}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={onOpen}>
                <Image
                  source={{
                    uri: "https://images.freeimages.com/fic/images/icons/766/base_software/256/close_box_red.png",
                  }}
                  style={{ width: 20, height: 20, resizeMode: "contain" }}
                />
              </TouchableOpacity>
            </View>
            <Text style={{ color: "#484848", marginVertical: 3 }}>
              Branch Name: {branch}
            </Text>
            <Text style={{ color: "#484848", marginVertical: 3 }}>
              Product Name: {product}
            </Text>
            <Text style={{ color: "#484848", marginVertical: 3 }}>
              Tenor : {tenor}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
