import { Text, StyleSheet, View, Modal, TouchableOpacity } from "react-native";
import React, { Component } from "react";

export default class ModalConfirmation extends Component {
  render() {
    const { onClose, onOpen, onDelete } = this.props;
    return (
      <View>
        <Modal animationType="slide" transparent={true} visible={onOpen}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderBottomWidth: 0.5,
                  borderBottomColor: "#bfbfbf",
                  paddingBottom: 15,
                }}
              >
                <Text style={styles.modalText}>Confirmation</Text>
                <TouchableOpacity onPress={onClose}>
                  <Text style={{ fontSize: 20 }}>x</Text>
                </TouchableOpacity>
              </View>
              <Text style={{ marginVertical: 20 }}>Confirm to delete?</Text>
              <View
                style={{
                  // justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  borderTopWidth: 0.5,
                  borderTopColor: "#bfbfbf",
                  paddingTop: 15,
                  justifyContent: "flex-end",
                }}
              >
                {/* <Text style={styles.modalText}>Confirmation</Text> */}
                <TouchableOpacity
                  onPress={onClose}
                  style={{
                    backgroundColor: "grey",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#fff" }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onDelete}
                  style={{
                    backgroundColor: "#138bd6",
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#fff" }}>
                    Yes, Delete
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 22,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  modalView: {
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    width: 320,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    // textAlign: "center",
  },
  modalText: {
    // marginBottom: 15,
    fontWeight: "bold",
    // textAlign: "center",
  },
});
